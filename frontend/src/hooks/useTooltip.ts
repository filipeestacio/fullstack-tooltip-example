import { useState, useRef, useCallback } from "react"

const useTooltip = () => {

    interface TooltipState {
        isVisible: boolean
        x: number
        y: number
        content: string
    }

    const [tooltip, setTooltip] = useState<TooltipState>({
        isVisible: false,
        x: 0,
        y: 0,
        content: ''
    })

    const tooltipRef = useRef<HTMLDivElement>(null)
    // Throttle updates using requestAnimationFrame
    const rafRef = useRef<number | null>(null)
    const lastArgs = useRef<{ x: number, y: number, content: string } | null>(null)

    // Accepts MouseEvent or a partial with clientX/clientY for keyboard
    const showTooltip = useCallback((e: { clientX: number, clientY: number }, content: string) => {
        lastArgs.current = { x: e.clientX, y: e.clientY, content }
        if (rafRef.current === null) {
            rafRef.current = window.requestAnimationFrame(() => {
                if (lastArgs.current) {
                    setTooltip({
                        isVisible: true,
                        x: lastArgs.current.x,
                        y: lastArgs.current.y,
                        content: lastArgs.current.content
                    })
                }
                rafRef.current = null
            })
        }
    }, [])

    const hideTooltip = useCallback(() => {
        setTooltip({    
            isVisible: false,
            x: 0,
            y: 0,
            content: ''
        })
    }, [])

    return { 
        tooltipProps: tooltip,
        tooltipRef,
        showTooltip,
        hideTooltip 
    }
}

export default useTooltip