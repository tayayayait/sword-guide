import { FilesetResolver, PoseLandmarker, type PoseLandmarkerResult } from '@mediapipe/tasks-vision';
import type { NormalizedLandmark } from '@/lib/poseUtils';

const WASM_BASE_PATH = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm';
const MODEL_PATH = '/models/pose_landmarker_lite.task';

type PoseResultsCallback = (results: {
  poseLandmarks: NormalizedLandmark[];
  poseWorldLandmarks: NormalizedLandmark[];
}) => void;

// Singleton instance to prevent multiple model loads
let poseInstance: PoseLandmarker | null = null;

export class MediaPipeService {
  private pose: PoseLandmarker | null = null;
  private isInitializing = false;
  private onResultsCallback: PoseResultsCallback | null = null;
  private lastVideoTime = -1;

  constructor() {
    if (poseInstance) {
      this.pose = poseInstance;
    }
  }

  async initialize(): Promise<void> {
    if (this.pose || this.isInitializing) return;

    this.isInitializing = true;

    try {
      const vision = await FilesetResolver.forVisionTasks(WASM_BASE_PATH);
      this.pose = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: MODEL_PATH,
        },
        runningMode: 'VIDEO',
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      // Cache the instance
      poseInstance = this.pose;
      console.log('MediaPipe PoseLandmarker initialized successfully');
    } catch (error) {
      console.error('Failed to initialize MediaPipe PoseLandmarker:', error);
      throw error;
    } finally {
      this.isInitializing = false;
    }
  }

  onResults(callback: PoseResultsCallback) {
    this.onResultsCallback = callback;
  }

  async send(image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement) {
    if (!this.pose) {
      // Lazy init if not ready
      await this.initialize();
    }
    if (!this.pose) return;

    let result: PoseLandmarkerResult | null = null;
    const hasVideoType = typeof HTMLVideoElement !== 'undefined';

    if (hasVideoType && image instanceof HTMLVideoElement) {
      if (image.currentTime === this.lastVideoTime) return;
      this.lastVideoTime = image.currentTime;
      result = this.pose.detectForVideo(image, performance.now());
    } else {
      result = this.pose.detect(image);
    }

    if (!result) return;

    this.onResultsCallback?.({
      poseLandmarks: result.landmarks?.[0] ?? [],
      poseWorldLandmarks: result.worldLandmarks?.[0] ?? [],
    });
  }

  close() {
    if (this.pose) {
      this.pose.close();
      this.pose = null;
      poseInstance = null;
    }
    this.onResultsCallback = null;
    this.lastVideoTime = -1;
  }
}

export const mediaPipeService = new MediaPipeService();
