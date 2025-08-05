// import api from "@/config/axios.config";
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";

// const authConfig = NextAuth({
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "you@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { data } = await api.post("/auth/login", credentials);
//         if (data) {
//           return data;
//         }

//         return null;
//       },
//     }),

//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   callbacks: {
//     async session({ session }) {
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// });

// export const {
//   auth,
//   signIn,
//   signOut,
//   handlers: { GET, POST },
// } = NextAuth(authConfig);
