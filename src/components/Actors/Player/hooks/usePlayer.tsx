import { useEffect, useState } from "react";
import type { PlayerType, UsePlayerReturnType } from "../types/PlayerTypes";
import useArrowKeys from "./useArrowKeys";
import { useSprite } from "../../../../shared/hooks/useSprite";

export default function usePlayer(
  initialPlayer: PlayerType,
  speed: number
): UsePlayerReturnType {
  const [player, setPlayer] = useState<PlayerType>(initialPlayer);
  const keys = useArrowKeys();

  const sprite = useSprite(player.spriteSrc ?? null);
  
  useEffect(() => {
    let frameId: number;

    const loop = () => {
      setPlayer((prev) => {
        let { x, y } = prev;

        if (keys.ArrowUp) y -= speed;
        if (keys.ArrowDown) y += speed;
        if (keys.ArrowLeft) x -= speed;
        if (keys.ArrowRight) x += speed;

        if (x === prev.x && y === prev.y) return prev;
        return { ...prev, x: x, y: y };
      });

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [keys, speed]);

  return {player, sprite};
}