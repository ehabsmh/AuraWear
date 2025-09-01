import express from "express";
import UsersController from "../controllers/users";
import passport from "passport";
import { auth } from "../middlewares/auth";

const usersRouter = express.Router();

// Authentication routes
usersRouter.post("/registration", UsersController.register);
usersRouter.post("/verification", UsersController.verify);
usersRouter.post("/code-resend", UsersController.resendCode);
usersRouter.patch("/change-password", auth, UsersController.changePassword);
usersRouter.post("/login", UsersController.login);
usersRouter.post("/logout", UsersController.logout);

// OAuth2.0 with Google
usersRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
usersRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  UsersController.googleLogin
);

// User management routes
usersRouter.put("/shipping", auth, UsersController.updateShipping);
usersRouter.patch("/change-name", auth, UsersController.updateName);
usersRouter.get("/:email", UsersController.getUserByEmail);

export default usersRouter;
