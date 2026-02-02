import { createContext, useContext, useState, useCallback, ReactNode, useRef, useEffect } from 'react';

interface AccuracyDataPoint {
  timestamp: number;
  accuracy: number;
  time: string; // "MM:SS" format
}

interface FeedbackMessage {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: Date;
}

interface SessionContextType {
  // Session state
  sessionStartTime: number | null;
  isSessionActive: boolean;
  
  // Accuracy history
  accuracyHistory: AccuracyDataPoint[];
  addAccuracyPoint: (accuracy: number) => void;
  
  // Feedback messages
  feedbackMessages: FeedbackMessage[];
  addFeedback: (message: string, type: FeedbackMessage['type']) => void;
  clearFeedback: () => void;
  
  // Session controls
  startSession: () => void;
  endSession: () => void;
  
  // AI coaching state
  isAICoachingLoading: boolean;
  setAICoachingLoading: (loading: boolean) => void;
  lastAICoachingTime: number | null;
  setLastAICoachingTime: (time: number) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

const formatTime = (elapsedMs: number): string => {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [accuracyHistory, setAccuracyHistory] = useState<AccuracyDataPoint[]>([]);
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([]);
  const [isAICoachingLoading, setAICoachingLoading] = useState(false);
  const [lastAICoachingTime, setLastAICoachingTime] = useState<number | null>(null);
  const feedbackIdRef = useRef(0);

  const startSession = useCallback(() => {
    setSessionStartTime(Date.now());
    setIsSessionActive(true);
    setAccuracyHistory([]);
    setFeedbackMessages([]);
    setLastAICoachingTime(null);
  }, []);

  const endSession = useCallback(() => {
    setIsSessionActive(false);
  }, []);

  const addAccuracyPoint = useCallback((accuracy: number) => {
    if (!sessionStartTime) return;
    
    const now = Date.now();
    const elapsed = now - sessionStartTime;
    const time = formatTime(elapsed);
    
    setAccuracyHistory(prev => {
      // Keep only last 2 minutes of data (12 points at 10s intervals)
      const newHistory = [...prev, { timestamp: now, accuracy, time }];
      if (newHistory.length > 12) {
        return newHistory.slice(-12);
      }
      return newHistory;
    });
  }, [sessionStartTime]);

  const addFeedback = useCallback((message: string, type: FeedbackMessage['type']) => {
    feedbackIdRef.current += 1;
    const newFeedback: FeedbackMessage = {
      id: `feedback-${feedbackIdRef.current}`,
      message,
      type,
      timestamp: new Date(),
    };
    
    setFeedbackMessages(prev => {
      // Keep only last 5 messages
      const updated = [newFeedback, ...prev];
      return updated.slice(0, 5);
    });
  }, []);

  const clearFeedback = useCallback(() => {
    setFeedbackMessages([]);
  }, []);

  return (
    <SessionContext.Provider value={{
      sessionStartTime,
      isSessionActive,
      accuracyHistory,
      addAccuracyPoint,
      feedbackMessages,
      addFeedback,
      clearFeedback,
      startSession,
      endSession,
      isAICoachingLoading,
      setAICoachingLoading,
      lastAICoachingTime,
      setLastAICoachingTime,
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
