import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Repeat,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onSpeedChange: (rate: number) => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

const VideoControls = ({
  isPlaying,
  currentTime,
  duration,
  playbackRate,
  onPlayPause,
  onSeek,
  onSpeedChange,
}: VideoControlsProps) => {
  const handleSliderChange = (value: number[]) => {
    onSeek(value[0]);
  };

  const handleFrameBack = () => {
    onSeek(Math.max(0, currentTime - 1 / 30)); // 1프레임 뒤로 (30fps 기준)
  };

  const handleFrameForward = () => {
    onSeek(Math.min(duration, currentTime + 1 / 30)); // 1프레임 앞으로
  };

  const handleSkipBack = () => {
    onSeek(Math.max(0, currentTime - 5)); // 5초 뒤로
  };

  const handleSkipForward = () => {
    onSeek(Math.min(duration, currentTime + 5)); // 5초 앞으로
  };

  return (
    <div className="glass-card rounded-xl p-4 space-y-3">
      {/* 프로그레스 바 */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground w-12 text-right">
          {formatTime(currentTime)}
        </span>
        <Slider
          value={[currentTime]}
          min={0}
          max={duration}
          step={0.1}
          onValueChange={handleSliderChange}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-12">
          {formatTime(duration)}
        </span>
      </div>

      {/* 컨트롤 버튼들 */}
      <div className="flex items-center justify-between">
        {/* 좌측: 재생 컨트롤 */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFrameBack}
            className="h-8 w-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkipBack}
            className="h-8 w-8"
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            className="h-10 w-10 rounded-full btn-glow"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkipForward}
            className="h-8 w-8"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFrameForward}
            className="h-8 w-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* 중앙: 추가 컨트롤 */}
        <div className="flex items-center gap-2">
          <Toggle size="sm" className="h-8">
            <Repeat className="w-4 h-4 mr-1" />
            구간 반복
          </Toggle>
        </div>

        {/* 우측: 속도/볼륨 */}
        <div className="flex items-center gap-2">
          {/* 속도 선택 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 min-w-16">
                {playbackRate}x
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {speedOptions.map((speed) => (
                <DropdownMenuItem
                  key={speed}
                  onClick={() => onSpeedChange(speed)}
                  className={playbackRate === speed ? "bg-accent" : ""}
                >
                  {speed}x {speed === 1 && "(기본)"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 볼륨 */}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
