import { IProduct } from "../interfaces/product";
import Product from "../models/product";
import { NextFunction, Request, Response } from "express";

export async function getPaginatedProducts(
  queryParams: Request["query"],
  filter: IProduct | {} = {}
) {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find(filter).skip(skip).limit(limit);
  const count = await Product.countDocuments(filter);

  return {
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    page,
    limit,
    products,
  };
}
