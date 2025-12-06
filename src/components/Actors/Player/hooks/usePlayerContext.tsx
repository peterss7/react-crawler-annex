import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import type { PlayerType } from "../types/PlayerTypes"
import useArrowKeys from "./useArrowKeys";
import { useSprite } from "../../../../shared/hooks/useSprite";

type PlayerContextValue = {
    player: PlayerType;
    setPlayer: Dispatch<SetStateAction<PlayerType>>;
    sprite: HTMLImageElement | null;
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

    return (
        <PlayerContext.Provider value={{player, setPlayer, sprite}}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayerContext(): PlayerContextValue {
    const ctx = useContext(PlayerContext);
    if (!ctx){
        throw new Error("usePlayerContext must used inside PlayerProvider");
    }
    return ctx;
}