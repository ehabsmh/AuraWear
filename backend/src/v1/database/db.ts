import mongoose from "mongoose";
import { DB_CONNECTION } from "../..";

class DB {
  constructor() {
    // Connect to the database.
    mongoose
      .connect(`${DB_CONNECTION!}/aura_wear`)
      .then(() => {
        console.log("Connected to the database successfully.");
      })
      .catch(() => {
        console.error("Failed to connect to the database.");
      });
  }
}

export default DB;
