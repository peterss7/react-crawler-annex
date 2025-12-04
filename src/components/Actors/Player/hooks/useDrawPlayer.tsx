import type { PlayerType } from "../types/PlayerTypes";

export const useDrawPlayer = () => {

    function drawPlayer(
        ctx: CanvasRenderingContext2D,
        player: PlayerType,
        img: HTMLImageElement | null,
    ) {
        if (img == null) return;
        console.log(`img width: ${img.width}`);
        const x = player.x - img.width / 2;
        const y = player.y - img.height / 2;
        
        ctx.drawImage(img, x, y);
    }

    return { drawPlayer }
}