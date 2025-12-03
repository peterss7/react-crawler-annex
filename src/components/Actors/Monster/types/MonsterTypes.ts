import type { BaseActorType } from "../../../../shared/types/SharedActorTypes";

export type MonsterType = BaseActorType<"monster"> & {
    level: number;
};