import { model, Schema } from "mongoose";

const UserSchema = new Schema({
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
  },
  password: {
    type: String,
    required: [true, "Password is required"],
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
    type: Number,
    default: Math.floor(100000 + Math.random() * 900000), // Generates a random 6-digit number
  },
  verificationCodeExpires: {
    type: Date,
    default: Date.now() + 15 * 60 * 1000, // Default to 15 minutes from now
  },
});
// UserSchema.index({ email: 1 }, { unique: true });

UserSchema.methods.isVerificationCodeExpired = function () {
  return Date.now() >= this.verificationCodeExpire;
};

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = model("User", UserSchema);

export default User;
