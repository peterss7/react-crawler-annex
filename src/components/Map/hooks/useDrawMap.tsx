import { MAP_COLS, MAP_DATA, MAP_ROWS, TILE_SIZE } from "../constants/MapConfigConstants";
import type { MapType } from "../types/MapTypes";


export function useDrawMap() {

    function drawMap(
        ctx: CanvasRenderingContext2D,
        map: MapType
    ) {
        const { x: offsetX, y: offsetY } = map;

        // draw tiles
        for (let row = 0; row < MAP_ROWS; row++) {
            for (let col = 0; col < MAP_COLS; col++) {
                const tile = MAP_DATA[row][col];

                const tileX = offsetX + col * TILE_SIZE;
                const tileY = offsetY + row * TILE_SIZE;

                // simple color per tile type
                if (tile === 0) {
                    // if (map.floorImage == null) {
                    //     console.log("floor img is null");
                    //     return;
                    // }
                    // const floorImage = map.floorImage;
                    // const x = tileX - floorImage.width / 2;
                    // const y = tileY - floorImage.height / 2;

                    // ctx.drawImage(floorImage, x, y);
                } else if (tile === 1) {
                    ctx.fillStyle = "#666"; // wall
                    

                } else if (tile === 2) {
                    ctx.fillStyle = "#004488"; // water
                    

                } else {
                    ctx.fillStyle = "#000";                    
                }
                ctx.fillRect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }

        // optional: grid lines on top
        ctx.strokeStyle = "#222";
        ctx.lineWidth = 1;
        for (let row = 0; row <= MAP_ROWS; row++) {
            const y = offsetY + row * TILE_SIZE;
            ctx.beginPath();
            ctx.moveTo(offsetX, y);
            ctx.lineTo(offsetX + MAP_COLS * TILE_SIZE, y);
            ctx.stroke();
        }
        for (let col = 0; col <= MAP_COLS; col++) {
            const x = offsetX + col * TILE_SIZE;
            ctx.beginPath();
            ctx.moveTo(x, offsetY);
            ctx.lineTo(x, offsetY + MAP_ROWS * TILE_SIZE);
            ctx.stroke();
        }
    }

    return { drawMap }
}
