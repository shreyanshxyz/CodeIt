"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  LuChevronDown,
  LuGithub,
  LuLogOut,
  LuUser,
} from "react-icons/lu";

export type TopbarActive = "problems" | "leaderboard" | "achievements";

type TopbarProps = {
  active?: TopbarActive;
};

const NAV_LINKS: { href: string; label: string; id: TopbarActive }[] = [
  { href: "/", label: "Problems", id: "problems" },
  { href: "/leaderboard", label: "Leaderboard", id: "leaderboard" },
  { href: "/achievements", label: "Achievements", id: "achievements" },
];

const Topbar: React.FC<TopbarProps> = ({ active }) => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const handleSignOut = () => {
    setMenuOpen(false);
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="flex h-14 w-full shrink-0 items-center border-b border-dark-divide-border bg-dark-layer-2 px-4 sm:px-6">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6 sm:gap-8">
          <Link
            href="/"
            className="shrink-0 text-[15px] font-semibold tracking-tight text-text-primary no-underline transition-colors hover:text-accent-green"
          >
            CodeIt
          </Link>

          <div className="flex items-stretch gap-1 sm:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex h-14 items-center px-2.5 text-sm font-medium no-underline transition-colors sm:px-3 ${
                    isActive
                      ? "text-text-primary"
                      : "text-dark-gray-7 hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2.5 bottom-0 h-0.5 rounded-full bg-accent-green sm:inset-x-3"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div
            aria-hidden
            className="hidden h-5 w-px bg-dark-divide-border sm:block"
          />

          {session?.user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="flex items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-dark-fill-2 focus-visible:outline-none"
              >
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt=""
                    className="h-7 w-7 rounded-full object-cover ring-1 ring-border-subtle"
                  />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-dark-fill-2 ring-1 ring-border-subtle">
                    <LuUser className="h-3.5 w-3.5 text-dark-gray-7" aria-hidden />
                  </span>
                )}
                <span className="hidden max-w-[140px] truncate text-sm font-medium text-text-primary sm:inline">
                  {session.user.name}
                </span>
                <LuChevronDown
                  className={`hidden h-3.5 w-3.5 text-dark-gray-7 transition-transform sm:inline ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-dark-divide-border bg-dark-layer-2 py-1 shadow-xl shadow-black/40"
                >
                  <div className="border-b border-dark-divide-border px-3 py-2 sm:hidden">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {session.user.name}
                    </p>
                    {session.user.email && (
                      <p className="truncate text-xs text-dark-gray-7">
                        {session.user.email}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/profile/${session.user.id}`}
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-text-secondary no-underline transition-colors hover:bg-dark-fill-2 hover:text-text-primary"
                  >
                    <LuUser className="h-3.5 w-3.5" aria-hidden />
                    Profile
                  </Link>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm text-text-secondary transition-colors hover:bg-dark-fill-2 hover:text-text-primary"
                  >
                    <LuLogOut className="h-3.5 w-3.5" aria-hidden />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/shreyanshxyz/codeit"
                target="_blank"
                rel="noreferrer"
                aria-label="View on GitHub"
                title="GitHub"
                className="hidden h-8 w-8 items-center justify-center rounded-md text-dark-gray-7 no-underline transition-colors hover:bg-dark-fill-2 hover:text-text-primary md:inline-flex"
              >
                <LuGithub className="h-4 w-4" aria-hidden />
              </a>

              <Link
                href="/auth/signin"
                className="inline-flex h-8 items-center justify-center rounded-md bg-accent-green px-4 text-sm font-medium text-[#0a0a0a] no-underline transition-colors hover:bg-accent-green-hover"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
