import type { MonsterType } from "../../components/Actors/Monster/types/MonsterTypes";
import type { PlayerType } from "../../components/Actors/Player/types/PlayerTypes";

export type BaseActorType<K extends string> = {
    x: number;
    y: number;
    radius: number;
    color: string;
    kind: K;
};

export type ActorType = PlayerType | MonsterType;