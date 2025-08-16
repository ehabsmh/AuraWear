export interface IUser {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  role: string;
  avatar: string;
  address?: string;
  postalCode?: string;
  phone?: string;
  city?: string;
  verificationCode?: string;
  verificationCodeExpires?: number;
  googleId?: string;
}
