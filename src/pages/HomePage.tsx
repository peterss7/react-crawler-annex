import { PLAYER_SPRITES } from "../components/Actors/Player/constants/PlayerConstants";
import { PlayerProvider } from "../components/Actors/Player/hooks/usePlayerContext";
import type { PlayerType } from "../components/Actors/Player/types/PlayerTypes";
import GameCanvas from "../components/GameCanvas/components/GameCanvas";
import { TILE_SIZE } from "../components/Map/constants/MapConfigConstants";
import { MapProvider } from "../components/Map/hooks/useMapContext";


const initialPlayer: PlayerType = {
    kind: "player",
    x: TILE_SIZE * 2.5,
    y: TILE_SIZE * 2.5,
    radius: 20,
    color: "dodgerblue",
    hp: 100,
    spriteSrcs: PLAYER_SPRITES,
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