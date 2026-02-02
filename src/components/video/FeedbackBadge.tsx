import { Check, AlertTriangle, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeedbackType = "success" | "warning" | "error" | "info";

interface FeedbackBadgeProps {
  type: FeedbackType;
  message: string;
  className?: string;
}

const FeedbackBadge = ({ type, message, className }: FeedbackBadgeProps) => {
  const styles = {
    success: {
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/50",
      text: "text-white",
      icon: Check,
      iconColor: "text-emerald-400"
    },
    warning: {
      bg: "bg-amber-500/20",
      border: "border-amber-500/50",
      text: "text-white",
      icon: AlertTriangle,
      iconColor: "text-amber-400"
    },
    error: {
      bg: "bg-red-500/20",
      border: "border-red-500/50",
      text: "text-white",
      icon: XCircle,
      iconColor: "text-red-400"
    },
    info: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/50",
      text: "text-white",
      icon: Info,
      iconColor: "text-blue-400"
    }
  };

  const currentStyle = styles[type];
  const Icon = currentStyle.icon;

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg animate-in fade-in zoom-in duration-300",
      currentStyle.bg,
      currentStyle.border,
      className
    )}>
      <Icon className={cn("w-4 h-4", currentStyle.iconColor)} />
      <span className={cn("text-sm font-medium", currentStyle.text)}>
        {message}
      </span>
    </div>
  );
};

export default FeedbackBadge;
