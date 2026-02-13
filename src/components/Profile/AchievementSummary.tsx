'use client';

import React from 'react';
import Link from 'next/link';
import AchievementBadge from '@/components/Achievements/AchievementBadge';
import { FaAward, FaChevronRight } from 'react-icons/fa';

interface AchievementSummaryProps {
  achievements: Array<{
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
      rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    };
  }>;
  userId: string;
}

const AchievementSummary: React.FC<AchievementSummaryProps> = ({
  achievements,
  userId,
}) => {
  const recentAchievements = [...achievements].sort(
    (a, b) => new Date(b.achieved_at).getTime() - new Date(a.achieved_at).getTime()
  ).slice(0, 5);

  return (
    <div className="p-6 bg-dark-layer-2 rounded-lg border border-dark-divide-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FaAward className="text-yellow-400" />
          Recent Achievements
        </h3>
        <Link
          href="/achievements"
          className="text-sm text-gray-400 hover:text-gray-200 flex items-center gap-1"
        >
          View All <FaChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-8">
          <FaAward className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No achievements yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Solve problems to earn badges
          </p>
        </div>
      ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="flex flex-col items-center">
              <AchievementBadge
                icon={achievement.definition.icon}
                name={achievement.definition.name}
                description={achievement.definition.description}
                rarity={achievement.definition.rarity}
                achievedAt={achievement.achieved_at}
              />
              <span className="text-xs text-gray-400 mt-1 text-center">
                {achievement.definition.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementSummary;
