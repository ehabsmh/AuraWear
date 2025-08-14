import express from "express";
import upload from "../service/multer.config";
import DealsController from "../controllers/deals";

const dealsRouter = express.Router();

dealsRouter.post("/", upload.single("bannerImage"), DealsController.createDeal);
dealsRouter.get("/", DealsController.allDeals);
dealsRouter.get("/:slug", DealsController.bySlug);
dealsRouter.post("/products", DealsController.addProductsToDeal);

export default dealsRouter;
