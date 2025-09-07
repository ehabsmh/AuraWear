import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function decodeToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!);

    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization")?.value;

  if (!token) return null;

  const decoded = decodeToken(token);

  if (!decoded) return null;

  return decoded; // contains { id, role, email, etc. }
}
