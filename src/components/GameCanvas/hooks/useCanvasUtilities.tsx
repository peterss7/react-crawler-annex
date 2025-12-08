import { CANVAS_BG_COLOR } from "../constants/CanvasColorConstants";

export function useCanvasUtilities() {

    function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = CANVAS_BG_COLOR;
        ctx.fillRect(0, 0, width, height);
    }
    
    function clamp(value: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, value));
    }
    
    return {
        drawBackground,
        clamp
    }
}