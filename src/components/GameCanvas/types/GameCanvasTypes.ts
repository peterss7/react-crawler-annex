import type { CrawlerDimensions } from "../../../shared/types/SharedTypes";
import type { PlayerType } from "../../Actors/Player/types/PlayerTypes";
import type { MapType } from "../../Map/types/MapTypes";


export type GameCanvasProps = {
    player: PlayerType;
    map: MapType;
} & CrawlerDimensions;