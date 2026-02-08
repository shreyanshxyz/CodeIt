import Link from "next/link";
import React, { useEffect, useState } from "react";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const DifficultyBadge: React.FC<{ difficulty: string }> = ({ difficulty }) => {
  const colorClasses = {
    Easy: "text-difficulty-easy",
    Medium: "text-difficulty-medium",
    Hard: "text-difficulty-hard",
  };

  return (
    <span
      className={`text-xs font-medium ${colorClasses[difficulty as keyof typeof colorClasses] || "text-text-secondary"}`}
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
    <>
      <tbody className="text-text-primary">
        {problemsList.map((problem, idx) => {
          const isSolved = solvedProblems.has(problem.id);
          return (
            <tr
              className={`border-b border-border-subtle hover:bg-black-hover transition-all duration-150 ${
                idx % 2 === 0 ? "bg-black-pure" : "bg-black-elevated"
              }`}
              key={problem.id}
            >
              <td className="px-4 py-3 w-12">
                <div className="flex items-center justify-center">
                  {isSolved ? (
                    <BsCheckCircleFill className="text-accent-green text-lg" />
                  ) : (
                    <BsCircle className="text-text-tertiary text-lg" />
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <Link
                  className="hover:text-accent-blue cursor-pointer transition-all duration-150 text-sm"
                  href={`/problems/${problem.id}`}
                >
                  {problem.title}
                </Link>
              </td>
              <td className="px-4 py-3 w-28">
                <DifficultyBadge difficulty={problem.difficulty} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};
export default ProblemsTable;
