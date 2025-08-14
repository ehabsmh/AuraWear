import { NextFunction, Request, Response } from "express";
import Deal from "../models/deals";
import AppError, { ErrorName } from "../service/error";
import { uploadStream } from "../service/cloudinary-handling";
import Product from "../models/product";

class DealsController {
  static async createDeal(req: Request, res: Response, next: NextFunction) {
    try {
      const dealData = req.body;
      const bannerImage = req.file;

      // create the deal
      const deal = new Deal(dealData);

      // add bannerImage to the deal instance
      if (!bannerImage)
        throw new AppError(
          "Please upload a banner image",
          ErrorName.RequireError
        );

      const url = await uploadStream(bannerImage, "deals");

      deal.bannerImage = url;

      await deal.save();

      res.status(201).json({ message: "Deal created successfully", deal });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async addProductsToDeal(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { dealId, productIds } = req.body;

      // Find the deal by ID
      const deal = await Deal.findById(dealId);
      if (!deal) {
        throw new AppError("Deal not found", ErrorName.NotFoundError);
      }

      const products = await Product.find({ _id: { $in: productIds } });
      const hasDifferentSex = products.some(
        (product) => product.sex !== deal.sex
      );
      if (hasDifferentSex)
        throw new AppError(
          "Products with different sex cannot be added to the deal",
          ErrorName.ValidationError
        );

      deal.products.push(...productIds);

      await deal.save();

      res
        .status(200)
        .json({ message: "Products added to deal successfully", deal });
    } catch (error) {
      next(error);
    }
  }

  static async allDeals(req: Request, res: Response, next: NextFunction) {
    try {
      const deals = await Deal.find({
        isActive: true,
        $or: [
          { endDate: { $gte: new Date() } },
          { endDate: { $exists: false } },
        ],
      });

      res.status(200).json(deals);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async bySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const deal = await Deal.findOne({ slug, isActive: true }).populate(
        "products"
      );

      if (!deal) {
        throw new AppError("Deal not found", ErrorName.NotFoundError);
      }

      res.status(200).json(deal);
    } catch (error) {
      next(error);
    }
  }
}

export default DealsController;
