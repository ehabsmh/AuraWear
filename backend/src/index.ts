import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import DB from "./v1/database/db";
import router from "./v1/views/api";
import AppError from "./v1/service/error";
import cookieParser from "cookie-parser";
import initializeGoogleAuth from "./v1/service/googleAuth";
import cors from "cors";
const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Get all environment variables
export const {
  DB_CONNECTION,
  DB_NAME,
  GMAIL_APP_PASSWORD,
  SECRET_KEY,
  APP_DOMAIN,
  APP_PORT,
  ON_PRODUCTION,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env;

export const db = new DB();

app.use([express.json(), cookieParser()]);

initializeGoogleAuth(app);

app.use("/api/v1", router);

app.use(
  (
    error: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      res
        .status(error.statusCode)
        .json({ name: error.name, message: error.message });
      return;
    }
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
);

app.listen(port, () => console.log(`Aura Wear listening on port ${port}!`));
