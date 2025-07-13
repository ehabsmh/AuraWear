import express from "express";
import CartController from "../controllers/cart";

const cartRouter = express.Router();

cartRouter.post("/", CartController.addToCart);
cartRouter.patch("/:cartItemId", CartController.updateCartItem);
cartRouter.delete("/:cartItemId", CartController.deleteFromCart);
cartRouter.get("/", CartController.getCart);

export default cartRouter;
