import { useEffect, useRef, useState } from "react";
import { useCanvasUtilities } from "../hooks/useCanvasUtilities";
import { useDrawPlayer } from "../../Actors/Player/hooks/useDrawPlayer";
import { Canvas } from "../styles/GameCanvasStyles";
import { MAP_COLS, MAP_DATA, MAP_FLOOR_SRC, MAP_ROWS, MAP_WALL_B_SRC, MAP_WALL_BL_SRC, MAP_WALL_BR_SRC, MAP_WALL_L_SRC, MAP_WALL_R_SRC, MAP_WALL_T_SRC, MAP_WALL_TL_SRC, MAP_WALL_TR_SRC, TILE_SIZE } from "../../Map/constants/MapConfigConstants";
import { useTileSprites } from "../../Map/hooks/useTileSprites";
import { usePlayerContext } from "../../Actors/Player/hooks/usePlayerContext";




export default function GameCanvas() {
  const { player, sprite: playerImage } = usePlayerContext();
  const tileSprites = useTileSprites({
    floor: MAP_FLOOR_SRC,
    wallb: MAP_WALL_B_SRC,
    wallbr: MAP_WALL_BR_SRC,
    wallbl: MAP_WALL_BL_SRC,
    walll: MAP_WALL_L_SRC,
    walltl: MAP_WALL_TL_SRC,
    wallt: MAP_WALL_T_SRC,
    walltr: MAP_WALL_TR_SRC,
    wallr: MAP_WALL_R_SRC

  });
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { drawBackground } = useCanvasUtilities();
  const { drawPlayer } = useDrawPlayer();

  // handle resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    drawBackground(ctx, width, height);

    for (let row = 0; row < MAP_ROWS; row++) {
      for (let col = 0; col < MAP_COLS; col++) {
        const tile = MAP_DATA[row][col];
        let img: HTMLImageElement | undefined;
        console.log(`Tile: ${tile}`);
        if (tile === 0) img = tileSprites.floor;
        else if (tile === 1) img = tileSprites.wallb;
        else if (tile === 2) img = tileSprites.wallbl;
        else if (tile === 3) img = tileSprites.wallbr;
        else if (tile === 4) img = tileSprites.walll;
        else if (tile === 5) img = tileSprites.walltl;
        else if (tile === 6) img = tileSprites.wallt;
        else if (tile === 7) img = tileSprites.walltr;
        else if (tile === 8) img = tileSprites.wallr;
    //     else if (tile === 2) img = tileSprites.water;
    //     else if (tile === 10) img = tileSprites.waterv1;
    //     else if (tile === 11) img = tileSprites.waterv2;
    //     else if (tile === 12) img = tileSprites.watersq1;
    //     else if (tile === 13) img = tileSprites.watersq2;
    //     else if (tile === 14) img = tileSprites.watersq3;
    //     else if (tile === 15) img = tileSprites.watersq4;
    //     else if (tile === 16) img = tileSprites.waterh1;
    //     else if (tile === 17) img = tileSprites.waterh2;

        const mapOffsetX = 100;
        const mapOffsetY = 50;
        const x = col * TILE_SIZE + mapOffsetX;
        const y = row * TILE_SIZE + mapOffsetY;

        if (img) {
          ctx.drawImage(img, x, y, TILE_SIZE, TILE_SIZE);
        } else {
          // fallback while loading
          ctx.fillStyle = "#333";
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
      }
    }

    drawPlayer(ctx, player, playerImage);

    // }, [player, viewport.width, viewport.height, map.x, map.y, map.width, map.height]);
  }, [width, height, player, playerImage, tileSprites]);

  return (
    <Canvas
      ref={canvasRef}
    />
  )


};