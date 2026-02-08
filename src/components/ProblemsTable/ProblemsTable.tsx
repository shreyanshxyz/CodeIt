import Link from "next/link";
import React, { useEffect, useState } from "react";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
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

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  setLoadingProblems,
}) => {
  const [problemsList, setProblemsList] = useState<Problem[]>([]);
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const getProblems = async () => {
      setLoadingProblems(true);
      const problemsArray = Object.values(problems).sort(
        (a, b) => a.order - b.order,
      );
      setProblemsList(problemsArray);

      // Load solved problems from localStorage
      const solved = new Set<string>();
      problemsArray.forEach((problem) => {
        const isSolved = localStorage.getItem(`solved-${problem.id}`);
        if (isSolved === "true") {
          solved.add(problem.id);
        }
      });
      setSolvedProblems(solved);

      setLoadingProblems(false);
    };

    getProblems();
  }, [setLoadingProblems]);

  return (
    <div className="bg-dark-layer-2 rounded-lg border border-dark-divide-border overflow-hidden">
      <div className="flex items-center px-4 py-3 bg-dark-layer-1 border-b border-dark-divide-border">
        <div className="w-10 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </div>
        <div className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Title
        </div>
        <div className="w-24 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
          Difficulty
        </div>
      </div>

      <div className="divide-y divide-dark-divide-border">
        {problemsList.map((problem, idx) => {
          const isSolved = solvedProblems.has(problem.id);
          return (
            <Link
              key={problem.id}
              href={`/problems/${problem.id}`}
              className="flex items-center px-4 py-3 hover:bg-dark-fill-2 transition-colors group"
            >
              <div className="w-10 flex items-center justify-center">
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
                <span className="text-sm text-gray-500 font-mono">
                  {idx + 1}.
                </span>
                <span className="text-sm text-gray-300 group-hover:text-green-400 transition-colors">
                  {problem.title.replace(/^\d+\.\s*/, "")}
                </span>
              </div>

              <div className="w-24 text-right">
                <DifficultyBadge difficulty={problem.difficulty} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default ProblemsTable;
