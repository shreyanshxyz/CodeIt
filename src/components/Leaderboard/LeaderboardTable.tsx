'use client';

import React from 'react';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar_url: string | null;
  solvedCount: number;
  totalSubmissions: number;
  successRate: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  loading: boolean;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries, loading }) => {
  if (loading) {
    return (
      <div className="bg-dark-layer-2 rounded-lg border border-dark-divide-border p-8 text-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-dark-layer-2 rounded-lg border border-dark-divide-border p-8 text-center">
        <div className="text-gray-400">No entries yet. Be the first to solve problems!</div>
      </div>
    );
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-gray-400';
  };

  return (
    <div className="bg-dark-layer-2 rounded-lg border border-dark-divide-border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-divide-border">
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rank</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">User</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Solved</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Success Rate</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.userId}
              className="border-b border-dark-divide-border hover:bg-dark-fill-2 transition-colors"
            >
              <td className="px-6 py-4">
                <span className={`font-bold ${getRankColor(entry.rank)}`}>
                  {getRankBadge(entry.rank)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {entry.avatar_url ? (
                    <img
                      src={entry.avatar_url}
                      alt={entry.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-dark-layer-1 flex items-center justify-center text-gray-400 font-medium">
                      {entry.name[0].toUpperCase()}
                    </div>
                  )}
                  <Link
                    href={`/profile/${entry.userId}`}
                    className="text-gray-200 hover:text-white transition-colors"
                  >
                    {entry.name}
                  </Link>
                </div>
              </td>
              <td className="px-6 py-4 text-right text-green-400 font-semibold">
                {entry.solvedCount}
              </td>
              <td className="px-6 py-4 text-right text-gray-400">
                {entry.successRate.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
