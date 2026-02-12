'use client';

import React, { useEffect, useState } from 'react';
import Topbar from '@/components/Topbar/Topbar';
import AchievementGrid from '@/components/Achievements/AchievementGrid';
import { api } from '@/lib/api/client';

type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

interface EarnedAchievement {
  id: number;
  user_id: string;
  achievement_type: string;
  achieved_at: string;
  metadata: Record<string, unknown> | null;
  definition: {
    id: string;
    name: string;
    description: string;
    icon: string;
    rarity: AchievementRarity;
  };
}

interface LockedAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
}

export default function AchievementsPage() {
  const [earned, setEarned] = useState<EarnedAchievement[]>([]);
  const [locked, setLocked] = useState<LockedAchievement[]>([]);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalPossible, setTotalPossible] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getAchievements();
        if (response.success) {
          setEarned(response.data.earned as EarnedAchievement[]);
          setLocked(response.data.locked as LockedAchievement[]);
          setTotalEarned(response.data.totalEarned);
          setTotalPossible(response.data.totalPossible);
        }
      } catch (err) {
        console.error('Failed to fetch achievements:', err);
        setError('Failed to load achievements');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className="min-h-screen bg-dark-layer-1">
      <Topbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Achievements
          </h1>
          <p className="text-gray-400">
            Track your progress and earn badges
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="h-8 bg-dark-fill-2 rounded-lg w-1/4 animate-pulse" />
            <div className="h-2 bg-dark-fill-2 rounded-full animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-dark-fill-2 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="bg-dark-layer-2 rounded-lg border border-dark-divide-border p-8 text-center">
            <span className="text-red-400">{error}</span>
          </div>
        ) : (
          <AchievementGrid
            earned={earned}
            locked={locked}
            totalEarned={totalEarned}
            totalPossible={totalPossible}
          />
        )}
      </div>
    </div>
  );
}
