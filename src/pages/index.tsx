import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import { useState } from "react";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return (
    <>
      <main className="bg-black-pure min-h-screen">
        <Topbar />
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold text-text-primary mb-8 border-b border-border-subtle pb-4">
            Problemset
          </h1>
          <div className="relative overflow-x-auto">
            {loadingProblems && (
              <div className="animate-pulse space-y-2">
                {[...Array(10)].map((_, idx) => (
                  <LoadingSkeleton key={idx} />
                ))}
              </div>
            )}
            <table className="text-sm text-left w-full">
              {!loadingProblems && (
                <thead className="text-xs uppercase border-b border-border-subtle">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-text-tertiary w-12"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-text-tertiary"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 font-medium text-text-tertiary w-28"
                    >
                      Difficulty
                    </th>
                  </tr>
                </thead>
              )}
              <ProblemsTable setLoadingProblems={setLoadingProblems} />
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 px-4 py-3 border-b border-border-subtle">
      <div className="w-4 h-4 shrink-0 rounded bg-black-surface"></div>
      <div className="h-4 w-64 rounded bg-black-surface"></div>
      <div className="h-4 w-20 rounded bg-black-surface ml-auto"></div>
    </div>
  );
};
