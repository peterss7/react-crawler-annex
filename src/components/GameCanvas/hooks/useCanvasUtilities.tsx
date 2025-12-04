import { CANVAS_BG_COLOR } from "../constants/CanvasColorConstants";
import type { CanvasDimensions } from "../types/GameCanvasTypes";

export function useCanvasUtilities() {

    function drawBackground(ctx: CanvasRenderingContext2D, dims: CanvasDimensions) {
        const {width, height} = dims;
        ctx.fillStyle = CANVAS_BG_COLOR;
        ctx.fillRect(0,0,width, height);
        ctx.fill();
    }

    return {
        drawBackground
    }
}