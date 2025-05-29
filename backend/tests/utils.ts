import mongoose from "mongoose";
import { ProductModel } from "../src/db/Product";
import { IProduct } from "../src/types/product";

export const createMockProducts = async (count: number): Promise<IProduct[]> => {
    const products = Array.from({ length: count }, (_, index) => ({
      _id: new mongoose.Types.ObjectId(),
      name: `Test ${index}`,
      description: `Desc ${index}`,
      category: 'Cat',
      createdBy: 'System',
      createdAt: new Date(Date.now() - index * 1000),
      updatedBy: 'System',
      updatedAt: new Date(Date.now() - index * 1000),
      deletedAt: null,
      deletedBy: null,
    }));
    await ProductModel.insertMany(products);
    return products;
  };