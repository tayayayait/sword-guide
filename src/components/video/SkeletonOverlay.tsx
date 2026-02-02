import { useMemo } from 'react';
import FeedbackBadge, { FeedbackType } from './FeedbackBadge';

interface Point {
  x: number;
  y: number;
}

interface Keypoint extends Point {
  name: string;
  score?: number;
  index?: number;
}

export interface FeedbackItem {
  keypoint: string;
  type: FeedbackType;
  message: string;
}

export interface SkeletonOverlayProps {
  keypoints: Keypoint[];
  referenceKeypoints?: Keypoint[];
  width?: number;
  height?: number;
  color?: string;
  status?: 'perfect' | 'good' | 'fair' | 'poor';
  feedback?: FeedbackItem[];
}

// Fallback COCO connections for reference/mock data (name-based)
const SKELETON_CONNECTIONS_BY_NAME = [
  ['nose', 'left_eye'], ['nose', 'right_eye'],
  ['left_eye', 'left_ear'], ['right_eye', 'right_ear'],
  ['left_shoulder', 'right_shoulder'],
  ['left_shoulder', 'left_elbow'], ['left_elbow', 'left_wrist'],
  ['right_shoulder', 'right_elbow'], ['right_elbow', 'right_wrist'],
  ['left_shoulder', 'left_hip'], ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],
  ['left_hip', 'left_knee'], ['left_knee', 'left_ankle'],
  ['right_hip', 'right_knee'], ['right_knee', 'right_ankle']
];

// MediaPipe Pose Landmarker connections (index-based)
// https://developers.google.com/mediapipe/solutions/vision/pose_landmarker
const POSE_CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 7], // Right face
  [0, 4], [4, 5], [5, 6], [6, 8], // Left face
  [9, 10], // Mouth
  [11, 12], // Shoulders
  [11, 13], [13, 15], // Left arm
  [12, 14], [14, 16], // Right arm
  [11, 23], [12, 24], // Torso sides
  [23, 24], // Hips
  [23, 25], [25, 27], [27, 29], [29, 31], // Left leg
  [24, 26], [26, 28], [28, 30], [30, 32], // Right leg
  [15, 17], [15, 19], [15, 21], // Left hand
  [16, 18], [16, 20], [16, 22], // Right hand
  [27, 31], [28, 32], // Feet
];

const SkeletonOverlay = ({
  keypoints,
  referenceKeypoints,
  width = 640,
  height = 480,
  status = 'perfect',
  feedback = []
}: SkeletonOverlayProps) => {
  
  // Convert keypoints array to maps for easier connection lookup
  const keypointMap = useMemo(() => {
    return keypoints.reduce((acc, kp) => {
      acc[kp.name] = kp;
      return acc;
    }, {} as Record<string, Keypoint>);
  }, [keypoints]);

  const keypointIndexMap = useMemo(() => {
    return keypoints.reduce((acc, kp) => {
      if (typeof kp.index === 'number') {
        acc[kp.index] = kp;
      }
      return acc;
    }, {} as Record<number, Keypoint>);
  }, [keypoints]);

  const hasIndexedKeypoints = useMemo(
    () => keypoints.some(kp => typeof kp.index === 'number'),
    [keypoints]
  );

  const referenceMap = useMemo(() => {
    if (!referenceKeypoints) return {};
    return referenceKeypoints.reduce((acc, kp) => {
      acc[kp.name] = kp;
      return acc;
    }, {} as Record<string, Keypoint>);
  }, [referenceKeypoints]);

  // Color based on status
  const currentSkeletonColor = status === 'perfect' ? '#ec4899' : // Pink like reference image
    status === 'good' ? '#22c55e' :
    status === 'fair' ? '#f59e0b' : '#ef4444';
  
  const jointColor = '#3b82f6'; // Blue dots
  const referenceSkeletonColor = '#3b82f6';

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg 
        className="w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        {/* Reference Skeleton (if provided) */}
        {referenceKeypoints && SKELETON_CONNECTIONS_BY_NAME.map(([start, end], index) => {
          const p1 = referenceMap[start];
          const p2 = referenceMap[end];
          
          if (!p1 || !p2) return null;

          return (
            <line
              key={`ref-bone-${index}`}
              x1={p1.x * width}
              y1={p1.y * height}
              x2={p2.x * width}
              y2={p2.y * height}
              stroke={referenceSkeletonColor}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.4"
            />
          );
        })}

        {/* Current Skeleton - Lines */}
        {hasIndexedKeypoints ? (
          // Use index-based connections for MediaPipe data
          POSE_CONNECTIONS.map(([startIdx, endIdx], index) => {
            const p1 = keypointIndexMap[startIdx];
            const p2 = keypointIndexMap[endIdx];
            
            // Skip if points don't exist or have low confidence
            if (!p1 || !p2) return null;
            if ((p1.score ?? 1) < 0.3 || (p2.score ?? 1) < 0.3) return null;

            return (
              <line
                key={`bone-${index}`}
                x1={p1.x * width}
                y1={p1.y * height}
                x2={p2.x * width}
                y2={p2.y * height}
                stroke={currentSkeletonColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
            );
          })
        ) : (
          // Use name-based connections for mock data
          SKELETON_CONNECTIONS_BY_NAME.map(([start, end], index) => {
            const p1 = keypointMap[start];
            const p2 = keypointMap[end];
            
            if (!p1 || !p2) return null;

            return (
              <line
                key={`bone-${index}`}
                x1={p1.x * width}
                y1={p1.y * height}
                x2={p2.x * width}
                y2={p2.y * height}
                stroke={currentSkeletonColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
            );
          })
        )}

        {/* Joints - Circles */}
        {keypoints.map((kp, index) => {
          // Skip low confidence points
          if ((kp.score ?? 1) < 0.3) return null;
          
          return (
            <circle
              key={`joint-${index}`}
              cx={kp.x * width}
              cy={kp.y * height}
              r="6"
              fill={jointColor}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      
      {/* Feedback Badges Layer */}
      {feedback.map((item, index) => {
        const kp = keypointMap[item.keypoint];
        if (!kp) return null;
        
        return (
          <div 
            key={`feedback-${index}`}
            className="absolute"
            style={{ 
              left: `${kp.x * 100}%`, 
              top: `${kp.y * 100}%`,
              transform: 'translate(-50%, -150%)'
            }}
          >
            <FeedbackBadge type={item.type} message={item.message} />
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonOverlay;
