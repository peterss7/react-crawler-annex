import type { BaseActor } from "../../types/ActorTypes";

export type PlayerType = BaseActor<"player"> & {
    hp: number;
}