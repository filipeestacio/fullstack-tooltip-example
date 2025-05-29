import type { Product as ProductType } from "./Product";
import Product from "./Product";
import useTooltip from "./hooks/useTooltip";
import Tooltip from "./Tooltip";
import styles from './styles/ProductList.module.css';

interface ProductListProps {
    products: ProductType[];
}

function ProductList({ products }: ProductListProps) {
    const { tooltipProps, showTooltip, hideTooltip, tooltipRef } = useTooltip()
    
    const handleFocus = (e: React.FocusEvent<HTMLLIElement>, description: string) => {
        const rect = e.currentTarget.getBoundingClientRect();
        showTooltip({
            clientX: rect.left + rect.width / 2,
            clientY: rect.bottom,
        } as React.MouseEvent<HTMLElement>, description)
    }

    return (
        <>
            <ul className={styles.productList}>
                {products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        tooltipProps={tooltipProps}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        handleFocus={handleFocus}
                    />
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
        </>
    );
}

export default ProductList; 