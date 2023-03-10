import { Schema } from "mongoose";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string[];
  slug: string;
  attributes: object;
  image: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductVariant extends IProduct {
  productId: object;
}

export interface IInventory {
  quantity: number;
  productId: Schema.Types.ObjectId;
  variantId: Schema.Types.ObjectId;
}
