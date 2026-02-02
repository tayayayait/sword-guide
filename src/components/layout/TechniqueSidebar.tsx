import { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  Play, 
  Upload, 
  FolderOpen,
  Swords,
  Target,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TechniqueCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  techniques: Technique[];
}

interface Technique {
  id: string;
  name: string;
  duration: string;
  thumbnail?: string;
}

const categories: TechniqueCategory[] = [
  {
    id: "basic",
    name: "기본형",
    icon: Swords,
    techniques: [
      { id: "basic-1", name: "중단세 (Chudan)", duration: "0:45" },
      { id: "basic-2", name: "상단세 (Jodan)", duration: "0:38" },
      { id: "basic-3", name: "하단세 (Gedan)", duration: "0:42" },
    ],
  },
  {
    id: "strike",
    name: "격자 기술",
    icon: Target,
    techniques: [
      { id: "strike-1", name: "머리치기 (Men)", duration: "1:20" },
      { id: "strike-2", name: "손목치기 (Kote)", duration: "1:15" },
      { id: "strike-3", name: "허리치기 (Do)", duration: "1:10" },
      { id: "strike-4", name: "목치기 (Tsuki)", duration: "0:55" },
    ],
  },
  {
    id: "defense",
    name: "방어 기술",
    icon: Shield,
    techniques: [
      { id: "def-1", name: "막기 (Uke)", duration: "0:50" },
      { id: "def-2", name: "피하기 (Nuki)", duration: "0:45" },
    ],
  },
];

interface TechniqueSidebarProps {
  onSelectTechnique?: (technique: Technique) => void;
  selectedTechniqueId?: string;
}

const TechniqueSidebar = ({ onSelectTechnique, selectedTechniqueId }: TechniqueSidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["basic", "strike"]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <aside className="w-sidebar h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* 헤더 */}
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-sm font-semibold text-sidebar-foreground mb-3">기술 라이브러리</h2>
        <Button variant="outline" size="sm" className="w-full justify-start gap-2">
          <Upload className="w-4 h-4" />
          영상 업로드
        </Button>
      </div>

      {/* 카테고리 목록 */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const Icon = category.icon;

            return (
              <div key={category.id} className="mb-1">
                {/* 카테고리 헤더 */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {category.techniques.length}
                  </span>
                </button>

                {/* 기술 목록 */}
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {category.techniques.map((technique) => (
                      <button
                        key={technique.id}
                        onClick={() => onSelectTechnique?.(technique)}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors",
                          selectedTechniqueId === technique.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        )}
                      >
                        <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center flex-shrink-0">
                          <Play className="w-3 h-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{technique.name}</p>
                          <p className="text-xs text-muted-foreground">{technique.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* 사용자 영상 섹션 */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
          <FolderOpen className="w-4 h-4" />
          <span className="text-sm">내 영상</span>
        </button>
      </div>
    </aside>
  );
};

export default TechniqueSidebar;
