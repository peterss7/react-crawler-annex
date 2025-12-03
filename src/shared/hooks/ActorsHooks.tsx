import { act } from "react";
import { ACTOR_TYPES } from "../../components/Actors/constants/ActorConstants";
import type { PlayerType } from "../../components/Actors/Player/types/PlayerTypes";
import type { ActorType } from "../types/SharedActorTypes";
import type { MonsterType } from "../../components/Actors/Monster/types/MonsterTypes";

function drawPlayer(ctx: CanvasRenderingContext2D, player: ActorType){
    const { x, y, radius, color } = player;

    // A red circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
}

function drawMonster(ctx: CanvasRenderingContext2D, monster: ActorType) {
    const { x, y, color } = monster as MonsterType;

    // A red circle
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 80, 80);
}

export function drawActor(
    ctx: CanvasRenderingContext2D, 
    actor: ActorType
) {
    
    switch (actor.kind){
        case ACTOR_TYPES.PLAYER:
            drawPlayer(ctx, actor)
            ctx.fill();
            break;            
        case ACTOR_TYPES.MONSTER:
            drawMonster(ctx, actor);
            break;
    }
}