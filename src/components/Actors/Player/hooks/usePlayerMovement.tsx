import { useEffect, useState } from "react";
import type { PlayerType } from "../types/PlayerTypes";
import useArrowKeys from "./useArrowKeys";

export default function usePlayerMovement(
  initialPlayer: PlayerType,
  speed: number
): PlayerType {
  const [player, setPlayer] = useState<PlayerType>(initialPlayer);
  const keys = useArrowKeys();

  useEffect(() => {
    let frameId: number;

    const loop = () => {
      setPlayer((prev) => {
        let { x, y } = prev;
        console.log(`player x: ${x}`);
        if (keys.ArrowUp) y -= speed;
        if (keys.ArrowDown) y += speed;
        if (keys.ArrowLeft) x -= speed;
        if (keys.ArrowRight) x += speed;
        if (x === prev.x && y === prev.y) return prev;
        return { ...prev, x, y };
      });

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [keys, speed]);

  return player;
}