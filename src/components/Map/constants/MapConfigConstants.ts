
export const TILE_SIZE = 50;

export const MAP_COLS = 16;
export const MAP_ROWS = 8;


export const MAP_DATA: number[][] = [
    [5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7],
    [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [4, 2, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [4, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 2, 0, 0, 8],
    [4, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [4, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
];

export const MAP_FLOOR_SRC: string =  "/img/FLOOR_1.png";

export const MAP_WALL_B_SRC: string = "/img/WALL_3.png";
export const MAP_WALL_BL_SRC: string = "/img/WALL_7.png";
export const MAP_WALL_BR_SRC: string = "/img/WALL_8.png";
export const MAP_WALL_L_SRC: string = "/img/WALL_1.png";
export const MAP_WALL_TL_SRC: string = "/img/WALL_5.png";
export const MAP_WALL_R_SRC: string = "/img/WALL_2.png";
export const MAP_WALL_T_SRC: string = "/img/WALL_4.png";
export const MAP_WALL_TR_SRC: string = "/img/WALL_6.png";

export const WORLD_WIDTH = MAP_COLS * TILE_SIZE;
export const WORLD_HEIGHT = MAP_ROWS * TILE_SIZE;