import { expect, describe, it, beforeEach } from "vitest";
import request from "supertest";
import app from "../../src/app";
import { ProductModel } from "../../src/db/Product";
import { createMockProducts } from "../utils";


beforeEach(async () => {
    await ProductModel.deleteMany({});
});

describe('Products Router', () => {
    it('should return paginated products with correct structure', async () => {
        await createMockProducts(15);
        const response = await request(app).get('/products?page=1&limit=10');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(10);
        expect(response.body).toHaveProperty('pagination');
        expect(response.body.pagination).toMatchObject({
            page: 1,
            limit: 10,
        });
    });

    it('should return a product by id (200)', async () => {
        const products = await createMockProducts(1);
        const response = await request(app).get(`/products/${products[0]._id}`);
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe(products[0].name);
    });

    it('should return 404 for non-existent product', async () => {
        const fakeId = "60c72b2f9b1e8e6d88f1e8e6";
        const response = await request(app).get(`/products/${fakeId}`);
        expect(response.status).toBe(404);
    });

    it('should create a product and return correct structure', async () => {
        const response = await request(app)
            .post('/products')
            .send({ name: "New Product", description: "Desc", category: "Cat" });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toMatchObject({
            name: "New Product",
            description: "Desc",
            category: "Cat"
        });
    });

    it('should return 400 for invalid product creation', async () => {
        const response = await request(app)
            .post('/products')
            .send({ price: 20 });
        expect(response.status).toBe(400);
    });

    it('should update a product (200)', async () => {
        const products = await createMockProducts(1);
        const response = await request(app)
            .put(`/products/${products[0]._id}`)
            .send({ name: "Updated Product" });
        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("Updated Product");
    });

    it('should return 400 for invalid product update', async () => {
        const products = await createMockProducts(1);
        const response = await request(app)
            .put(`/products/${products[0]._id}`)
            .send({ price: 20 });
        expect(response.status).toBe(400);
    });

    it('should return 404 for updating non-existent product', async () => {
        const fakeId = "60c72b2f9b1e8e6d88f1e8e6";
        const response = await request(app)
            .put(`/products/${fakeId}`)
            .send({ name: "Doesn't exist" });
        expect(response.status).toBe(404);
    });

    it('should delete a product (204)', async () => {
        const products = await createMockProducts(1);
        const response = await request(app).delete(`/products/${products[0]._id}`);
        expect(response.status).toBe(204);
    });

    it('should return 404 for deleting non-existent product', async () => {
        const fakeId = "60c72b2f9b1e8e6d88f1e8e6";
        const response = await request(app).delete(`/products/${fakeId}`);
        expect(response.status).toBe(404);
    });
});