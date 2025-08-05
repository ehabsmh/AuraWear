// lib/getCurrentUser.ts
import { cookies } from "next/headers";
import { decodeToken } from "./decode";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization")?.value;

  if (!token) return null;

  const decoded = decodeToken(token);

  if (!decoded) return null;

  return decoded; // contains { id, role, email, etc. }
}
