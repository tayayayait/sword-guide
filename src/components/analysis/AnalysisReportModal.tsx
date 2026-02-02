import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, Clock, AlertTriangle, Activity, Sparkles, MessageSquareQuote, Loader2 } from 'lucide-react';
import AccuracyChart from './AccuracyChart';
import { getAICoachingCallback, AICoachResponse } from '@/lib/OpenAIService';
import { cn } from '@/lib/utils';

interface AnalysisReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionData?: {
    duration: string;
    averageAccuracy: number;
    issuesDetected: number;
    accuracyHistory: { name: string; user: number; standard: number }[];
  };
}

const AnalysisReportModal = ({ isOpen, onClose, sessionData }: AnalysisReportModalProps) => {
  // Mock data if not provided
  const data = sessionData || {
    duration: "12:30",
    averageAccuracy: 85,
    issuesDetected: 3,
    accuracyHistory: [
      { name: '00:00', user: 70, standard: 100 },
      { name: '02:00', user: 75, standard: 100 },
      { name: '04:00', user: 82, standard: 100 },
      { name: '06:00', user: 88, standard: 100 },
      { name: '08:00', user: 90, standard: 100 },
      { name: '10:00', user: 85, standard: 100 },
      { name: '12:00', user: 92, standard: 100 },
    ]
  };

  const [aiResponse, setAiResponse] = useState<AICoachResponse | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleAskAICoach = async () => {
    setIsLoadingAI(true);
    const result = await getAICoachingCallback(data);
    setAiResponse(result);
    setIsLoadingAI(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-slate-900 text-white border-slate-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            수련 분석 리포트
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            세션이 완료되었습니다. 분석 결과를 확인하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-4 text-white">
          {/* Summary Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Clock className="w-4 h-4" />
                <span>총 수련 시간</span>
              </div>
              <div className="text-3xl font-bold">{data.duration}</div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Activity className="w-4 h-4" />
                <span>평균 정확도</span>
              </div>
              <div className="text-3xl font-bold flex items-end gap-2 text-emerald-400">
                {data.averageAccuracy}%
                <span className="text-sm font-normal text-slate-400 mb-1">Excellent</span>
              </div>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>발견된 이슈</span>
              </div>
              <div className="text-3xl font-bold text-amber-400">{data.issuesDetected}건</div>
            </div>
          </div>

          {/* AI Coach Section - Prominent Placement */}
          <div className="lg:col-span-3">
             {!aiResponse ? (
                <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6 rounded-xl border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                   <div className="space-y-1">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-300">
                         <Sparkles className="w-5 h-5" />
                         AI 정심(正心) 사범님의 피드백
                      </h3>
                      <p className="text-sm text-slate-300">
                         수련 데이터를 바탕으로 AI 사범님이 맞춤형 조언을 제공합니다.
                      </p>
                   </div>
                   <Button 
                      onClick={handleAskAICoach} 
                      disabled={isLoadingAI}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white min-w-[160px]"
                   >
                      {isLoadingAI ? (
                        <>
                           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                           분석 중...
                        </>
                      ) : (
                        <>
                           <MessageSquareQuote className="w-4 h-4 mr-2" />
                           피드백 받기
                        </>
                      )}
                   </Button>
                </div>
             ) : (
                <div className={cn(
                    "p-6 rounded-xl border animate-in fade-in slide-in-from-top-2 duration-500",
                    aiResponse.tone === 'strict' ? "bg-slate-800 border-amber-500/30" : 
                    aiResponse.tone === 'encouraging' ? "bg-indigo-950/40 border-indigo-500/30" :
                    "bg-slate-800 border-slate-600"
                )}>
                    <div className="flex items-start gap-4">
                       <div className="p-3 bg-indigo-500/20 rounded-full">
                          <Sparkles className="w-6 h-6 text-indigo-400" />
                       </div>
                       <div className="space-y-3 flex-1">
                          <div>
                             <h4 className="font-bold text-lg text-indigo-200 mb-1">AI 사범님의 총평</h4>
                             <p className="text-slate-200 leading-relaxed">{aiResponse.summary}</p>
                          </div>
                          <div className="bg-black/20 p-4 rounded-lg">
                             <h5 className="font-semibold text-amber-200 mb-1 flex items-center gap-2">
                                <MessageSquareQuote className="w-4 h-4" />
                                교정 조언
                             </h5>
                             <p className="text-slate-300 italic">"{aiResponse.advice}"</p>
                          </div>
                       </div>
                    </div>
                </div>
             )}
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-2 bg-slate-800 p-4 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">정확도 추이</h3>
            <div className="h-[300px]">
              <AccuracyChart data={data.accuracyHistory} />
            </div>
          </div>

          {/* Feedback List */}
          <div className="lg:col-span-1 bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col h-[380px]">
            <h3 className="text-lg font-semibold mb-4">주요 피드백</h3>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-3">
                <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-semibold text-sm">왼쪽 팔꿈치 각도</span>
                  </div>
                  <p className="text-sm text-slate-300">기준 자세보다 15도 낮습니다. 더 높게 들어주세요.</p>
                </div>
                
                <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-semibold text-sm">허리 굽힘</span>
                  </div>
                  <p className="text-sm text-slate-300">상체가 앞으로 쏠려 있습니다. 등을 펴주세요.</p>
                </div>
                
                <div className="p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-semibold text-sm">발놀림 개선</span>
                  </div>
                  <p className="text-sm text-slate-300">이전 세션 대비 발의 위치가 매우 좋아졌습니다.</p>
                </div>
                 <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-semibold text-sm">왼쪽 팔꿈치 각도</span>
                  </div>
                  <p className="text-sm text-slate-300">기준 자세보다 15도 낮습니다. 더 높게 들어주세요.</p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={onClose} size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisReportModal;
