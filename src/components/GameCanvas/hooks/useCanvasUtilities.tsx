import type { CrawlerDimensions } from "../../../shared/types/SharedTypes";
import { CANVAS_BG_COLOR } from "../constants/CanvasColorConstants";

export function useCanvasUtilities() {

    function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.fillStyle = CANVAS_BG_COLOR;
        ctx.fillRect(0,0,width, height);
        ctx.fill();
    }

    return {
        drawBackground
    }
}