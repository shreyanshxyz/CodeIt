'use client';

import React, { useEffect, useState } from 'react';
import Topbar from '@/components/Topbar/Topbar';
import LeaderboardTable from '@/components/Leaderboard/LeaderboardTable';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar_url: string | null;
  solvedCount: number;
  totalSubmissions: number;
  successRate: number;
}

export const dynamic = 'force-dynamic';

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/leaderboard?page=${page}&limit=20`);
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const json = await response.json();
        if (json.success) {
          setEntries(json.data);
          setTotalPages(json.pagination.totalPages);
        } else {
          throw new Error(json.error || 'Failed to fetch leaderboard');
        }
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-dark-layer-1">
      <Topbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-400">
            Top performers ranked by problems solved
          </p>
        </div>

        {error ? (
          <div className="bg-dark-layer-2 rounded-lg border border-dark-divide-border p-8 text-center">
            <div className="text-red-400">{error}</div>
          </div>
        ) : (
          <LeaderboardTable entries={entries} loading={loading} />
        )}

        {totalPages > 1 && !loading && !error && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                page === 1
                  ? 'bg-dark-layer-1 text-gray-500 cursor-not-allowed'
                  : 'bg-dark-layer-1 text-gray-300 hover:bg-dark-fill-2 border border-dark-divide-border'
              }`}
            >
              Previous
            </button>
            <span className="text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                page === totalPages
                  ? 'bg-dark-layer-1 text-gray-500 cursor-not-allowed'
                  : 'bg-dark-layer-1 text-gray-300 hover:bg-dark-fill-2 border border-dark-divide-border'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
