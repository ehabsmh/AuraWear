import express from "express";
import CartController from "../controllers/cart";

const cartRouter = express.Router();

cartRouter.get("/", CartController.getCart);
cartRouter.post("/", CartController.addToCart);
cartRouter.patch("/:cartItemId", CartController.updateCartItem);
cartRouter.delete("/:cartItemId", CartController.deleteFromCart);

export default cartRouter;
