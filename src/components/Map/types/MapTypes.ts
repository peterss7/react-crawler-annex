export type MapType = {
    x: number;
    y: number;
    width: number;
    height: number;    
} 

export type MapTileType = {
    spriteKey: TileKey
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
    
export type SpriteMapType = Partial<Record<TileKey, HTMLImageElement>>;
