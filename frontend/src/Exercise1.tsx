import { useEffect, useState } from "react"
import ProductList from "./ProductList"
import styles from './styles/Exercise1.module.css';

interface Product {
    id: number
    name: string
    category: string
    description: string
    createdAt: string
    updatedAt: string
    createdBy: string
    updatedBy: string
}

function Exercise1() {
    const [products, setProducts] = useState<Product[]>([])

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:3000/products')
        if (!response.ok) {
            throw new Error('Failed to fetch products')
        }
        const { data } = await response.json()
        
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])    

    return (
        <main className={styles.main}>
            <p>Lorem ipsum</p>
            {products.length > 0 ? (
                <ProductList
                    products={products}
                />
            ) : (
                <p className={styles.noProducts}>No products found. Please check that the backend is running and that the Database is populated.</p>
            )
        }
        </main>
    );
}

export default Exercise1;