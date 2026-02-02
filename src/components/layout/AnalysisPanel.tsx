import { useState, useEffect, useRef, useCallback } from "react";
import { Activity, TrendingUp, AlertCircle, CheckCircle2, FileText, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProgressRing from "@/components/ui/ProgressRing";
import AccuracyChart from "@/components/analysis/AccuracyChart";
import AnalysisReportModal from "@/components/analysis/AnalysisReportModal";
import { usePose } from "@/contexts/PoseContext";
import { useSession } from "@/contexts/SessionContext";
import { JointAnalysis } from "@/hooks/usePoseAnalysis";
import { getRealtimeCoaching } from "@/lib/OpenAIService";

const getStatusColor = (status: JointAnalysis["status"]) => {
  switch (status) {
    case "perfect": return "feedback-perfect";
    case "good": return "feedback-good";
    case "fair": return "feedback-fair";
    case "poor": return "feedback-poor";
    default: return "";
  }
};

const getStatusLabel = (status: JointAnalysis["status"]) => {
  switch (status) {
    case "perfect": return "Perfect";
    case "good": return "Good";
    case "fair": return "Fair";
    case "poor": return "Poor";
    default: return "";
  }
};

// Generate rule-based feedback
const generateRuleFeedback = (joint: JointAnalysis): string => {
  const direction = joint.angle < joint.targetAngle ? "올려" : "내려";
  
  switch (joint.status) {
    case "poor":
      return `${joint.name}를 ${Math.abs(joint.deviation).toFixed(0)}° 더 ${direction}주세요.`;
    case "fair":
      return `${joint.name} 조금 더 조정이 필요합니다.`;
    case "good":
      return `${joint.name} 거의 완벽합니다!`;
    case "perfect":
      return `${joint.name} 완벽한 자세입니다!`;
    default:
      return "";
  }
};

const AnalysisPanel = () => {
  const { analysis } = usePose();
  const { 
    addAccuracyPoint, 
    startSession, 
    isSessionActive,
    feedbackMessages,
    addFeedback,
    isAICoachingLoading,
    setAICoachingLoading,
    lastAICoachingTime,
    setLastAICoachingTime,
  } = useSession();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const lastRecordedRef = useRef<number>(0);
  const lowAccuracyStartRef = useRef<number | null>(null);

  // Start session when pose is valid
  useEffect(() => {
    if (analysis.isValidPose && !isSessionActive) {
      startSession();
    }
  }, [analysis.isValidPose, isSessionActive, startSession]);

  // Record accuracy every 10 seconds
  useEffect(() => {
    if (!analysis.isValidPose || !isSessionActive) return;
    
    const now = Date.now();
    if (now - lastRecordedRef.current >= 10000) {
      addAccuracyPoint(analysis.overallAccuracy);
      lastRecordedRef.current = now;
    }
  }, [analysis, isSessionActive, addAccuracyPoint]);

  // Generate rule-based feedback when status changes
  useEffect(() => {
    if (!analysis.isValidPose) return;
    
    // Find worst performing joint and add feedback
    const poorJoint = analysis.joints.find(j => j.status === 'poor');
    if (poorJoint) {
      addFeedback(generateRuleFeedback(poorJoint), 'error');
    } else if (analysis.overallAccuracy >= 85) {
      addFeedback('자세가 안정적입니다! 유지하세요.', 'success');
    }
  }, [analysis.joints.map(j => j.status).join(',')]); // Trigger on status change

  // Auto AI coaching trigger (low accuracy for 10 seconds)
  useEffect(() => {
    if (!analysis.isValidPose) {
      lowAccuracyStartRef.current = null;
      return;
    }

    if (analysis.overallAccuracy < 50) {
      if (!lowAccuracyStartRef.current) {
        lowAccuracyStartRef.current = Date.now();
      } else if (Date.now() - lowAccuracyStartRef.current >= 10000) {
        // Only trigger if not recently called
        const now = Date.now();
        if (!lastAICoachingTime || now - lastAICoachingTime >= 30000) {
          triggerAICoaching();
        }
        lowAccuracyStartRef.current = null;
      }
    } else {
      lowAccuracyStartRef.current = null;
    }
  }, [analysis]);

  // AI Coaching function
  const triggerAICoaching = useCallback(async () => {
    if (isAICoachingLoading || !analysis.isValidPose) return;
    
    setAICoachingLoading(true);
    setLastAICoachingTime(Date.now());
    
    try {
      const coaching = await getRealtimeCoaching(analysis.joints, analysis.overallAccuracy);
      addFeedback(coaching, 'info');
    } catch (error) {
      console.error('AI coaching error:', error);
      addFeedback('AI 코칭을 불러오는데 실패했습니다.', 'error');
    } finally {
      setAICoachingLoading(false);
    }
  }, [analysis, isAICoachingLoading, addFeedback, setAICoachingLoading, setLastAICoachingTime]);

  const overallAccuracy = analysis.isValidPose ? analysis.overallAccuracy : 0;
  const joints = analysis.joints;

  const getFeedbackIcon = (type: 'success' | 'warning' | 'error' | 'info') => {
    switch (type) {
      case "success": return <CheckCircle2 className="w-4 h-4 text-feedback-perfect" />;
      case "warning": return <AlertCircle className="w-4 h-4 text-feedback-fair" />;
      case "error": return <AlertCircle className="w-4 h-4 text-feedback-poor" />;
      case "info": return <Sparkles className="w-4 h-4 text-primary" />;
      default: return null;
    }
  };

  return (
    <aside className="w-panel h-full bg-card border-l border-border flex flex-col overflow-hidden">
      {/* 헤더 */}
      <div className="p-4 border-b border-border flex justify-between items-center bg-card z-10">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          실시간 분석
        </h2>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs gap-1"
        >
          <FileText className="w-3 h-3" />
          리포트
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* 전체 정확도 */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                전체 정확도
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-4">
              <ProgressRing value={overallAccuracy} size={140} strokeWidth={10}>
                <div className="text-center">
                  <span className="text-3xl font-bold text-foreground">{overallAccuracy}</span>
                  <span className="text-lg text-muted-foreground">%</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {!analysis.isValidPose ? '감지 대기중' : 
                     overallAccuracy >= 90 ? 'Perfect' : 
                     overallAccuracy >= 70 ? 'Good' : 
                     overallAccuracy >= 50 ? 'Fair' : 'Poor'}
                  </p>
                </div>
              </ProgressRing>
            </CardContent>
          </Card>

          {/* 관절별 상태 */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                관절별 상태
                <TrendingUp className="w-4 h-4" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {joints.length > 0 ? (
                joints.map((joint) => (
                  <div key={joint.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground">{joint.name}</span>
                      <Badge className={`feedback-badge ${getStatusColor(joint.status)}`}>
                        {getStatusLabel(joint.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={Math.min(100, 100 - Math.abs(joint.angle - joint.targetAngle) * 5)} 
                        className="h-1.5 flex-1"
                      />
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {joint.angle}° / {joint.targetAngle}°
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  카메라를 켜고 자세를 취해주세요
                </p>
              )}
            </CardContent>
          </Card>

          {/* 정확도 추이 차트 */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                정확도 추이
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <AccuracyChart />
            </CardContent>
          </Card>

          {/* 피드백 with AI Coaching Button */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                피드백
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={triggerAICoaching}
                  disabled={isAICoachingLoading || !analysis.isValidPose}
                  className="h-7 text-xs gap-1"
                >
                  {isAICoachingLoading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  AI 코칭
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {feedbackMessages.length > 0 ? (
                feedbackMessages.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="flex items-start gap-2 p-2 rounded-lg bg-secondary/50"
                  >
                    {getFeedbackIcon(feedback.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground">{feedback.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {feedback.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {analysis.isValidPose ? '분석 중...' : '피드백이 없습니다'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
      
      <AnalysisReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      />
    </aside>
  );
};

export default AnalysisPanel;
