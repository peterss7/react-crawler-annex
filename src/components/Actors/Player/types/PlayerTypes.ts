import type { BaseActorType } from "../../../../shared/types/SharedActorTypes";

// 2) Concrete types
export type PlayerType = BaseActorType<"player"> & {
    hp: number;
};
