import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { MapTileType, MapType } from "../types/MapTypes";
import { MAP_FLOOR_SRC, MAP_WALL_B_SRC, MAP_WALL_BR_SRC, MAP_WALL_BL_SRC, MAP_WALL_L_SRC, MAP_WALL_TL_SRC, MAP_WALL_T_SRC, MAP_WALL_TR_SRC, MAP_WALL_R_SRC, MAP_COLS, MAP_DATA, MAP_ROWS, TILE_SIZE } from "../constants/MapConfigConstants";
import { useTileSprites } from "./useTileSprites";

type DrawMapProps = {
    ctx: CanvasRenderingContext2D;
    cameraX: number;
    cameraY: number;
    viewWorldWidth: number;
    viewWorldHeight: number;
    zoom: number;
    mapRect: MapType;
}

type DrawBorderProps = {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    mapRect: MapType;
}

type GetTileAtType = {
    row: number;
    col: number;
    tile: number;
}

type MapContextValue = {
    map: MapTileType[][] | null;
    drawMap: (props: DrawMapProps) => void;
    isWalkable: (width: number, height: number) => boolean;
    drawBorder: (props: DrawBorderProps) => void;
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

const MapContext = createContext<MapContextValue | null>(null);

type MapProviderProps = {
    children: ReactNode;
}

export function MapProvider({
    children
}: MapProviderProps) {
    const [map, setMap] = useState<MapTileType[][] | null>(null);
    const tileSprites = useTileSprites(spriteSources);

    function getTileAt(width: number, height: number): GetTileAtType | null {
        const col = Math.floor(width / TILE_SIZE);
        const row = Math.floor(height / TILE_SIZE);

        if (row < 0 || col < 0 || row >= MAP_ROWS || col >= MAP_COLS) {
            return null;
        }

        return { row, col, tile: MAP_DATA[row][col] };
    }

    function isWalkable(width: number, height: number): boolean {
        const hit = getTileAt(width, height);
        if (!hit) return false;

        return hit.tile === 0;
    }

    function drawMap(props: DrawMapProps) {
        const { cameraX, cameraY, viewWorldWidth, viewWorldHeight, zoom, ctx, mapRect } = props;

        for (let row = 0; row < MAP_ROWS; row++) {
            for (let col = 0; col < MAP_COLS; col++) {
                const tile = MAP_DATA[row][col];

                const worldX = col * TILE_SIZE;
                const worldY = row * TILE_SIZE;

                // cull tiles off-screen in world space
                if (
                    worldX + TILE_SIZE < cameraX ||
                    worldY + TILE_SIZE < cameraY ||
                    worldX > cameraX + viewWorldWidth ||
                    worldY > cameraY + viewWorldHeight
                ) {
                    continue;
                }

                const screenX = mapRect.x + (worldX - cameraX) * zoom; // ⬅ offset by mapRect.x
                const screenY = mapRect.y + (worldY - cameraY) * zoom; // ⬅ offset by mapRect.y
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

    function drawBorder(props: DrawBorderProps) {
        const {ctx, width, height, mapRect} = props;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, mapRect.x, height);
        ctx.fillRect(0, 0, width, mapRect.y);
        ctx.fillRect(width - mapRect.x, 0, mapRect.width, height);
        ctx.fillRect(0, height - TILE_SIZE * 1.5, width, TILE_SIZE * 1.5);
    }

    const contextValue: MapContextValue = {
        map, isWalkable, drawMap, drawBorder
    }

    return (
        <MapContext.Provider value={contextValue}>
            {children}
        </MapContext.Provider>
    );
}

export function useMapContext(): MapContextValue {
    const ctx = useContext(MapContext);
    if (!ctx) {
        throw new Error("useMapContext must used inside MapProvider");
    }
    return ctx;
}