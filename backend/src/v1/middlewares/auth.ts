import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../..";
import { IUser } from "../models/user";

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies["Authorization"];

  if (!token) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }

  try {
    if (!SECRET_KEY) {
      res.status(400).send("Specify a SECRET_KEY in your env file.");
      return;
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    req.userr = <IUser>decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.userr) {
    res.status(403).send("Access denied.");
    return;
  }

  if (req.userr.role !== "admin") {
    res.status(403).send("Access denied. Only allowed for admins.");
    return;
  }

  next();
}

export { auth, isAdmin };
