import { useEffect, useState } from "react";
import GameCanvas from "./GameCanvas";
import { type CanvasDimensions } from "../types/GameCanvasTypes";
import type { PlayerType } from "../../Actors/Player/types/PlayerTypes";
import usePlayerMovement from "../../Actors/Player/hooks/usePlayerMovement";

const initialPlayer: PlayerType = {
    kind: "player",
    x: 10,
    y: 10,
    radius: 20,
    color: "dodgerblue",
    hp: 100,
    spriteSrc: "/player.png",  
    spriteOffsetX: 0,
    spriteOffsetY: 0,
}

const speed: number = 5;

export default function GameContainer() {

    const [viewport, setViewport] = useState<CanvasDimensions>({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const player = usePlayerMovement(initialPlayer, speed);


    // handle resize
    useEffect(() => {
        const handleResize = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <GameCanvas
            width={viewport.width}
            height={viewport.height}
            player={player}
        />
    );
};