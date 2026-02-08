import Link from "next/link";
import React, { useEffect, useState } from "react";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  setLoadingProblems,
}) => {
  const [problemsList, setProblemsList] = useState<Problem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      setLoadingProblems(true);
      const problemsArray = Object.values(problems).sort(
        (a, b) => a.order - b.order,
      );
      setProblemsList(problemsArray);
      setLoadingProblems(false);
    };

    getProblems();
  }, [setLoadingProblems]);

  return (
    <>
      <tbody className="text-white">
        {problemsList.map((problem, idx) => {
          return (
            <tr
              className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
              key={problem.id}
            >
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s"></th>
              <td className="px-6 py-4">
                <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`/problems/${problem.id}`}
                >
                  {problem.title}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};
export default ProblemsTable;
