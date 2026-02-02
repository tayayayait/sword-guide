import { useEffect, useRef, useState, useCallback } from 'react';
import { mediaPipeService } from '@/lib/MediaPipeService';
import useWebcam from './useWebcam';

export interface PoseResult {
  poseLandmarks: any[]; // Using any for now, should be NormalizedLandmarkList
  poseWorldLandmarks: any[];
}

export const usePoseEstimation = () => {
  const { videoRef, stream, error, isLoading, startCamera, stopCamera } = useWebcam();
  const [results, setResults] = useState<PoseResult | null>(null);
  const [poseError, setPoseError] = useState<string | null>(null);
  const requestRef = useRef<number>();
  const isProcessing = useRef(false);
  const isInitialized = useRef(false);

  const processFrame = useCallback(async () => {
    if (videoRef.current && videoRef.current.readyState >= 2 && !isProcessing.current) {
      isProcessing.current = true;
      try {
        await mediaPipeService.send(videoRef.current);
      } catch (e) {
        console.error("Frame processing error:", e);
        if (!poseError) {
          setPoseError("Failed to run pose estimation. Check the model assets.");
        }
      } finally {
        isProcessing.current = false;
      }
    }
    requestRef.current = requestAnimationFrame(processFrame);
  }, [videoRef, poseError]);

  useEffect(() => {
    if (stream && !isInitialized.current) {
      isInitialized.current = true;
      setPoseError(null);
      
      // Initialize MediaPipe and set up callback
      mediaPipeService
        .initialize()
        .then(() => {
          // IMPORTANT: Set onResults callback AFTER initialization
          mediaPipeService.onResults((res) => {
            const poseLandmarks = res.poseLandmarks ?? [];
            const poseWorldLandmarks = res.poseWorldLandmarks ?? [];
            if (poseLandmarks.length > 0) {
              console.log('Pose detected! Landmarks:', poseLandmarks.length);
            }
            setResults({
              poseLandmarks,
              poseWorldLandmarks,
            });
          });
          
          // Start the frame processing loop
          requestRef.current = requestAnimationFrame(processFrame);
        })
        .catch((e) => {
          console.error('Failed to initialize MediaPipe:', e);
          setPoseError("Failed to load pose model. Check /public/models/pose_landmarker_lite.task.");
        });
    }
    
    if (!stream) {
      isInitialized.current = false;
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [stream, processFrame]);

  return {
    videoRef,
    stream,
    results, // The real-time pose data
    startCamera,
    stopCamera,
    isLoading,
    error: error ?? poseError
  };
};

export default usePoseEstimation;
