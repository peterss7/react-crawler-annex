import { useEffect, useState } from "react";
import type { SpriteMapType, TileKey } from "../types/MapTypes";

export function useTileSprites(sources: Record<TileKey, string>) {
    const [sprites, setSprites] = useState<SpriteMapType>({});

    useEffect(() => {
        let cancelled = false;

        Object.entries(sources).forEach(([key, src]) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                if (cancelled) return;
                setSprites((prev) => ({ ...prev, [key]: img as HTMLImageElement }));
            };
        });

        return () => {
            cancelled = true;
        };
    }, [sources]);

    return sprites;
}
