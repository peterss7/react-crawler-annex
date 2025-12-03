import type { PlayerType } from "../../Actors/Player/types/PlayerTypes";

export type CanvasProps = {
    // dimensions: CanvasDimensions;
    background: string;
    ctx: CanvasRenderingContext2D | null;
    player: PlayerType;
} | CanvasDimensions;

export type CanvasDimensions = {
    width: number;
    height: number;
};