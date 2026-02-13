'use client';

import React from 'react';

interface StatsCardProps {
  stats: {
    total: number;
    solved: number;
    inProgress: number;
    notStarted: number;
    solvedByDifficulty: {
      easy: number;
      medium: number;
      hard: number;
    };
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-dark-layer-2 rounded-lg border border-dark-divide-border">
      <div className="text-center">
        <div className="text-2xl font-bold text-white mb-1">
          {stats.solved}
        </div>
        <div className="text-sm text-gray-400">Problems Solved</div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-green-400 mb-1">
          {stats.solvedByDifficulty.easy}
        </div>
        <div className="text-sm text-gray-400">Easy</div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-yellow-400 mb-1">
          {stats.solvedByDifficulty.medium}
        </div>
        <div className="text-sm text-gray-400">Medium</div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-red-400 mb-1">
          {stats.solvedByDifficulty.hard}
        </div>
        <div className="text-sm text-gray-400">Hard</div>
      </div>
    </div>
  );
};

export default StatsCard;
