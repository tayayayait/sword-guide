import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';

export type DrawingTool = 'pen' | 'line' | 'rect' | 'circle' | 'eraser';

export interface DrawingCanvasRef {
  clear: () => void;
  undo: () => void;
  redo: () => void;
}

interface DrawingCanvasProps {
  width: number;
  height: number;
  color?: string;
  lineWidth?: number;
  tool?: DrawingTool;
  className?: string;
  onHistoryChange?: (canUndo: boolean, canRedo: boolean) => void;
}

interface Point {
  x: number;
  y: number;
}

const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({
  width,
  height,
  color = '#ef4444',
  lineWidth = 3,
  tool = 'pen',
  className,
  onHistoryChange
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const startPointRef = useRef<Point | null>(null);
  
  // History management
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (width <= 0 || height <= 0) return;

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (context) {
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      contextRef.current = context;
      
      // Save initial blank state
      const initialData = context.getImageData(0, 0, width, height);
      setHistory([initialData]);
      setHistoryIndex(0);
    }
    
    // Create temp canvas for shape preview
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempCanvasRef.current = tempCanvas;

  }, [width, height]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      contextRef.current.lineWidth = lineWidth;
      
      if (tool === 'eraser') {
        contextRef.current.globalCompositeOperation = 'destination-out';
      } else {
        contextRef.current.globalCompositeOperation = 'source-over';
      }
    }
  }, [color, lineWidth, tool]);
  
  // Update history state callback
  useEffect(() => {
    if (onHistoryChange) {
      onHistoryChange(historyIndex > 0, historyIndex < history.length - 1);
    }
  }, [historyIndex, history.length, onHistoryChange]);

  useImperativeHandle(ref, () => ({
    clear: () => {
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (canvas && context) {
        context.clearRect(0, 0, width, height);
        saveState();
      }
    },
    undo: () => {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        restoreState(history[newIndex]);
      }
    },
    redo: () => {
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        restoreState(history[newIndex]);
      }
    }
  }));

  const saveState = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context && width > 0 && height > 0) {
      const imageData = context.getImageData(0, 0, width, height);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(imageData);
      
      // Limit history size to 20 steps
      if (newHistory.length > 20) {
        newHistory.shift();
      } else {
        setHistoryIndex(newHistory.length - 1);
      }
      setHistory(newHistory);
    }
  };

  const restoreState = (imageData: ImageData) => {
    const context = contextRef.current;
    if (context) {
      context.putImageData(imageData, 0, 0);
    }
  };

  const getCoordinates = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = (event as React.MouseEvent).clientX;
      clientY = (event as React.MouseEvent).clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(event);
    startPointRef.current = { x, y };
    setIsDrawing(true);

    if (tool === 'pen' || tool === 'eraser') {
      contextRef.current?.beginPath();
      contextRef.current?.moveTo(x, y);
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || !startPointRef.current) return;
    const { x, y } = getCoordinates(event);
    const startX = startPointRef.current.x;
    const startY = startPointRef.current.y;

    if (tool === 'pen' || tool === 'eraser') {
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    } else {
      // For shapes, we redraw the previous state + current shape on every move
      // This is a simple implementation, for better performance consider a secondary layer
      
      // 1. Restore last committed state (from history) without changing history index
      const lastState = history[historyIndex];
      if (lastState) {
         contextRef.current.putImageData(lastState, 0, 0);
      }
      
      contextRef.current.beginPath();
      
      if (tool === 'line') {
        contextRef.current.moveTo(startX, startY);
        contextRef.current.lineTo(x, y);
      } else if (tool === 'rect') {
        contextRef.current.strokeRect(startX, startY, x - startX, y - startY);
      } else if (tool === 'circle') {
         const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
         contextRef.current.arc(startX, startY, radius, 0, 2 * Math.PI);
      }
      
      contextRef.current.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current?.closePath();
      setIsDrawing(false);
      saveState();
      startPointRef.current = null;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute top-0 left-0 touch-none cursor-crosshair", className)}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    />
  );
});

DrawingCanvas.displayName = 'DrawingCanvas';

export default DrawingCanvas;
