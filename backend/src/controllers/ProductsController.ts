import { Request, Response } from "express";
import ProductsService from "../services/ProductsService";
import mongoose from "mongoose";
import { isValidBody, toProduct } from "../utils";
import type { ApiResponse } from "../types/responses";
import type { Product } from "../types/product";

const ProductController = {
    getProducts: async (req: Request, res: Response<ApiResponse<Product[]>>) => {
        const { page, limit } = req.query;
        try {
            const products = await ProductsService.getProducts(Number(page), Number(limit));
            res.status(200).json({ data: products.map(toProduct), pagination: {
                page: Number(page),
                limit: Number(limit),
            } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getProductById: async (req: Request, res: Response<ApiResponse<Product>>) => {
        try {
            const found = await ProductsService.getProductById(req.params.id);
            if (!found) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.status(200).json({ data: toProduct(found) });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    
    createProduct: async (req: Request, res: Response<ApiResponse<Product>>) => {
        const { user, body } = req;
        try {
            if (!isValidBody(body)) {
                return res.status(400).json({ error: "Invalid product data" });
            }
            const created = await ProductsService.createProduct(body, user);
            
            res.status(201).json({ data: toProduct(created) });
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({ error: error.message });
            }
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    
    updateProduct: async (req: Request, res: Response<ApiResponse<Product>>) => {
        const { user, body } = req;
        const { id } = req.params;
        try {
            if (!isValidBody(body)) {
                return res.status(400).json({ error: "Invalid product data" });
            }
            const updated = await ProductsService.updateProduct(id, body, user);
            if (!updated) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.status(200).json({ data: toProduct(updated) });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    
    deleteProduct: async (req: Request, res: Response<ApiResponse<void>>) => {
        const { user } = req;
        try {
            const deleted = await ProductsService.deleteProduct(req.params.id, user);
            if (!deleted) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default ProductController;