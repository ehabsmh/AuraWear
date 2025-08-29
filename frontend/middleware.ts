import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard", "/cart", "/orders", "/settings"];
const publicRoutes = ["/login", "/register", "/shop", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const allCookies = await cookies();

  const AuthorizationCookie = allCookies.get("Authorization")?.value;

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !AuthorizationCookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    AuthorizationCookie &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    // redirect to home page
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 5. Redirect to / if the user is authenticated
  if (
    isPublicRoute &&
    AuthorizationCookie &&
    !req.nextUrl.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
