import { useEffect, useRef, useState } from "react";
import { useCanvasUtilities } from "../hooks/useCanvasUtilities";
import { Canvas } from "../styles/GameCanvasStyles";
import { usePlayerContext } from "../../Actors/Player/hooks/usePlayerContext";
import { WORLD_WIDTH, WORLD_HEIGHT, MAP_COLS, MAP_DATA, MAP_ROWS, TILE_SIZE } from "../../Map/constants/MapConfigConstants";
import { useMapContext } from "../../Map/hooks/useMapContext";




export default function GameCanvas() {
  const { player, drawPlayer } = usePlayerContext();
  const { drawMap, drawBorder } = useMapContext();

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [zoom, setZoom] = useState<number>(2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { drawBackground, clamp } = useCanvasUtilities();


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

    // background for whole screen
    drawBackground(ctx, width, height);

    // ----- define where the map lives on the canvas -----
    const mapRect = {
      x: 125,
      y: 25,
      width: width - 200,
      height: height - 100,
    };

    // draw a panel around the map (optional)
    ctx.fillStyle = "#111";
    ctx.fillRect(mapRect.x, mapRect.y, mapRect.width, mapRect.height);

    // camera size is now based on the *mapRect* size, not the whole screen
    const viewWorldWidth = mapRect.width / zoom;
    const viewWorldHeight = mapRect.height / zoom;

    let cameraX = player.x - viewWorldWidth / 2;
    let cameraY = player.y - viewWorldHeight / 2;

    cameraX = clamp(cameraX, 0, Math.max(0, WORLD_WIDTH - viewWorldWidth));
    cameraY = clamp(cameraY, 0, Math.max(0, WORLD_HEIGHT - viewWorldHeight));

    // ===== draw map tiles inside mapRect =====
    drawMap({ cameraX, cameraY, viewWorldWidth, viewWorldHeight, zoom, ctx, mapRect });

    // ===== draw player inside mapRect =====
    drawPlayer({ ctx, cameraX, cameraY, zoom, mapRect });

    // ===== draw map border =====
    drawBorder({ctx, width, height, mapRect});

  }, [width, height, zoom, player]);

  return (
    <Canvas
      ref={canvasRef}
    />
  )
};