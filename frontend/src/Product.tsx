import type { TooltipProps } from "./Tooltip";

export interface ProductType {
    id: number;
    name: string;
    category: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    }

    interface ProductProps {
    product: ProductType;
    tooltipProps: TooltipProps;
    showTooltip: (e: { clientX: number; clientY: number }, description: string) => void;
    hideTooltip: () => void;
    handleFocus: (e: React.FocusEvent<HTMLLIElement>, description: string) => void;
    }

    function Product({ product, tooltipProps, showTooltip, hideTooltip, handleFocus }: ProductProps) {
    return (
        <li
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
    );
}

export default Product;
export type { ProductType as Product }; 