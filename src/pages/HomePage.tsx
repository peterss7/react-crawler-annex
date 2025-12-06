import { PlayerProvider } from "../components/Actors/Player/hooks/usePlayerContext";
import type { PlayerType } from "../components/Actors/Player/types/PlayerTypes";
import GameCanvas from "../components/GameCanvas/components/GameCanvas";


const initialPlayer: PlayerType = {
    kind: "player",
    x: 10,
    y: 10,
    radius: 20,
    color: "dodgerblue",
    hp: 100,
    spriteSrc: "/img/player.png",
    spriteOffsetX: 0,
    spriteOffsetY: 0,
}

const speed = 5;

export default function HomePage() {
    return (
        <PlayerProvider initialPlayer={initialPlayer} speed={speed}>
            <GameCanvas />
        </PlayerProvider>
    );
}