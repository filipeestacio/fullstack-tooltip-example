import mongoose from "mongoose";

export type Product = {
    id: string;
    name: string;
    description: string;
    category: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
};

export interface IProduct {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    category: string;
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    deletedAt: Date | null;
    deletedBy: string | null;
}