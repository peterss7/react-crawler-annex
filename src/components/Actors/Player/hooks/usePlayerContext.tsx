import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { PlayerType } from "../types/PlayerTypes"
import useArrowKeys from "./useArrowKeys";
import { useSprite } from "../../../../shared/hooks/useSprite";


type DrawPlayerProps = {
    ctx: CanvasRenderingContext2D;
    cameraX: number;
    cameraY: number;
    zoom: number;
}

type PlayerContextValue = {
    drawPlayer: (props: DrawPlayerProps) => void;
    player: PlayerType;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

type PlayerProviderProps = {
    children: ReactNode;
    initialPlayer: PlayerType;
    speed: number;
}

export function PlayerProvider({
    children,
    initialPlayer,
    speed
}: PlayerProviderProps) {
    const [player, setPlayer] = useState<PlayerType>(initialPlayer);

    const keys = useArrowKeys();
    const sprite = useSprite(player.spriteSrc);

    useEffect(() => {
        let frameId: number;

        const loop = () => {
            setPlayer((prevState) => {
                let { x, y } = prevState;

                if (keys.ArrowUp) y -= speed;
                if (keys.ArrowDown) y += speed;
                if (keys.ArrowLeft) x -= speed;
                if (keys.ArrowRight) x += speed;

                if (x === prevState.x && y === prevState.y) return prevState;
                return { ...prevState, x, y };
            });

            frameId = requestAnimationFrame(loop);
        };

        frameId = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(frameId);
    }, [keys, speed, setPlayer]);

    function drawPlayer(props: DrawPlayerProps) {
        const { ctx, cameraX, cameraY, zoom } = props;

        const playerWorldX = player.x;
        const playerWorldY = player.y;

        const playerScreenX = (playerWorldX - cameraX) * zoom;
        const playerScreenY = (playerWorldY - cameraY) * zoom;
        const size = player.radius * 2 * zoom;

        if (sprite) {
            const drawX = playerScreenX - size / 2 + (player.spriteOffsetX ?? 0) * zoom;
            const drawY = playerScreenY - size / 2 + (player.spriteOffsetY ?? 0) * zoom;
            ctx.drawImage(sprite, drawX, drawY, size, size);
        } else {
            ctx.fillStyle = player.color;
            ctx.beginPath();
            ctx.arc(playerScreenX, playerScreenY, player.radius * zoom, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    return (
        <PlayerContext.Provider value={{ drawPlayer, player }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayerContext(): PlayerContextValue {
    const ctx = useContext(PlayerContext);
    if (!ctx) {
        throw new Error("usePlayerContext must used inside PlayerProvider");
    }
    return ctx;
}