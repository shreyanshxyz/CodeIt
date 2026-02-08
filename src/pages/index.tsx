import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import { useState } from "react";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-dark-layer-1 flex flex-col">
      <Topbar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400">Solved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              <span className="text-sm text-gray-400">Attempted</span>
            </div>
          </div>

          {loadingProblems && (
            <div className="space-y-1">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))}
            </div>
          )}
          <ProblemsTable setLoadingProblems={setLoadingProblems} />
        </div>
      </main>
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-dark-fill-2 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-5 h-5 shrink-0 rounded-full bg-dark-fill-1"></div>
        <div className="h-4 w-8 rounded bg-dark-fill-1"></div>
        <div className="h-4 w-64 rounded bg-dark-fill-1"></div>
      </div>
      <div className="h-4 w-16 rounded bg-dark-fill-1"></div>
    </div>
  );
};
