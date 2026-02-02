import { ReactNode } from "react";
import Header from "./Header";
import TechniqueSidebar from "./TechniqueSidebar";
import AnalysisPanel from "./AnalysisPanel";
import { PoseProvider } from "@/contexts/PoseContext";
import { SessionProvider } from "@/contexts/SessionContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SessionProvider>
      <PoseProvider>
        <div className="h-screen w-full flex flex-col overflow-hidden bg-background">
          {/* 헤더 */}
          <Header />

          {/* 메인 콘텐츠 영역 */}
          <div className="flex-1 flex overflow-hidden">
            {/* 좌측 사이드바 - 기술 라이브러리 */}
            <TechniqueSidebar />

            {/* 메인 콘텐츠 */}
            <main className="flex-1 overflow-hidden p-4">
              {children}
            </main>

            {/* 우측 패널 - 분석 결과 */}
            <AnalysisPanel />
          </div>
        </div>
      </PoseProvider>
    </SessionProvider>
  );
};

export default MainLayout;


