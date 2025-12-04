import { ACTOR_TYPES } from "../constants/ActorConstants";
import useDrawMonster from "../Monster/hooks/useDrawMonster";
import { useDrawPlayer } from "../Player/hooks/useDrawPlayer";
import type { PlayerType } from "../Player/types/PlayerTypes";
import type { ActorType } from "../types/ActorTypes";

export const useDrawActor = () => {

    const { drawPlayer } = useDrawPlayer();
    const { drawMonster } = useDrawMonster();

    function drawActor(ctx: CanvasRenderingContext2D, actor: ActorType) {

        switch (actor.kind) {
            case ACTOR_TYPES.PLAYER:
                drawPlayer(ctx, actor as PlayerType)
                break;
            case ACTOR_TYPES.MONSTER:
                drawMonster(ctx, actor);
                break;
        }
    }

    return {drawActor}
}