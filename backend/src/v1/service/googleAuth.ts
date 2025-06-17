import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../..";
import User from "../models/user";

// Initialize Google OAuth2.0 authentication strategy
function initializeGoogleAuth(app: express.Application) {
  app.use(passport.initialize());

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID!,
        clientSecret: GOOGLE_CLIENT_SECRET!,
        callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If the user does not exist, create a new user
          user = await User.create({
            googleId: profile.id,
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            email: profile.emails?.[0].value || "",
            avatar: profile.photos?.[0].value || "",
            verified: true,
          });
        }

        return cb(null, user);
      }
    )
  );
}

export default initializeGoogleAuth;
