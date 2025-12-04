export type MapType = {
    x: number;
    y: number;
    width: number;
    height: number;    
} 

export type UseMapReturnType = {
    map: MapType;
    floorImage?: HTMLImageElement | null;
    wallBottomImage?: HTMLImageElement | null;
    wallCornerImage?: HTMLImageElement | null;
    wallCorner2Image?: HTMLImageElement | null;
    wallCorner3Image?: HTMLImageElement | null;
    wallCorner4Image?: HTMLImageElement | null;
    wallTopImage?: HTMLImageElement | null;

    waterImage?: HTMLImageElement | null;
}
export type TileKey = 
    "floor" |
    "wallc" |
    "wallb" |
    "wallt" |
    "wallr" | 
    "walll" | 
    "wallc2" |
    "wallc3" |
    "wallc4" |
    "water" |
    "watersq1" |
    "watersq2" |
    "watersq3" |
    "watersq4" |
    "waterh1" |
    "waterh2" |
    "waterv1" |
    "waterv2";
export type SpriteMapType = Partial<Record<TileKey, HTMLImageElement>>;
