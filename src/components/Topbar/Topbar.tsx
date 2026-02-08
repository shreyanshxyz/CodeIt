import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList, BsGithub } from "react-icons/bs";
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
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-black-pure border-b border-border-subtle">
      <div
        className={`flex w-full items-center justify-between ${
          !problemPage ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <Link
          href="/"
          className="h-[22px] flex-1 flex items-center gap-2 group"
        >
          <span className="text-text-primary font-bold text-lg tracking-tight">
            CodeIt
          </span>
        </Link>

        {problemPage && (
          <div className="flex items-center gap-2 flex-1 justify-center">
            <button
              className="flex items-center justify-center rounded bg-black-surface hover:bg-black-hover h-8 w-8 cursor-pointer transition-all duration-150"
              onClick={() => handleProblemChange(false)}
              aria-label="Previous problem"
            >
              <FaChevronLeft className="text-text-secondary" />
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-text-secondary hover:text-text-primary cursor-pointer transition-all duration-150"
            >
              <BsList className="text-lg" />
              <span className="text-sm">Problem List</span>
            </Link>
            <button
              className="flex items-center justify-center rounded bg-black-surface hover:bg-black-hover h-8 w-8 cursor-pointer transition-all duration-150"
              onClick={() => handleProblemChange(true)}
              aria-label="Next problem"
            >
              <FaChevronRight className="text-text-secondary" />
            </button>
          </div>
        )}

        <div className="flex items-center space-x-4 flex-1 justify-end">
          <a
            href="https://www.github.com/shreyanshxyz/codeit"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-black-surface hover:bg-black-hover py-1.5 px-3 cursor-pointer rounded text-text-secondary hover:text-text-primary transition-all duration-150 text-sm"
          >
            <BsGithub className="text-base" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
