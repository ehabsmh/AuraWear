import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function decodeToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
