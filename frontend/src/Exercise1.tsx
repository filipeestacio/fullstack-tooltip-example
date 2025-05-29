import { useEffect, useState } from "react"
import useTooltip from "./hooks/useTooltip"
import Tooltip from "./Tooltip"

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
    const { tooltipProps, showTooltip, hideTooltip, tooltipRef } = useTooltip()

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

    // Helper for keyboard focus: position tooltip below the element
    const handleFocus = (e: React.FocusEvent<HTMLLIElement>, description: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        showTooltip({
            clientX: rect.left + rect.width / 2,
            clientY: rect.bottom,
        } as React.MouseEvent<HTMLElement>, description)
    }

    return (
        <main>
            <p>Lorem ipsum</p>
            <ul>
                {products.map((product) => (
                    <li 
                        key={product.id}
                        className="product-item"
                        tabIndex={0}
                        aria-describedby={tooltipProps.isVisible ? `tooltip-${product.id}` : undefined}
                        onMouseEnter={(e) => showTooltip(e, product.description)}
                        onMouseMove={(e) => showTooltip(e, product.description)}
                        onMouseLeave={hideTooltip}
                        onFocus={(e) => handleFocus(e, product.description)}
                        onBlur={hideTooltip}
                    >
                        {product.name}
                    </li>
                ))}
            </ul>
            <Tooltip 
                ref={tooltipRef}
                isVisible={tooltipProps.isVisible}
                content={tooltipProps.content}
                x={tooltipProps.x}
                y={tooltipProps.y}
                tooltipId={tooltipProps.isVisible ? `tooltip-${products.find(p => p.description === tooltipProps.content)?.id}` : undefined}
            />
        </main>
    );
}

export default Exercise1;