import type { PlayerType } from "../../Actors/Player/types/PlayerTypes";

export type CanvasDimensions = {
    width: number;
    height: number;
};

export type GameCanvasProps = {
    player: PlayerType;
} & CanvasDimensions;