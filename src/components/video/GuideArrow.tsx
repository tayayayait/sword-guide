import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GuideArrowProps {
  /**
   * Direction of the correction
   */
  direction: "up" | "down" | "left" | "right";
  /**
   * Type of feedback (determines color)
   */
  type?: "info" | "warning" | "error" | "success";
  /**
   * Size of the arrow in pixels
   */
  size?: number;
  /**
   * Tailwind class overrides
   */
  className?: string;
  /**
   * Absolute position x (percentage 0-1)
   */
  x?: number;
  /**
   * Absolute position y (percentage 0-1)
   */
  y?: number;
}

const GuideArrow = ({
  direction,
  type = "info",
  size = 60,
  className,
  x,
  y,
}: GuideArrowProps) => {
  const Icon = {
    up: ArrowUp,
    down: ArrowDown,
    left: ArrowLeft,
    right: ArrowRight,
  }[direction];

  const colorClass = {
    info: "text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]",
    warning: "text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]",
    error: "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    success: "text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  }[type];

  // Helper styles for absolute positioning if coordinates are provided
  const positionStyle =
    x !== undefined && y !== undefined
      ? {
          position: "absolute" as const,
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          transform: "translate(-50%, -50%)", // Center on the point
        }
      : {};

  return (
    <div
      className={cn(
        "animate-bounce transition-all duration-300", 
        colorClass,
        className
      )}
      style={positionStyle}
    >
      <Icon size={size} strokeWidth={3} />
    </div>
  );
};

export default GuideArrow;
