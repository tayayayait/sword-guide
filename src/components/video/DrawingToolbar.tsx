import { MousePointer2, Square, Circle, Minus, Eraser, Undo, Redo, Trash2, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DrawingTool } from './DrawingCanvas';

interface DrawingToolbarProps {
  currentTool: DrawingTool;
  onToolChange: (tool: DrawingTool) => void;
  currentColor: string;
  onColorChange: (color: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
  className?: string;
}

const DrawingToolbar = ({
  currentTool,
  onToolChange,
  currentColor,
  onColorChange,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
  className
}: DrawingToolbarProps) => {

  const tools = [
    { id: 'pen', icon: MousePointer2, label: '펜' },
    { id: 'line', icon: Minus, label: '선' },
    { id: 'rect', icon: Square, label: '사각형' },
    { id: 'circle', icon: Circle, label: '원' },
    { id: 'eraser', icon: Eraser, label: '지우개' },
  ] as const;

  const colors = [
    { value: '#ef4444', label: 'Red' },    // --color-error
    { value: '#3b82f6', label: 'Blue' },    // --color-info
    { value: '#10b981', label: 'Green' },   // --color-success
    { value: '#f59e0b', label: 'Yellow' },  // --color-warning
    { value: '#ffffff', label: 'White' },
  ];

  return (
    <div className={cn("flex flex-col gap-2 p-2 bg-black/80 backdrop-blur-sm rounded-lg border border-white/10", className)}>
      <div className="flex flex-col gap-1">
        {tools.map((tool) => (
          <Toggle
            key={tool.id}
            pressed={currentTool === tool.id}
            onPressedChange={(pressed) => {
              if (pressed) onToolChange(tool.id);
            }}
            aria-label={tool.label}
            className={cn(
               "w-10 h-10 p-0 data-[state=on]:bg-primary data-[state=on]:text-white hover:bg-white/10 hover:text-white text-white/70",
               currentTool === tool.id && "bg-primary text-white"
            )}
            variant="outline"
          >
            <tool.icon className="w-5 h-5" />
          </Toggle>
        ))}
      </div>

      <div className="h-px bg-white/10 my-1" />

      {/* Color Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-10 h-10 hover:bg-white/10"
            style={{ color: currentColor }}
          >
            <div 
                className="w-5 h-5 rounded-full border-2 border-current" 
                style={{ backgroundColor: currentColor }} 
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-auto p-2 bg-slate-900 border-slate-700">
           <div className="grid grid-cols-3 gap-2">
             {colors.map((c) => (
                <button
                    key={c.value}
                    className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                        currentColor === c.value ? "border-white" : "border-transparent"
                    )}
                    style={{ backgroundColor: c.value }}
                    onClick={() => onColorChange(c.value)}
                    title={c.label}
                />
             ))}
           </div>
        </PopoverContent>
      </Popover>

      <div className="h-px bg-white/10 my-1" />

      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onUndo}
          disabled={!canUndo}
          className="w-10 h-10 hover:bg-white/10 text-white/70 hover:text-white disabled:opacity-30"
        >
          <Undo className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRedo}
          disabled={!canRedo}
          className="w-10 h-10 hover:bg-white/10 text-white/70 hover:text-white disabled:opacity-30"
        >
          <Redo className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="w-10 h-10 hover:bg-red-500/20 text-red-400 hover:text-red-300"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default DrawingToolbar;
