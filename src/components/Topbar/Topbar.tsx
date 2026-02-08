import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const router = useRouter();

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[router.query.pid as string] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder,
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1,
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length,
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <nav className="flex h-[50px] w-full shrink-0 items-center px-4 bg-dark-layer-2 border-b border-dark-divide-border">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-gray-200 font-bold text-lg tracking-tight group-hover:text-green-400 transition-colors">
            CodeIt
          </span>
        </Link>

        {/* Problem Navigation (only on problem page) */}
        {problemPage && (
          <div className="flex items-center gap-2">
            <button
              className="flex items-center justify-center rounded-lg bg-dark-layer-1 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer transition-all duration-200 border border-dark-divide-border hover:border-gray-600"
              onClick={() => handleProblemChange(false)}
              aria-label="Previous problem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium px-3 py-1.5 text-gray-400 hover:text-gray-200 cursor-pointer transition-all duration-200 rounded-lg hover:bg-dark-fill-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <span className="text-sm">Problem List</span>
            </Link>
            <button
              className="flex items-center justify-center rounded-lg bg-dark-layer-1 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer transition-all duration-200 border border-dark-divide-border hover:border-gray-600"
              onClick={() => handleProblemChange(true)}
              aria-label="Next problem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.github.com/shreyanshxyz/codeit"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-dark-layer-1 hover:bg-dark-fill-2 py-1.5 px-3 cursor-pointer rounded-lg text-gray-400 hover:text-gray-200 transition-all duration-200 text-sm border border-dark-divide-border hover:border-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
