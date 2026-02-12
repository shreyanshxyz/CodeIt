'use client';

import React from 'react';
import {
  FaBullseye,
  FaRocket,
  FaFire,
  FaStar,
  FaGem,
  FaCrown,
  FaCheckCircle,
  FaMagic,
  FaShieldAlt,
} from 'react-icons/fa';

type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

interface AchievementBadgeProps {
  icon: string;
  iconColor?: string;
  name: string;
  description: string;
  rarity: AchievementRarity;
  achievedAt?: string | null;
  isLocked?: boolean;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FaBullseye,
  FaRocket,
  FaFire,
  FaStar,
  FaGem,
  FaCrown,
  FaCheckCircle,
  FaMagic,
  FaShieldAlt,
};

const rarityStyles: Record<AchievementRarity, { border: string; bg: string; glow: string }> = {
  common: {
    border: 'border-gray-500',
    bg: 'bg-gray-900/50',
    glow: '',
  },
  uncommon: {
    border: 'border-green-500',
    bg: 'bg-green-900/20',
    glow: 'shadow-green-500/20',
  },
  rare: {
    border: 'border-blue-500',
    bg: 'bg-blue-900/20',
    glow: 'shadow-blue-500/20',
  },
  epic: {
    border: 'border-purple-500',
    bg: 'bg-purple-900/20',
    glow: 'shadow-purple-500/30',
  },
  legendary: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-900/20',
    glow: 'shadow-yellow-500/40',
  },
};

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  icon,
  iconColor,
  name,
  description,
  rarity,
  achievedAt,
  isLocked = false,
}) => {
  const styles = rarityStyles[rarity];
  const IconComponent = ICON_MAP[icon] || FaStar;

  return (
    <div
      className={`
        relative flex flex-col items-center p-4 rounded-lg border-2
        ${isLocked ? 'border-gray-700 bg-gray-900/30 opacity-50' : `${styles.border} ${styles.bg}`}
        ${!isLocked ? `shadow-lg ${styles.glow}` : ''}
        transition-all duration-200 hover:scale-105
      `}
    >
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      )}

      <IconComponent
        className={`text-4xl mb-2 ${iconColor || (isLocked ? 'text-gray-600' : 'text-gray-200')} ${
          isLocked ? 'grayscale' : ''
        }`}
      />

      <h3 className={`text-sm font-semibold text-center ${isLocked ? 'text-gray-500' : 'text-gray-200'}`}>
        {name}
      </h3>

      <p className={`text-xs text-center mt-1 ${isLocked ? 'text-gray-600' : 'text-gray-400'}`}>
        {description}
      </p>

      {achievedAt && !isLocked && (
        <span className="text-xs text-green-400 mt-2">
          Earned {new Date(achievedAt).toLocaleDateString()}
        </span>
      )}

      <span
        className={`
          absolute top-2 right-2 px-1.5 py-0.5 text-[10px] font-medium rounded uppercase
          ${rarity === 'common' ? 'bg-gray-700 text-gray-300' : ''}
          ${rarity === 'uncommon' ? 'bg-green-900/50 text-green-300' : ''}
          ${rarity === 'rare' ? 'bg-blue-900/50 text-blue-300' : ''}
          ${rarity === 'epic' ? 'bg-purple-900/50 text-purple-300' : ''}
          ${rarity === 'legendary' ? 'bg-yellow-900/50 text-yellow-300' : ''}
        `}
      >
        {rarity}
      </span>
    </div>
  );
};

export default AchievementBadge;
