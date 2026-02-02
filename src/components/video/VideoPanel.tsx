import { useRef, useEffect, useState, useMemo } from "react";
import { Play, Pause, AlertCircle, Camera, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import usePoseEstimation from "@/hooks/usePoseEstimation";
import SkeletonOverlay from "./SkeletonOverlay";
import DrawingCanvas, { DrawingCanvasRef, DrawingTool } from "./DrawingCanvas";
import DrawingToolbar from "./DrawingToolbar";
import { convertMediaPipeLandmarks } from "@/lib/poseUtils";
import { usePose } from "@/contexts/PoseContext";

interface VideoPanelProps {
  type: "reference" | "live";
  title: string;
  className?: string;
  isOverlay?: boolean;
}

const VideoPanel = ({ type, title, className, isOverlay }: VideoPanelProps) => {
  const { videoRef, stream, error, isLoading, startCamera, results } = usePoseEstimation();
  const { setLandmarks, analysis } = usePose();
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Drawing State
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [currentTool, setCurrentTool] = useState<DrawingTool>("pen");
  const [drawingColor, setDrawingColor] = useState("#ef4444");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const drawingCanvasRef = useRef<DrawingCanvasRef>(null);

  // Push raw landmarks to context for analysis (only for live type)
  useEffect(() => {
    if (type === 'live' && results?.poseLandmarks) {
      setLandmarks(results.poseLandmarks);
    }
  }, [type, results, setLandmarks]);

  // Convert MediaPipe landmarks to named keypoints for SkeletonOverlay
  const currentKeypoints = useMemo(() => {
    if (!results?.poseLandmarks || results.poseLandmarks.length === 0) {
      return [];
    }
    return convertMediaPipeLandmarks(results.poseLandmarks);
  }, [results]);
  
  // Mock data for Reference Video until we implement video file analysis
  const referenceMockKeypoints = [
    { name: 'nose', x: 0.5, y: 0.2 },
    { name: 'left_shoulder', x: 0.6, y: 0.3 },
    { name: 'right_shoulder', x: 0.4, y: 0.3 },
    { name: 'left_elbow', x: 0.65, y: 0.45 },
    { name: 'right_elbow', x: 0.35, y: 0.45 },
    { name: 'left_wrist', x: 0.7, y: 0.5 },
    { name: 'right_wrist', x: 0.3, y: 0.5 },
  ];

  const keypointsToShow = type === 'live' ? currentKeypoints : referenceMockKeypoints;
  
  // Determine dynamic status based on analysis
  const poseStatus = analysis.isValidPose 
    ? (analysis.overallAccuracy >= 90 ? 'perfect' : analysis.overallAccuracy >= 70 ? 'good' : analysis.overallAccuracy >= 50 ? 'fair' : 'poor')
    : 'fair';

  useEffect(() => {
    if (type === 'live' && !hasStarted) {
      // Auto-start camera setup can be enabled here
      // startCamera();
    }
  }, [type, hasStarted, startCamera]);


  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleStartCamera = () => {
    startCamera();
    setHasStarted(true);
  };

  const clearCanvas = () => drawingCanvasRef.current?.clear();
  const undo = () => drawingCanvasRef.current?.undo();
  const redo = () => drawingCanvasRef.current?.redo();

  return (
    <div className={cn("video-panel flex flex-col relative bg-black/20", className)}>
      {/* Header */}
      {!isOverlay && (
        <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-start pointer-events-none">
          <h3 className="text-white font-medium flex items-center gap-2 pointer-events-auto">
            {type === "live" ? (
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-blue-500" />
            )}
            {title}
          </h3>
          
          {/* Drawing Toggle */}
          <Button
            size="icon"
            variant={isDrawingMode ? "default" : "secondary"}
            className={cn(
               "pointer-events-auto transition-all duration-300", 
               isDrawingMode ? "bg-primary text-white" : "bg-black/40 text-white hover:bg-black/60 border-transparent"
            )}
            onClick={() => setIsDrawingMode(!isDrawingMode)}
            title="드로잉 도구"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Video Content */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden flex items-center justify-center bg-black">
        {type === "live" ? (
          <>
            {!stream && !isLoading && (
              <div className="text-center p-6">
                <Button onClick={handleStartCamera} variant="outline" className="gap-2">
                  <Camera className="w-4 h-4" />
                  카메라 켜기
                </Button>
                {error && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1 justify-center">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                  </p>
                )}
              </div>
            )}
            {isLoading && (
              <div className="flex flex-col items-center gap-2 text-white/50">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">카메라 연결 중...</span>
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={cn("w-full h-full object-cover transform scale-x-[-1]", !stream && "hidden")}
            />
          </>
        ) : (
          /* Reference Video Placeholder */
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
            <Play className="w-12 h-12 opacity-20" />
            <span className="ml-2">Reference Video</span>
          </div>
        )}

        {/* AI Overlay Layer */}
        {(stream || type === 'reference') && (
          <SkeletonOverlay 
            keypoints={keypointsToShow} 
            status={type === 'live' ? poseStatus : 'perfect'}
            color={type === 'live' ? undefined : 'var(--skeleton-reference)'}
          />
        )}

        {/* Drawing Canvas Layer */}
        <div className={cn("absolute inset-0 z-30 transition-opacity duration-300", isDrawingMode ? "pointer-events-auto" : "pointer-events-none opacity-50")}>
           <DrawingCanvas
              ref={drawingCanvasRef}
              width={containerSize.width}
              height={containerSize.height}
              tool={currentTool}
              color={drawingColor}
              onHistoryChange={(undo, redo) => {
                setCanUndo(undo);
                setCanRedo(redo);
              }}
           />
        </div>

        {/* Drawing Toolbar */}
        {isDrawingMode && (
          <div className="absolute top-16 right-4 z-40 animate-in fade-in slide-in-from-right-4 duration-200">
            <DrawingToolbar
              currentTool={currentTool}
              onToolChange={setCurrentTool}
              currentColor={drawingColor}
              onColorChange={setDrawingColor}
              onUndo={undo}
              onRedo={redo}
              onClear={clearCanvas}
              canUndo={canUndo}
              canRedo={canRedo}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default VideoPanel;
