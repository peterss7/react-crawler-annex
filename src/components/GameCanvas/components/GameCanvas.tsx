import { useEffect, useRef, useState } from "react";
import { useCanvasUtilities } from "../hooks/useCanvasUtilities";
import { Canvas } from "../styles/GameCanvasStyles";
import { usePlayerContext } from "../../Actors/Player/hooks/usePlayerContext";
import useMap from "../../Map/hooks/useMap";
import { WORLD_WIDTH, WORLD_HEIGHT } from "../../Map/constants/MapConfigConstants";




export default function GameCanvas() {
  const { drawPlayer, player } = usePlayerContext();
  const { drawMap } = useMap();
  
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

    // CAMERA 
    const viewWorldWidth = width / zoom;
    const viewWorldHeight = height / zoom;

    let cameraX = player.x - viewWorldWidth / 2;
    let cameraY = player.y - viewWorldHeight / 2;

    cameraX = clamp(cameraX, 0, Math.max(0, WORLD_WIDTH - viewWorldWidth));
    cameraY = clamp(cameraY, 0, Math.max(0, WORLD_HEIGHT - viewWorldHeight));

    drawBackground(ctx, width, height);

    // DRAW MAP

    drawMap({
      cameraX: cameraX,
      cameraY: cameraY,
      viewWorldWidth: viewWorldWidth,
      viewWorldHeight: viewWorldHeight,
      ctx: ctx, zoom: zoom
    });

    
    // DRAW PLAYER
    drawPlayer({ ctx: ctx, cameraX: cameraX, cameraY: cameraY, zoom: zoom});
    
  }, [width, height, zoom, player]);

  return (
    <Canvas
      ref={canvasRef}
    />
  )


};

function clamp(cameraX: number, arg1: number, arg2: number): number {
  throw new Error("Function not implemented.");
}
