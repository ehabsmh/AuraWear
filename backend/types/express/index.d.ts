import { IUser } from "../../src/v1/models/user";

declare global {
  namespace Express {
    interface Request {
      userr?: IUser;
    }
  }
}
