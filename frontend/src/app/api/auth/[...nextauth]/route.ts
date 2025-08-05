import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import api from "@/config/axios.config";

const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await api.post("/auth/login", credentials);
          return data;
        } catch (error) {
          console.error("Login failed", error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session }) {
      // you can return token info here if needed
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// ✅ This is the correct export for App Router:
export { handler as GET, handler as POST };
