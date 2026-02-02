import { useState, useEffect, useRef, useCallback } from 'react';

interface UseWebcamOptions {
  width?: number;
  height?: number;
  facingMode?: 'user' | 'environment';
}

interface UseWebcamReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  stream: MediaStream | null;
  error: string | null;
  isLoading: boolean;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
}

export const useWebcam = ({
  width = 640,
  height = 480,
  facingMode = 'user',
}: UseWebcamOptions = {}): UseWebcamReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: width },
          height: { ideal: height },
          facingMode,
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '카메라 접근에 실패했습니다.'
      );
      console.error('Error accessing webcam:', err);
    } finally {
      setIsLoading(false);
    }
  }, [width, height, facingMode]);

  useEffect(() => {
    // Clean up on unmount
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return {
    videoRef,
    stream,
    error,
    isLoading,
    startCamera,
    stopCamera,
  };
};

export default useWebcam;
