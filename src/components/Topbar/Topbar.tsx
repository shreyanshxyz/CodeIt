"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaGithub, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="flex h-[50px] w-full shrink-0 items-center px-4 bg-dark-layer-2 border-b border-dark-divide-border">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-gray-200 font-bold text-lg tracking-tight group-hover:text-green-400 transition-colors">
            CodeIt
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/leaderboard"
            className="flex items-center gap-2 bg-dark-layer-1 hover:bg-dark-fill-2 py-1.5 px-3 cursor-pointer rounded-lg text-gray-400 hover:text-gray-200 transition-all duration-200 text-sm border border-dark-divide-border hover:border-gray-600"
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span>Leaderboard</span>
          </Link>

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
