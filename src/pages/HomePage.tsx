import { PlayerProvider } from "../components/Actors/Player/hooks/usePlayerContext";
import type { PlayerType } from "../components/Actors/Player/types/PlayerTypes";
import GameCanvas from "../components/GameCanvas/components/GameCanvas";
import { MapProvider } from "../components/Map/hooks/useMapContext";


const initialPlayer: PlayerType = {
    kind: "player",
    x: 200,
    y: 200,
    radius: 20,
    color: "dodgerblue",
    hp: 100,
    spriteSrc: "/img/player.png",
    spriteOffsetX: 0,
    spriteOffsetY: 0,
}

const speed = 2;

export default function HomePage() {
    return (
        <MapProvider>
            <PlayerProvider initialPlayer={initialPlayer} speed={speed}>
                <GameCanvas />
            </PlayerProvider>
        </MapProvider>
    );
}