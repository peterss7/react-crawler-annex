import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import type { MapType } from "../types/MapTypes"

type MapContextValue = {
    map: MapType;
    setMap: Dispatch<SetStateAction<MapType>>;
    sprites: HTMLImageElement[] | null;
}

const MapContext = createContext<MapContextValue | undefined>(undefined);

type MapProviderProps = {
    children: ReactNode;
    initialMap: MapType;
}

export function MapProvider({
    children,
    initialMap,
}: MapProviderProps) {
    const [map, setMap] = useState<MapType>(initialMap);
    const [sprites, setSprites] = useState<HTMLImageElement[] | null>(null);

    useEffect(() => {

    }, []);

    return (
        <MapContext.Provider value={{map, setMap, sprites}}>
            {children}
        </MapContext.Provider>
    );
}

export function useMapContext(): MapContextValue {
    const ctx = useContext(MapContext);
    if (!ctx){
        throw new Error("useMapContext must used inside MapProvider");
    }
    return ctx;
}