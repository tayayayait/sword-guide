import { useMemo } from 'react';
import { NormalizedLandmark, calculateAngle, MEDIAPIPE_LANDMARK_NAMES } from '@/lib/poseUtils';

export interface JointAnalysis {
  name: string;
  angle: number;
  targetAngle: number;
  deviation: number;
  status: 'perfect' | 'good' | 'fair' | 'poor';
}

export interface PoseAnalysisResult {
  overallAccuracy: number;
  joints: JointAnalysis[];
  isValidPose: boolean;
}

// Target angles for Kendo postures (approximate values, can be fine-tuned)
const KENDO_TARGET_ANGLES = {
  'right_elbow': 90,
  'left_elbow': 90,
  'right_shoulder': 45,
  'left_shoulder': 45,
  'right_knee': 170,
  'left_knee': 170,
};

// Threshold for status classification
const getStatus = (deviation: number): 'perfect' | 'good' | 'fair' | 'poor' => {
  if (deviation <= 5) return 'perfect';
  if (deviation <= 10) return 'good';
  if (deviation <= 20) return 'fair';
  return 'poor';
};

// Landmark indices for calculating angles
const JOINT_ANGLE_CONFIG = [
  { name: '오른팔 팔꿈치', key: 'right_elbow', points: [12, 14, 16] }, // shoulder, elbow, wrist
  { name: '왼팔 팔꿈치', key: 'left_elbow', points: [11, 13, 15] },
  { name: '오른쪽 어깨', key: 'right_shoulder', points: [14, 12, 24] }, // elbow, shoulder, hip
  { name: '왼쪽 어깨', key: 'left_shoulder', points: [13, 11, 23] },
  { name: '오른쪽 무릎', key: 'right_knee', points: [24, 26, 28] }, // hip, knee, ankle
  { name: '왼쪽 무릎', key: 'left_knee', points: [23, 25, 27] },
];

export const usePoseAnalysis = (landmarks: NormalizedLandmark[] | null): PoseAnalysisResult => {
  return useMemo(() => {
    if (!landmarks || landmarks.length < 33) {
      return {
        overallAccuracy: 0,
        joints: [],
        isValidPose: false,
      };
    }

    const getConfidence = (lm: NormalizedLandmark | undefined) =>
      lm ? (lm.visibility ?? lm.presence ?? 0) : 0;
    const isVisible = (lm: NormalizedLandmark | undefined) => getConfidence(lm) > 0.5;

    const joints: JointAnalysis[] = JOINT_ANGLE_CONFIG.flatMap(config => {
      const [aIdx, bIdx, cIdx] = config.points;
      const pointA = landmarks[aIdx];
      const pointB = landmarks[bIdx];
      const pointC = landmarks[cIdx];

      if (![pointA, pointB, pointC].every(isVisible)) {
        return [];
      }

      const angle = calculateAngle(pointA, pointB, pointC);
      const targetAngle = KENDO_TARGET_ANGLES[config.key as keyof typeof KENDO_TARGET_ANGLES] ?? 90;
      const deviation = Math.abs(angle - targetAngle);

      return [{
        name: config.name,
        angle: Math.round(angle),
        targetAngle,
        deviation,
        status: getStatus(deviation),
      }];
    });

    if (joints.length === 0) {
      return {
        overallAccuracy: 0,
        joints: [],
        isValidPose: false,
      };
    }

    // Calculate overall accuracy (100 - average deviation, clamped to 0-100)
    const avgDeviation = joints.reduce((sum, j) => sum + j.deviation, 0) / joints.length;
    const overallAccuracy = Math.max(0, Math.min(100, Math.round(100 - avgDeviation * 2)));

    return {
      overallAccuracy,
      joints,
      isValidPose: true,
    };
  }, [landmarks]);
};

export default usePoseAnalysis;
