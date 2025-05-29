import mongoose from 'mongoose';
import { IProduct } from '../types/product';

export const ProductSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null, required: false },
    deletedBy: { type: String, default: null, required: false },
}, { strict: true });

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);