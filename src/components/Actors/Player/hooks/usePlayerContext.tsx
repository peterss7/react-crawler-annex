import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { PlayerType, SpriteDirection } from "../types/PlayerTypes"
import useArrowKeys from "./useArrowKeys";
import { useSprite } from "../../../../shared/hooks/useSprite";
import { useMapContext } from "../../../Map/hooks/useMapContext";
import type { MapType } from "../../../Map/types/MapTypes";


type DrawPlayerProps = {
    ctx: CanvasRenderingContext2D;
    cameraX: number;
    cameraY: number;
    zoom: number;
    mapRect: MapType;
}

type PlayerContextValue = {
    drawPlayer: (props: DrawPlayerProps) => void;
    player: PlayerType;
    activeSprite: HTMLImageElement | null;
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
    const [activeSprite, setActiveSprite] = useState<HTMLImageElement | null>(null);
    // const sprite = useSprite(player.spriteSrcs.up);

    const sprites = (Object.entries(player.spriteSrcs) as [SpriteDirection, string][])
        .map(([key, value]) => ({
            key, 
            sprite: useSprite(value),
        }));

    const keys = useArrowKeys();

    // const sprite: HTMLImageElement | null = useSprite(player.spriteSrc);
    const { isWalkable } = useMapContext();

    useEffect(() => {
        let frameId: number;

        const loop = () => {
            setPlayer((prevState) => {
                let { x, y } = prevState;

                let nextX = x;
                let nextY = y;

                if (keys.ArrowUp) {
                    nextY -= speed;
                    setActiveSprite(sprites[0].sprite);
                }
                if (keys.ArrowDown) {
                    nextY += speed;
                    setActiveSprite(sprites[0].sprite);
                }
                if (keys.ArrowLeft) {
                    nextX -= speed;
                    const t: HTMLImageElement | null = sprites.find(x => x.key === "left")?.sprite ?? null;
                    setActiveSprite(t);
                }
                if (keys.ArrowRight) {
                    nextX += speed;
                    const t: HTMLImageElement | null = sprites.find(x => x.key === "right")?.sprite ?? null;
                    setActiveSprite(t);
                }

                if (nextX !== x && isWalkable(nextX, y)) {
                    x = nextX;
                    console.log("walkable X");
                }

                if (nextY !== y && isWalkable(x, nextY)) {
                    y = nextY;
                    console.log("walkable Y");
                }

                if (x === prevState.x && y === prevState.y) return prevState;

                return { ...prevState, x, y };
            });

            frameId = requestAnimationFrame(loop);
        };

        frameId = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(frameId);
    }, [keys, speed, setPlayer]);

    function drawPlayer(props: DrawPlayerProps) {
        const { ctx, cameraX, cameraY, zoom, mapRect } = props;

        const worldX = player.x;
        const worldY = player.y;

        const playerScreenX = mapRect.x + (worldX - cameraX) * zoom;
        const playerScreenY = mapRect.y + (worldY - cameraY) * zoom;
        const size = player.radius * 2 * zoom;

        if (activeSprite) {
            const drawX =
                playerScreenX - size / 2 + (player.spriteOffsetX ?? 0) * zoom;
            const drawY =
                playerScreenY - size / 2 + (player.spriteOffsetY ?? 0) * zoom;
            ctx.drawImage(activeSprite, drawX, drawY, size, size);
        } else {
            ctx.fillStyle = player.color;
            ctx.beginPath();
            ctx.arc(playerScreenX, playerScreenY, player.radius * zoom, 0, Math.PI * 2);
            ctx.fill();
        }

    }

    return (
        <PlayerContext.Provider value={{ drawPlayer, player, activeSprite }}>
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