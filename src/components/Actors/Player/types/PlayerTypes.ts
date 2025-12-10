import type { BaseActor } from "../../types/ActorTypes";

export type SpriteDirection = "up" | "down" | "left" | "right"

export type PlayerSprite = {
    direction: SpriteDirection,
    src: string
}

export type PlayerType = BaseActor<"player"> & {
    hp: number;
    spriteSrcs: Record<SpriteDirection, string>;     
    spriteOffsetX?: number;
    spriteOffsetY?: number;
    playerImage?: HTMLImageElement | null;
}

export type UsePlayerReturnType = {
    player: PlayerType,
    sprite: HTMLImageElement | null;
}