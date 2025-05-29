import { NextFunction, Request, Response } from "express";
import { IProduct, Product } from "./types/product"
import { User } from "./types/user";

export const toProduct = (product: IProduct): Product => {
    return {
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        category: product.category,
        createdBy: product.createdBy,
        createdAt: product.createdAt,
        updatedBy: product.updatedBy,
        updatedAt: product.updatedAt,
    }
}

export const isValidBody = (body: any) => Object.keys(body).filter(key => !["name", "description", "category"].includes(key)).length === 0;

export const fakeAuth = (req: Request, res: Response, next: NextFunction) => {
    req.user = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
    } as User;
    next();
}