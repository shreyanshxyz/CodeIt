"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { FaGithub, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleProblemChange = (isForward: boolean) => {
    const currentProblem = problems[router.query.pid as string] as Problem;
    if (!currentProblem?.order) {
      return;
    }

    const direction = isForward ? 1 : -1;
    const nextProblemOrder = currentProblem.order + direction;
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

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
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

        <div className="flex items-center gap-3">
          {session?.user ? (
            <div className="flex items-center gap-2">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="h-8 w-8 text-gray-400" />
              )}

              <span className="text-sm text-gray-300 max-w-[150px] truncate">
                {session.user.name}
              </span>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-400 hover:text-gray-200 hover:bg-dark-layer-1 rounded-lg transition-colors"
              >
                <FaSignOutAlt className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <a
                href="https://www.github.com/shreyanshxyz/codeit"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-dark-layer-1 hover:bg-dark-fill-2 py-1.5 px-3 cursor-pointer rounded-lg text-gray-400 hover:text-gray-200 transition-all duration-200 text-sm border border-dark-divide-border hover:border-gray-600"
              >
                <FaGithub className="h-4 w-4" />
                <span>GitHub</span>
              </a>

              <Link
                href="/auth/signin"
                className="flex items-center gap-2 bg-accent-green hover:bg-accent-green-hover text-white py-1.5 px-3 rounded-lg transition-colors text-sm font-medium"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
