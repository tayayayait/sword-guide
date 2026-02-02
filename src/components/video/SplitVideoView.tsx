import { useState } from "react";
import { Layers, SplitSquareVertical, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import VideoPanel from "./VideoPanel";
import VideoControls from "./VideoControls";

type ViewMode = "split" | "overlay";

const SplitVideoView = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(120); // 예시: 2분 영상
  const [playbackRate, setPlaybackRate] = useState(1);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* 뷰 모드 전환 버튼 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Toggle
            pressed={viewMode === "split"}
            onPressedChange={() => setViewMode("split")}
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <SplitSquareVertical className="w-4 h-4 mr-2" />
            분할 모드
          </Toggle>
          <Toggle
            pressed={viewMode === "overlay"}
            onPressedChange={() => setViewMode("overlay")}
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            <Layers className="w-4 h-4 mr-2" />
            오버레이 모드
          </Toggle>
        </div>

        <Button variant="ghost" size="icon">
          <Maximize2 className="w-5 h-5" />
        </Button>
      </div>

      {/* 비디오 패널 영역 */}
      <div className="flex-1 relative">
        {viewMode === "split" ? (
          // 좌우 분할 모드
          <div className="h-full flex gap-4">
            <VideoPanel
              type="reference"
              title="기준 영상"
              className="flex-1"
            />
            <VideoPanel
              type="live"
              title="내 영상 (웹캠)"
              className="flex-1"
            />
          </div>
        ) : (
          // 오버레이 모드
          <div className="h-full relative">
            <VideoPanel
              type="reference"
              title="기준 영상"
              className="absolute inset-0"
            />
            <VideoPanel
              type="live"
              title="내 영상 (웹캠)"
              className="absolute inset-0 opacity-50"
              isOverlay
            />
          </div>
        )}
      </div>

      {/* 비디오 컨트롤러 */}
      <VideoControls
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        playbackRate={playbackRate}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        onSpeedChange={handleSpeedChange}
      />
    </div>
  );
};

export default SplitVideoView;
