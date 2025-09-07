import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import userValidationSchema from "../validations/users";
import AppError, { ErrorName } from "../service/error";
import User from "../models/user";
import jwt from "jsonwebtoken";
import sendVerificationCode from "../service/email";
import { APP_DOMAIN, APP_PORT, ON_PRODUCTION, SECRET_KEY } from "../..";

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  AuthorizationError,
  ValidationError,
  RequireError,
  ConflictError,
} = ErrorName;

class UsersController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        avatar,
        role,
      } = req.body;

      // Validate user input
      const result = userValidationSchema.validate(
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
        {
          abortEarly: false,
        }
      ); // Collect all validation error

      if (result.error) {
        throw new AppError(
          JSON.stringify(result.error.details),
          ErrorName.ValidationError
        );
      }

      // Password hashing
      const hashedPw = await bcrypt.hash(password, 10);

      // User Creation
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPw,
        avatar: avatar || "https://example.com/default-avatar.png", // Default avatar if not provided
        role,
      });

      // Send the verification code to the user's email
      await sendVerificationCode(newUser);
      res.status(201).json({
        message:
          "User registered successfully, Check your email for verification code.",
        data: newUser,
      });
    } catch (error) {
      if ((error as any).code === 11000) {
        if ((error as any).keyPattern?.email) {
          throw new AppError("Email already exists", ErrorName.ConflictError);
        }
        if ((error as any).keyPattern?.phone) {
          throw new AppError(
            "Phone number already exists",
            ErrorName.ConflictError
          );
        }
      }

      next(error);
    }
  }

  static async verify(req: Request, res: Response, next: NextFunction) {
    /* this method verifies the user's account by updating the verified property to true. */
    const { email, code } = req.body;

    try {
      // Get user
      const user = await User.findOne({ email });
      if (!user) throw new AppError("User not found.", NotFoundError);

      // Check if user is already verified.
      if (user.verified)
        throw new AppError("User already verified.", BadRequestError);

      // Check if the verification code has been expired.
      if (user.isVerificationCodeExpired()) {
        throw new AppError(
          "The verification code has been expired.",
          BadRequestError
        );
      }

      // throw error if verification code is incorrect.
      if (code !== user.verificationCode) {
        throw new AppError("Incorrect code.", AuthorizationError);
      }

      // Delete verification keys since will not be used anymore and verify user.
      user.verified = true;
      user.verificationCode = undefined;
      user.verificationCodeExpires = undefined;
      await user.save();

      user.password = undefined;

      if (!SECRET_KEY) throw new Error("Secret key is not defined.");

      const token = jwt.sign(user.toJSON(), SECRET_KEY);

      // Set the token in a secure, HTTP-only cookie
      // This cookie will be used for authentication in subsequent requests
      res.cookie("Authorization", token, {
        httpOnly: true, // Prevent JavaScript access (XSS protection)
        sameSite: "strict", // Prevent CSRF attacks
        secure: ON_PRODUCTION === "true", // Use secure cookies in production
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set expiration time (e.g., 7 days)
      });

      res.json({ message: "User verified successfully.", user });
    } catch (error) {
      next(error);
    }
  }

  static async resendCode(req: Request, res: Response, next: NextFunction) {
    /* resendCode: resend a new verification code to the user */
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) throw new AppError("User not found.", NotFoundError);

      // Check if user is already verified.
      if (user.verified)
        throw new AppError("User already verified.", BadRequestError);

      // Check if the verification code has been expired.
      if (!user.isVerificationCodeExpired()) {
        throw new AppError(
          "You can only request a new verification code after the previous one has expired.",
          BadRequestError
        );
      }

      // Set a new verification code and expiration date
      user.generateVerificationCode();

      await user.save();

      // Send the new verification code to the user's email
      await sendVerificationCode(user);

      res.json({ message: "Verification code has been resent to your email." });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      // Check if no email or password is provided
      if (!email) throw new AppError("email field is required.", RequireError);
      if (!password)
        throw new AppError("password field is required.", RequireError);

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user)
        throw new AppError("Incorrect email or password.", AuthorizationError);

      // Comparing original password with the hashed password.
      const isMatching = await user.comparePassword(password);
      if (!isMatching)
        throw new AppError("Incorrect email or password.", AuthorizationError);

      // Check if the user has not verified his account.
      if (!user.verified) {
        if (user.isVerificationCodeExpired()) {
          // If the user is not verified and the verification code has expired, resend the verification code and return a 403 status
          await sendVerificationCode(user);

          res.status(403).json({
            message:
              "Code has been resent to your email, Please verify your account before logging in.",
            verificationUrl: `${APP_DOMAIN}:${APP_PORT}/verify?email=${user.email}`,
          });
        } else {
          // If the user is not verified and the verification code is still valid, return a 403 status with a message
          res.status(403).json({
            message: "Please verify your account before logging in.",
            verificationUrl: `${APP_DOMAIN}:${APP_PORT}/verify?email=${user.email}`,
          });
        }

        return;
      }

      if (!SECRET_KEY) throw new Error("Secret key is not defined.");

      user.password = undefined; // Remove password from user object before signing the token

      const token = jwt.sign(user.toJSON(), SECRET_KEY);

      res.cookie("Authorization", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ message: `Welcome ${user.fullName}`, user });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      // Check if the user isn't logged in by checking the Authorization cookie
      const user = req.user as any;
      if (!user && !req.cookies.Authorization) {
        res.status(400).json({ message: "User is not logged in." });
        return;
      }
      res.clearCookie("Authorization", {
        httpOnly: true,
        secure: false, // ✅ false in dev (no HTTPS on localhost)
        sameSite: "lax", // ✅ must be "none" to allow cross-origin
        path: "/",
      });
      res.status(200).json({ message: "User logged out successfully." });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong with the server." });
    }
  }

  static async googleLogin(req: Request, res: Response, next: NextFunction) {
    /* This method handles the Google login process. It is called when the user is redirected back from Google after authentication. */
    try {
      // The user object is added to the request by the passport-google-oauth20 strategy
      const user = req.user as any; // Cast to any to avoid TypeScript errors
      if (!user) {
        throw new AppError("User not found.", NotFoundError);
      }

      if (!SECRET_KEY) throw new Error("Secret key is not defined.");
      const token = jwt.sign(user.toJSON(), SECRET_KEY);

      res.cookie("Authorization", token, {
        httpOnly: true, // Prevent JavaScript access (XSS protection)
        sameSite: "strict", // Prevent CSRF attacks
        secure: ON_PRODUCTION === "true", // Use secure cookies in production
      });

      res.redirect("http://localhost:3000/"); // Redirect to the next step
      res.json({ message: `Welcome ${user.fullName}` });
    } catch (error) {
      next(error);
    }
  }

  static async updateShipping(req: Request, res: Response, next: NextFunction) {
    /* This method updates the user's shipping information. */
    const { address, city, postalCode, phone } = req.body;

    try {
      // Validate user input
      if (!address || !city || !postalCode || !phone) {
        throw new AppError("All fields are required.", RequireError);
      }

      // Get the user from the request object
      const user = req.userr;
      if (!user) {
        throw new AppError("User not found.", NotFoundError);
      }

      // Update the user's shipping information
      user.address = address;
      user.city = city;
      user.postalCode = postalCode;
      user.phone = phone;

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { address, city, postalCode, phone },
        { new: true }
      );

      if (!updatedUser) {
        throw new AppError("User not found.", NotFoundError);
      }

      if (!SECRET_KEY) throw new Error("Secret key is not defined.");

      const token = jwt.sign(updatedUser.toJSON(), SECRET_KEY);

      res.cookie("Authorization", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Shipping information updated successfully.",
        updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    try {
      // Validate user input
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new AppError("All fields are required.", RequireError);
      }

      // Get the user ID from the request object
      const userId = req.userr?._id;

      // Get the user from the DB
      const user = await User.findById(userId);
      if (!user) throw new AppError("User not found.", NotFoundError);

      // Check if the old password is correct
      const isMatch = await user.comparePassword(currentPassword);

      if (!isMatch)
        throw new AppError("Incorrect password.", AuthorizationError);

      if (newPassword === currentPassword) {
        throw new AppError(
          "New password must be different from current password.",
          ValidationError
        );
      }

      if (newPassword !== confirmPassword) {
        throw new AppError("Passwords do not match.", ValidationError);
      }

      // Update the user's password
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      if (!SECRET_KEY) throw new Error("Secret key is not defined.");

      const token = jwt.sign(user.toJSON(), SECRET_KEY);

      res.cookie("Authorization", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Password changed successfully.",
        updatedUser: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateName(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName } = req.body;

    try {
      // Validate user input
      if (!firstName || !lastName) {
        throw new AppError("All fields are required.", RequireError);
      }

      // Get the user from the request object
      const userId = req.userr?._id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName },
        { new: true }
      );

      if (!updatedUser) {
        throw new AppError("User not found.", NotFoundError);
      }

      if (!SECRET_KEY) throw new Error("Secret key is not defined.");

      const token = jwt.sign(updatedUser.toJSON(), SECRET_KEY);

      res.cookie("Authorization", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Name updated successfully.",
        updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.params;

    try {
      // Validate user input
      if (!email) {
        throw new AppError("Email is required.", RequireError);
      }

      // Get the user from the database
      const user = await User.findOne({ email });
      if (!user) {
        throw new AppError("User not found.", NotFoundError);
      }

      res.json({
        message: "User retrieved successfully.",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
