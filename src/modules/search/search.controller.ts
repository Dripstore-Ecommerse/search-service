import { catchAsync } from "../utils";
import { Request, Response } from "express";
import esClient from "../utils/es-client";
import { searchProductByName } from "../utils/es-events";

export const createProduct = catchAsync(
  async (_req: Request, _res: Response) => {}
);

export const searchProducts = catchAsync(
  async (req: Request, res: Response) => {
    const body = await searchProductByName(req.body.searchTerm);
    res.status(200).json({ status: "success", data: body });
  }
);
