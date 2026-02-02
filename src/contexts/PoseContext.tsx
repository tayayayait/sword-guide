import { createContext, useContext, useState, ReactNode } from 'react';
import { NormalizedLandmark } from '@/lib/poseUtils';
import { PoseAnalysisResult, usePoseAnalysis } from '@/hooks/usePoseAnalysis';

interface PoseContextType {
  landmarks: NormalizedLandmark[] | null;
  setLandmarks: (landmarks: NormalizedLandmark[] | null) => void;
  analysis: PoseAnalysisResult;
}

const defaultAnalysis: PoseAnalysisResult = {
  overallAccuracy: 0,
  joints: [],
  isValidPose: false,
};

const PoseContext = createContext<PoseContextType>({
  landmarks: null,
  setLandmarks: () => {},
  analysis: defaultAnalysis,
});

export const PoseProvider = ({ children }: { children: ReactNode }) => {
  const [landmarks, setLandmarks] = useState<NormalizedLandmark[] | null>(null);
  const analysis = usePoseAnalysis(landmarks);

  return (
    <PoseContext.Provider value={{ landmarks, setLandmarks, analysis }}>
      {children}
    </PoseContext.Provider>
  );
};

export const usePose = () => {
  return useContext(PoseContext);
};
