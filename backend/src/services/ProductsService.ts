import type { Product, IProduct } from "../types/product";
import { ProductModel } from "../db/Product";
import { User } from "../types/user";
import mongoose from "mongoose";

const ProductsService = {
    getProducts: async (page: number = 1, limit: number = 10): Promise<IProduct[]> => {
        if (page < 1 || limit < 1) {
            throw new Error('Invalid page or limit');
        }
        const skip = (page - 1) * limit;
        const products = await ProductModel.find({ deletedAt: null }, { __v: 0 })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        return products.map(product => product.toObject());
    },

    getProductById: async (id: string): Promise<IProduct | null> => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid id format');
        }
        const product = await ProductModel.findOne({ _id: id, deletedAt: null }, { __v: 0 });
        if (!product) {
            return null;
        }
        return product.toObject();
    },

    createProduct: async (product: Omit<Product, "id">, user: User): Promise<IProduct> => {
        const created = await ProductModel.create({
            ...product,
            updatedBy: user.name,
            updatedAt: new Date(),
            createdBy: user.name,
            createdAt: new Date(),
        });
        return created.toObject();
    },

    updateProduct: async (id: string, product: Omit<Product, "id">, user: User): Promise<IProduct | null> => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid id format');
        }

        return ProductModel.findOneAndUpdate({ _id: id, deletedAt: null }, {
            ...product,
            updatedBy: user.name,
            updatedAt: new Date(),
        }, {
            new: true,
            select: { __v: 0 },
            runValidators: true,
            strict: true
        });
    },

    deleteProduct: async (id: string, user: User): Promise<IProduct | null> => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid id format');
        }
        const deleted = await ProductModel.findOneAndUpdate({ _id: id, deletedAt: null }, {
            updatedBy: user.name,
            deletedAt: new Date(),
            deletedBy: user.name,
            updatedAt: new Date(),
        }, {
            new: true,
        });
        return deleted?.toObject() || null;
    }
}

export default ProductsService;