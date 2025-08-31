import express from "express";
import WishlistController from "../controllers/wishlist";

const wishlistRouter = express.Router();

wishlistRouter.post("/", WishlistController.addItem);
wishlistRouter.delete("/:id", WishlistController.removeItem);
wishlistRouter.get("/items", WishlistController.getItems);
wishlistRouter.get("/item", WishlistController.checkExistence);

export default wishlistRouter;
