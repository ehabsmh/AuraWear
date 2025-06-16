import express from "express";
import UsersController from "../controllers/users";

const usersRouter = express.Router();

// Authentication routes
usersRouter.post("/registration", UsersController.register);
usersRouter.post("/verification", UsersController.verify);
usersRouter.post("/code-resend", UsersController.resendCode);
usersRouter.post("/login", UsersController.login);
usersRouter.post("/logout", UsersController.logout);

// User management routes

export default usersRouter;
