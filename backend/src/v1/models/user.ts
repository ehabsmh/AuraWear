import { Model, model, Schema } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  verified?: boolean;
  role?: "customer" | "admin";
  birthDate: Date;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  avatar?: string;
  verificationCode?: string;
  verificationCodeExpires?: number;
  googleId?: string;
  isVerificationCodeExpired: () => boolean;
  generateVerificationCode: () => void;
  comparePassword: (password: string) => Promise<boolean>;
}

interface IUserVirtuals {
  fullName: string;
}

type UserModelType = Model<IUser, {}, {}, IUserVirtuals>;

const UserSchema = new Schema<IUser, UserModelType, {}, {}, IUserVirtuals>(
  {
    firstName: {
      type: String,
      required() {
        return !this.googleId; // Only require firstName if googleId is not set
      },
    },
    lastName: {
      type: String,
      required() {
        return !this.googleId; // Only require firstName if googleId is not set
      },
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required() {
        return !this.googleId; // Only require firstName if googleId is not set
      },
    },
    password: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    birthDate: {
      type: Date,
      required() {
        return !this.googleId; // Only require firstName if googleId is not set
      },
    },
    city: {
      type: String,
      required() {
        return !this.googleId; // Only require firstName if googleId is not set
      },
    },
    address: {
      type: String,
      required() {
        return !this.googleId; // Only require firstName if googleId is not set
      },
    },
    postalCode: {
      type: String,
      required() {
        return !this.googleId; // Only require firstName if googleId is not set
      },
    },
    phone: {
      type: String,
      unique: true,
      required() {
        return !this.googleId; // Only require firstName if googleId is not set
      },
    },
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.png",
    },
    verificationCode: {
      type: String,
      default: crypto.randomInt(100000, 999999).toString(), // Generates a random 6-digit number
    },
    verificationCodeExpires: {
      type: Number,
      default: Date.now() + 15 * 60 * 1000, // Default to 15 minutes from now
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows for unique constraint to be applied only when googleId is present
      default: undefined,
    },
  },
  {
    methods: {
      isVerificationCodeExpired() {
        return Date.now() >= this.verificationCodeExpires!;
      },
      generateVerificationCode() {
        this.verificationCode = crypto.randomInt(100000, 999999).toString();
        this.verificationCodeExpires = Date.now() + 15 * 60 * 1000; // Reset expiration to 15 minutes from now
      },
      async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password!);
      },
    },
    virtuals: {
      fullName: {
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
  }
);
// UserSchema.index({ email: 1 }, { unique: true });

// UserSchema.methods.isVerificationCodeExpired = function () {
//   return Date.now() >= this.verificationCodeExpires.getTime();
// };

// UserSchema.virtual("fullName").get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });

const User = model("User", UserSchema);
User.init(); // Initialize the model to create indexes

export default User;
