'use client';

import React from 'react';
import AchievementBadge from './AchievementBadge';

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

interface AchievementGridProps {
  earned: EarnedAchievement[];
  locked: LockedAchievement[];
  totalEarned: number;
  totalPossible: number;
}

const AchievementGrid: React.FC<AchievementGridProps> = ({
  earned,
  locked,
  totalEarned,
  totalPossible,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-200">
          Your Achievements
        </h2>
        <span className="text-sm text-gray-400">
          {totalEarned} / {totalPossible} earned
        </span>
      </div>

      <div className="w-full bg-dark-fill-2 rounded-full h-2">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(totalEarned / totalPossible) * 100}%` }}
        />
      </div>

      {earned.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
            Earned
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {earned.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                icon={achievement.definition.icon}
                name={achievement.definition.name}
                description={achievement.definition.description}
                rarity={achievement.definition.rarity}
                achievedAt={achievement.achieved_at}
              />
            ))}
          </div>
        </div>
      )}

      {locked.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
            Locked
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {locked.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                icon={achievement.icon}
                name={achievement.name}
                description={achievement.description}
                rarity={achievement.rarity}
                isLocked={true}
              />
            ))}
          </div>
        </div>
      )}

      {earned.length === 0 && locked.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No achievements available
        </div>
      )}
    </div>
  );
};

export default AchievementGrid;
