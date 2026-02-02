export interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
  presence?: number;
}

export interface NamedKeypoint {
  name: string;
  x: number;
  y: number;
  score?: number;
  index?: number;
}

/**
 * MediaPipe Pose Landmark indices to names mapping
 * https://developers.google.com/mediapipe/solutions/vision/pose_landmarker
 */
export const MEDIAPIPE_LANDMARK_NAMES: string[] = [
  'nose',
  'left_eye_inner',
  'left_eye',
  'left_eye_outer',
  'right_eye_inner',
  'right_eye',
  'right_eye_outer',
  'left_ear',
  'right_ear',
  'mouth_left',
  'mouth_right',
  'left_shoulder',
  'right_shoulder',
  'left_elbow',
  'right_elbow',
  'left_wrist',
  'right_wrist',
  'left_pinky',
  'right_pinky',
  'left_index',
  'right_index',
  'left_thumb',
  'right_thumb',
  'left_hip',
  'right_hip',
  'left_knee',
  'right_knee',
  'left_ankle',
  'right_ankle',
  'left_heel',
  'right_heel',
  'left_foot_index',
  'right_foot_index'
];

/**
 * Convert MediaPipe landmarks array to named keypoints for SkeletonOverlay
 */
export const convertMediaPipeLandmarks = (landmarks: NormalizedLandmark[]): NamedKeypoint[] => {
  if (!landmarks || landmarks.length === 0) return [];
  
  return landmarks.map((lm, index) => ({
    name: MEDIAPIPE_LANDMARK_NAMES[index] || `landmark_${index}`,
    x: 1 - lm.x, // Flip x for mirrored video display
    y: lm.y,
    score: lm.visibility ?? lm.presence,
    index
  }));
};

/**
 * Calculate angle between three points (in degrees)
 */
export const calculateAngle = (
  pointA: { x: number; y: number },
  pointB: { x: number; y: number }, // Vertex
  pointC: { x: number; y: number }
): number => {
  const radians = Math.atan2(pointC.y - pointB.y, pointC.x - pointB.x) -
                  Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
};

/**
 * Normalizes a pose to be invariant to scale and translation.
 * Center is usually the mid-point between hips.
 * Scale is usually based on torso height (shoulder to hip).
 */
export const normalizePose = (landmarks: NormalizedLandmark[]): NormalizedLandmark[] => {
  if (!landmarks || landmarks.length < 33) return [];

  // MediaPipe Body Landmarks index: 
  // 11: left_shoulder, 12: right_shoulder, 23: left_hip, 24: right_hip
  const leftHip = landmarks[23];
  const rightHip = landmarks[24];
  
  if (!leftHip || !rightHip || leftHip.visibility! < 0.5 || rightHip.visibility! < 0.5) {
    return landmarks; // Return original if hips are not visible enough
  }

  // Calculate Hip Center (Root)
  const rootX = (leftHip.x + rightHip.x) / 2;
  const rootY = (leftHip.y + rightHip.y) / 2;
  const rootZ = (leftHip.z + rightHip.z) / 2;

  // Translate all points so root is at (0,0,0) - relative to root
  // Note: For visualization on screen we usually keep 0-1 coordinates, 
  // this normalization is for mathematical comparison (not rendering).
  // If rendering, we might want to keep them in 0-1 space but centered.
  
  // For this utility, we return "centered" coordinates relative to the hip center
  return landmarks.map(lm => ({
    x: lm.x - rootX,
    y: lm.y - rootY,
    z: lm.z - rootZ,
    visibility: lm.visibility
  }));
};

