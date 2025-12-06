export type MapType = {
    x: number;
    y: number;
    width: number;
    height: number;    
} 


export type TileKey = 
    "floor" |
    "wallb" |
    "wallbr" |
    "wallbl" |
    "walll" |
    "walltl" |
    "wallt" |
    "walltr" |
    "wallr";
    // "watersq1" |
    // "watersq2" |
    // "watersq3" |
    // "watersq4" |
    // "waterh1" |
    // "waterh2" |
    // "waterv1" |
    // "waterv2";
export type SpriteMapType = Partial<Record<TileKey, HTMLImageElement>>;
