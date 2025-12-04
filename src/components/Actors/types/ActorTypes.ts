import type { PlayerType } from "../Player/types/PlayerTypes";

export type BaseActor<K extends string> = {
    x: number;
    y: number;
    radius: number;
    color: string;
    kind: K
}

export type ActorType = PlayerType;