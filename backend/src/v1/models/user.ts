import { Model, model, Schema } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

interface IUser {
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
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
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
      required: [true, "Birth date is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
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

export default User;
