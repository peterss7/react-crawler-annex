import type { BaseActor } from "../../types/ActorTypes";

export type PlayerType = BaseActor<"player"> & {
    hp: number;
    spriteSrc: string;     // where to load image from
    spriteOffsetX?: number;
    spriteOffsetY?: number;
}