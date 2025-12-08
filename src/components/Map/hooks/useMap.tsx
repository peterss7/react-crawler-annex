import { useState } from "react";
import type { MapTileType } from "../types/MapTypes";
import { MAP_ROWS, MAP_COLS, MAP_DATA, TILE_SIZE, MAP_FLOOR_SRC, MAP_WALL_B_SRC, MAP_WALL_BL_SRC, MAP_WALL_BR_SRC, MAP_WALL_L_SRC, MAP_WALL_R_SRC, MAP_WALL_T_SRC, MAP_WALL_TL_SRC, MAP_WALL_TR_SRC } from "../constants/MapConfigConstants";
import { useTileSprites } from "./useTileSprites";

type DrawMapProps = {
    ctx: CanvasRenderingContext2D;
    cameraX: number;
    cameraY: number;
    viewWorldWidth: number;
    viewWorldHeight: number;
    zoom: number;
}
const spriteSources = {
    floor: MAP_FLOOR_SRC,
    wallb: MAP_WALL_B_SRC,
    wallbr: MAP_WALL_BR_SRC,
    wallbl: MAP_WALL_BL_SRC,
    walll: MAP_WALL_L_SRC,
    walltl: MAP_WALL_TL_SRC,
    wallt: MAP_WALL_T_SRC,
    walltr: MAP_WALL_TR_SRC,
    wallr: MAP_WALL_R_SRC
}



export default function useMap() {
    const [map, setMap] = useState<MapTileType[][] | null>(null);
    const tileSprites = useTileSprites(spriteSources);

    function drawMap(props: DrawMapProps) {
        const { cameraX, cameraY, viewWorldWidth, viewWorldHeight, zoom, ctx } = props;

        for (let row = 0; row < MAP_ROWS; row++) {
            for (let col = 0; col < MAP_COLS; col++) {
                const tile = MAP_DATA[row][col];

                const worldX = col * TILE_SIZE;
                const worldY = row * TILE_SIZE;

                if (
                    worldX + TILE_SIZE < cameraX ||
                    worldY + TILE_SIZE < cameraY ||
                    worldX > cameraX + viewWorldWidth ||
                    worldY > cameraY + viewWorldHeight
                ) {
                    continue;
                }

                const screenX = (worldX - cameraX) * zoom;
                const screenY = (worldY - cameraY) * zoom;
                const screenSize = TILE_SIZE * zoom;

                let img: HTMLImageElement | undefined;
                if (tile === 0) img = tileSprites.floor;
                else if (tile === 1) img = tileSprites.wallb;
                else if (tile === 2) img = tileSprites.wallbl;
                else if (tile === 3) img = tileSprites.wallbr;
                else if (tile === 4) img = tileSprites.walll;
                else if (tile === 5) img = tileSprites.walltl;
                else if (tile === 6) img = tileSprites.wallt;
                else if (tile === 7) img = tileSprites.walltr;
                else if (tile === 8) img = tileSprites.wallr;


                if (img) {
                    ctx.drawImage(img, screenX, screenY, screenSize, screenSize);
                } else {
                    // fallback while loading
                    ctx.fillStyle = "#333";
                    ctx.fillRect(screenX, screenY, screenSize, screenSize);
                }
            }
        }
    }

    return {
        map,
        drawMap
    }
}