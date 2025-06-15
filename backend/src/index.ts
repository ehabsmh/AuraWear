import express from "express";
import "dotenv/config";
import DB from "./v1/database/db";
const app = express();
const port = 3000;

// Get all environment variables
export const { DB_CONNECTION, DB_NAME } = process.env;
export const db = new DB();

app.listen(port, () => console.log(`Aura Wear listening on port ${port}!`));
