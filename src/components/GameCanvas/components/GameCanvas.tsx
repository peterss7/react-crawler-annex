import { useEffect, useRef } from "react";
import { Canvas } from "../styles/GameCanvasStyles";
import type { GameCanvasProps } from "../types/GameCanvasTypes";
import { useCanvasUtilities } from "../hooks/useCanvasUtilities";
import { useDrawActor } from "../../Actors/hooks/useDrawActor";



export default function GameCanvas(props: GameCanvasProps) {

  const {player, width, height} = props;
  const dimensions = {
    width: width,
    height: height,
  }
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { drawBackground } = useCanvasUtilities();
  const { drawActor } = useDrawActor();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0,0,width,height);  
    drawBackground(ctx, dimensions);
    drawActor(ctx, player);
  }, [player, width, height]);


  return (
    <Canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
    />
  )
};