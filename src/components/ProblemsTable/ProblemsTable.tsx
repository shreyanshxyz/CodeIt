'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api/client";

type Difficulty = 'Easy' | 'Medium' | 'Hard';

type ProblemsTableProps = {
  filters?: {
    search?: string;
    difficulty?: Difficulty | null;
    category?: string | null;
    tag?: string | null;
    sortBy?: 'order' | 'difficulty' | 'acceptance';
    sortOrder?: 'asc' | 'desc';
  };
  onResultsCount?: (count: number) => void;
};

type Problem = {
  id: string;
  title: string;
  difficulty: Difficulty;
  category?: string;
  acceptance_rate?: number | null;
  userProgress?: {
    status: 'not_started' | 'in_progress' | 'solved';
    attempts_count: number;
  };
};

const DifficultyBadge: React.FC<{ difficulty: string }> = ({ difficulty }) => {
  const colorClasses = {
    Easy: "text-green-500",
    Medium: "text-yellow-500",
    Hard: "text-red-500",
  };

  return (
    <span
      className={`text-xs font-medium ${colorClasses[difficulty as keyof typeof colorClasses] || "text-gray-400"}`}
    >
      {difficulty}
    </span>
  );
};

const AcceptanceBadge: React.FC<{ rate: number | null | undefined }> = ({ rate }) => {
  if (rate === null || rate === undefined) return null;
  
  const displayRate = rate.toFixed(1);
  let colorClass = "text-gray-400";
  
  if (rate >= 60) colorClass = "text-green-400";
  else if (rate >= 40) colorClass = "text-yellow-400";
  else colorClass = "text-red-400";

  return (
    <span className={`text-xs ${colorClass}`}>
      {displayRate}%
    </span>
  );
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  filters,
  onResultsCount,
}) => {
  const { data: session } = useSession();
  const [problemsList, setProblemsList] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProblems = async () => {
      setLoading(true);
      try {
        const response = await api.getProblems({
          limit: 100,
          search: filters?.search || undefined,
          difficulty: filters?.difficulty || undefined,
          category: filters?.category || undefined,
          tag: filters?.tag || undefined,
          sort: filters?.sortBy,
          sortOrder: filters?.sortOrder,
        });
        if (response.success) {
          setProblemsList(response.data);
          onResultsCount?.(response.total);
        }
      } catch (error) {
        console.error('Failed to fetch problems:', error);
        onResultsCount?.(0);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      getProblems();
    }, filters?.search ? 300 : 0);

    return () => clearTimeout(debounceTimer);
  }, [
    filters?.search,
    filters?.difficulty,
    filters?.category,
    filters?.tag,
    filters?.sortBy,
    filters?.sortOrder,
  ]);

  return (
    <div className="bg-dark-layer-2 rounded-lg border border-dark-divide-border overflow-hidden">
      <div className="flex items-center px-4 py-3 bg-dark-layer-1 border-b border-dark-divide-border">
        <div className="w-12 shrink-0"></div>
        <div className="flex-1 text-xs font-medium text-gray-500 uppercase">
          Title
        </div>
        <div className="w-20 shrink-0 text-xs font-medium text-gray-500 uppercase text-right hidden sm:block">
          Acceptance
        </div>
        <div className="w-20 shrink-0 text-xs font-medium text-gray-500 uppercase text-right">
          Difficulty
        </div>
      </div>

      {loading ? (
        <div className="divide-y divide-dark-divide-border">
          {[...Array(5)].map((_, idx) => (
            <LoadingSkeleton key={idx} />
          ))}
        </div>
      ) : problemsList.length === 0 ? (
        <div className="px-4 py-8 text-center text-gray-500">
          No problems found matching your criteria
        </div>
      ) : (
        <div className="divide-y divide-dark-divide-border">
          {problemsList.map((problem, idx) => {
            const isSolved = problem.userProgress?.status === 'solved';
            return (
              <Link
                key={problem.id}
                href={`/problems/${problem.id}`}
                className="flex items-center px-4 py-3 hover:bg-dark-fill-2 transition-colors group"
              >
                <div className="w-12 flex items-center justify-center">
                  {isSolved ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : null}
                </div>

                <div className="flex-1 flex items-center gap-3">
                  <span className="text-sm text-gray-500 font-mono hidden sm:inline">
                    {idx + 1}.
                  </span>
                  <span className="text-sm text-gray-300 group-hover:text-green-400 transition-colors">
                    {problem.title.replace(/^\d+\.\s*/, "")}
                  </span>
                  {problem.category && (
                    <span className="text-xs text-gray-600 hidden md:inline">
                      [{problem.category}]
                    </span>
                  )}
                </div>

                <div className="w-20 text-right hidden sm:block">
                  <AcceptanceBadge rate={problem.acceptance_rate} />
                </div>

                <div className="w-20 text-right">
                  <DifficultyBadge difficulty={problem.difficulty} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex items-center px-4 py-3">
    <div className="w-12 shrink-0 flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-dark-fill-3 animate-pulse"></div>
    </div>
    <div className="flex-1 flex items-center gap-3">
      <div className="h-4 w-8 rounded bg-dark-fill-3 animate-pulse hidden sm:block"></div>
      <div className="h-4 w-48 sm:w-64 rounded bg-dark-fill-3 animate-pulse"></div>
    </div>
    <div className="w-20 shrink-0 hidden sm:flex justify-end">
      <div className="h-4 w-12 rounded bg-dark-fill-3 animate-pulse"></div>
    </div>
    <div className="w-20 shrink-0 flex justify-end">
      <div className="h-4 w-16 rounded bg-dark-fill-3 animate-pulse"></div>
    </div>
  </div>
);

export default ProblemsTable;

