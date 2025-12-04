import type { PlayerType } from "../types/PlayerTypes";

export const useDrawPlayer = () => {

    function drawPlayer(ctx: CanvasRenderingContext2D, player: PlayerType) {
        const {x, y, color, radius} = player;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, radius, radius);
        ctx.fill();

    }

    return {drawPlayer}
}