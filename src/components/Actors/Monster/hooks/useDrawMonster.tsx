import type { ActorType } from "../../types/ActorTypes";

export default function useDrawMonster(){
    
    function drawMonster(ctx: CanvasRenderingContext2D, monster: ActorType){
        
        const {x, y, color } = monster;

        ctx.fillStyle = color;
        ctx.fillRect(x, y, 80, 80);
    }
    
    return {
        drawMonster
    }
}