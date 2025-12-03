import { useEffect, useRef } from "react";
import { Canvas } from "../styles/GameCanvasStyles";
import type { CanvasDimensions  } from "../types/GameCanvasTypes";

export default function GameCanvas(props: CanvasDimensions) {

  const {width, height} = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;    
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 80, 80);
    ctx.fill();
    

    // A red circle
    // drawActor(ctx, player);
  }, []);


  return (
    <Canvas
      ref={canvasRef}
      width={width}
      height={height}
    />
  )
};