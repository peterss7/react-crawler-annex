import type { SpriteDirection } from "../types/PlayerTypes";

export const SPRITE_UP_SRC = "/img/PLAYER_0.png";
export const SPRITE_DOWN_SRC = "/img/PLAYER_0.png";
export const SPRITE_RIGHT_SRC = "/img/PLAYER_1.png";
export const SPRITE_LEFT_SRC = "/img/PLAYER_2.png";

export const PLAYER_SPRITES: Record<SpriteDirection, string> ={
    up: SPRITE_UP_SRC,
    down: SPRITE_DOWN_SRC,
    left: SPRITE_LEFT_SRC,
    right: SPRITE_RIGHT_SRC
}