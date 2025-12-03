import { useEffect, useState } from "react";
import GameCanvas from "./GameCanvas";
import { type CanvasDimensions } from "../types/GameCanvasTypes";

// const player: PlayerType = ({
//     x: 100,
//     y: 150,
//     kind: ACTOR_TYPES.PLAYER,
//     radius: 20,
//     color: "red",
//     hp: 100,
// });

// const initialCanvas: CanvasProps = {
//     background: "black",
//     player: player,
//     ctx: null,
//     width: 0,
//     height: 0
// };

export default function GameContainer() {

    const [viewport, setViewport] = useState<CanvasDimensions>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

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
        />
    );
};