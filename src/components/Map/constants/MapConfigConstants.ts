
export const TILE_SIZE = 85;

export const MAP_COLS = 16;
export const MAP_ROWS = 8;

// 0 = floor, 1 = wall, 2 = water (whatever you want)
export const MAP_DATA: number[][] = [
    [5, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 6],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [3, 0, 0, 0, 12, 13, 0, 0, 11, 0, 0, 0, 0, 0, 0, 9],
    [3, 0, 0, 0, 14, 15, 0, 0, 10, 0, 0, 0, 2, 0, 0, 9],
    [3, 0, 0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [3, 0, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
];

export const MAP_WALL_B_SRC: string = "/img/wall-bottom.png";
export const MAP_WALL_T_SRC: string = "/img/wall-top.png";
export const MAP_WALL_L_SRC: string = "/img/wall-left.png";
export const MAP_WALL_R_SRC: string = "/img/wall-right.png";
export const MAP_WALL_C_SRC: string = "/img/wall-corner.png";
export const MAP_WALL_C2_SRC: string = "/img/wall-corner2.png";
export const MAP_WALL_C3_SRC: string = "/img/wall-corner3.png";
export const MAP_WALL_C4_SRC: string = "/img/wall-corner4.png";
export const MAP_FLOOR_SRC: string = "/img/floor.png";

export const MAP_WATER_SRC: string = "/img/water-singular.png";
export const MAP_WATER_V_1_2_SRC: string = "/img/water-vertical-1-2.png";
export const MAP_WATER_V_2_2_SRC: string = "/img/water-vertical-2-2.png";

export const MAP_WATER_SQ_1_4_SRC: string = "/img/water-sq-1-4.png";
export const MAP_WATER_SQ_2_4_SRC: string = "/img/water-sq-2-4.png";
export const MAP_WATER_SQ_3_4_SRC: string = "/img/water-sq-3-4.png";
export const MAP_WATER_SQ_4_4_SRC: string = "/img/water-sq-4-4.png";

export const MAP_WATER_H_1_2_SRC: string = "/img/water-rect-1-2.png";
export const MAP_WATER_H_2_2_SRC: string = "/img/water-rect-2-2.png";
