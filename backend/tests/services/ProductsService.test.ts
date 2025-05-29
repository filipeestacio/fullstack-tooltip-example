import { describe, it, expect, beforeEach } from 'vitest';
import ProductsService from '../../src/services/ProductsService';
import { ProductModel } from '../../src/db/Product';
import mongoose from 'mongoose';
import { IProduct } from '../../src/types/product';
import { createMockProducts } from '../utils';

beforeEach(async () => {
  await ProductModel.deleteMany({});
});

describe('ProductsService', () => {
  describe('getProducts', () => {
    it('returns products', async () => {
      const products = await createMockProducts(20);
      const result = await ProductsService.getProducts();
      expect(result.length).toBe(10);
      expect(result.map(p => ({
        name: p.name,
        description: p.description,
        category: p.category,
        createdBy: p.createdBy,
        updatedBy: p.updatedBy
      }))).toEqual(products.slice(0, 10).map(p => ({  
        name: p.name,
        description: p.description,
        category: p.category,
        createdBy: p.createdBy,
        updatedBy: p.updatedBy
      })));
    });

    it('returns empty array if no products', async () => {
      const result = await ProductsService.getProducts();
      expect(result).toEqual([]);
    });

    it('returns products with pagination', async () => {
      const products = await createMockProducts(20);
      const result = await ProductsService.getProducts(2, 5);
      expect(result.length).toBe(5);
      expect(result.map(p => ({
        name: p.name,
        description: p.description,
        category: p.category,
        createdBy: p.createdBy,
        updatedBy: p.updatedBy
      }))).toEqual(products.slice(5, 10).map(p => ({
        name: p.name,
        description: p.description,
        category: p.category,
        createdBy: p.createdBy,
        updatedBy: p.updatedBy
      })));
    });

    it('does not return deleted products', async () => {
      const products: IProduct[] = await createMockProducts(5);
      await ProductModel.updateOne({ _id: products[0]._id }, { deletedAt: new Date() });
      const result = await ProductsService.getProducts();
      expect(result.length).toBe(4);
      expect(result.map(p => ({
        name: p.name,
        description: p.description,
        category: p.category,
        createdBy: p.createdBy,
        updatedBy: p.updatedBy
      }))).toEqual(products.slice(1, 5).map(p => ({
        name: p.name,
        description: p.description,
        category: p.category,
        createdBy: p.createdBy,
        updatedBy: p.updatedBy
      })));
    });

    it('handles invalid page number', async () => {
      await expect(ProductsService.getProducts(-1)).rejects.toThrow('Invalid page or limit');
    });

    it('handles invalid limit', async () => {
      await expect(ProductsService.getProducts(0, -1)).rejects.toThrow('Invalid page or limit');
    });

    it('returns products in correct order', async () => {
      const products = await createMockProducts(5);
      const result = await ProductsService.getProducts();
      expect(result[0].createdAt.getTime()).toBeGreaterThan(result[1].createdAt.getTime());
    });
  });

  describe('getProductById', () => {
    it('returns product if found', async () => {
      const products = await createMockProducts(1);
      const result = await ProductsService.getProductById(products[0]._id.toString());
      expect(result?.name).toEqual(products[0].name);
      expect(result?.description).toEqual(products[0].description);
      expect(result?.category).toEqual(products[0].category);
      expect(result?.createdBy).toEqual(products[0].createdBy);
      expect(result?.updatedBy).toEqual(products[0].updatedBy);
      expect(result?.createdAt).toEqual(products[0].createdAt);
      expect(result?.updatedAt).toEqual(products[0].updatedAt);
    });

    it('returns null if not found', async () => {
      const result = await ProductsService.getProductById(new mongoose.Types.ObjectId().toString());
      expect(result).toBeNull();
    });

    it('handles invalid id format', async () => {
      await expect(ProductsService.getProductById('invalid-id')).rejects.toThrow('Invalid id format');
    });

    it('returns null for deleted product', async () => {
      const products = await createMockProducts(1);
      await ProductModel.updateOne({ _id: products[0]._id }, { deletedAt: new Date() });
      const result = await ProductsService.getProductById(products[0]._id.toString());
      expect(result).toBeNull();
    });
  });

  describe('createProduct', () => {
    it('creates and returns product', async () => {
      const user = { name: 'Test' } as any;
      const product = { name: 'Test', description: 'Desc', category: 'Cat' } as IProduct;
      const result = await ProductsService.createProduct(product, user);
      expect(result.name).toEqual(product.name);
      expect(result.description).toEqual(product.description);
      expect(result.category).toEqual(product.category);
      expect(result.createdBy).toEqual(user.name);
      expect(result.updatedBy).toEqual(user.name);
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it('handles missing required fields', async () => {
      const user = { name: 'User' } as any;
      const product = { name: 'Test' } as IProduct;
      await expect(ProductsService.createProduct(product, user)).rejects.toThrow();
    });

    it('handles invalid user', async () => {
      const user = {} as any;
      const product = { name: 'Test', description: 'Desc', category: 'Cat' } as IProduct;
      await expect(ProductsService.createProduct(product, user)).rejects.toThrow();
    });
  });

  describe('updateProduct', () => {
    it('updates and returns product', async () => {
      const products = await createMockProducts(1);
      const user = { name: 'User' } as any;
      const product = { name: 'Updated Test', description: 'Updated Desc', category: 'Updated Cat' } as IProduct;
      const result = await ProductsService.updateProduct(products[0]._id.toString(), product, user);
      expect(result?.name).toEqual(product.name);
      expect(result?.description).toEqual(product.description);
      expect(result?.category).toEqual(product.category);
      expect(result?.updatedBy).toEqual(user.name);
      expect(result?.updatedAt).toBeDefined();
      expect(result?.createdAt).not.toEqual(result?.updatedAt);
    });

    it('handles non-existent product', async () => {
      const user = { name: 'User' } as any;
      const product = { name: 'Test' } as IProduct;
      const result = await ProductsService.updateProduct(new mongoose.Types.ObjectId().toString(), product, user);
      expect(result).toBeNull();
    });

    it('handles invalid id format', async () => {
      const user = { name: 'User' } as any;
      const product = { name: 'Test' } as IProduct;
      await expect(ProductsService.updateProduct('invalid-id', product, user)).rejects.toThrow('Invalid id format');
    });

    it('prevents updating deleted products', async () => {
      const products = await createMockProducts(1);
      const user = { name: 'User' } as any;
      await ProductModel.updateOne({ _id: products[0]._id }, { deletedAt: new Date() });
      const result = await ProductsService.updateProduct(products[0]._id.toString(), { name: 'Updated' } as Omit<IProduct, 'id'>, user);
      expect(result).toBeNull();
    }); 

    it('preserves original creation data', async () => {
      const products = await createMockProducts(1);
      const user = { name: 'User' } as any;
      const product = { name: 'Updated Test' } as IProduct;
      const result = await ProductsService.updateProduct(products[0]._id.toString(), product, user);
      expect(result?.createdAt).toEqual(products[0].createdAt);
      expect(result?.createdBy).toEqual(products[0].createdBy);
    });
  });

  describe('deleteProduct', () => {
    it('marks product as deleted and returns product', async () => {
      const products = await createMockProducts(1);
      const user = { name: 'User' } as any;
      await ProductsService.deleteProduct(products[0]._id.toString(), user);
      const result = await ProductModel.findById(products[0]._id);
      expect(result?.deletedAt).toBeDefined();
    });

    it('handles non-existent product', async () => {
      const user = { name: 'User' } as any;
      const result = await ProductsService.deleteProduct(new mongoose.Types.ObjectId().toString(), user);
      expect(result).toBeNull();
    });

    it('handles invalid id format', async () => {
      const user = { name: 'User' } as any;
      await expect(ProductsService.deleteProduct('invalid-id', user)).rejects.toThrow('Invalid id format');
    });

    it('prevents double deletion', async () => {
      const products = await createMockProducts(1);
      const user = { name: 'User' } as any;
      await ProductsService.deleteProduct(products[0]._id.toString(), user);
      const result = await ProductsService.deleteProduct(products[0]._id.toString(), user);
      expect(result).toBeNull();
    });
  });
}); 