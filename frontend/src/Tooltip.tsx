import { forwardRef } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
    isVisible: boolean
    content: string
    x: number
    y: number
    tooltipId?: string
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({ isVisible, content, x, y, tooltipId }, ref) => {
    if (!isVisible) {
        return null;
    }

    const offsetX = 15;
    const offsetY = 15;

    return (
        <div
            ref={ref}
            className={`${styles.tooltip} ${isVisible ? styles.show : ''}`}
            style={{
                left: `${x + offsetX}px`,
                top: `${y + offsetY}px`,
            }}
            id={tooltipId}
        >
            {content}
        </div>
    );
});

export default Tooltip;