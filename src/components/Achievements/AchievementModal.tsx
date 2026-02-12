'use client';

import React, { useEffect } from 'react';
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

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    iconColor?: string;
    rarity: string;
  }>;
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

const rarityStyles: Record<string, { border: string; bg: string; text: string }> = {
  common: {
    border: 'border-gray-500',
    bg: 'bg-gray-900',
    text: 'text-gray-300',
  },
  uncommon: {
    border: 'border-green-500',
    bg: 'bg-green-900/30',
    text: 'text-green-300',
  },
  rare: {
    border: 'border-blue-500',
    bg: 'bg-blue-900/30',
    text: 'text-blue-300',
  },
  epic: {
    border: 'border-purple-500',
    bg: 'bg-purple-900/30',
    text: 'text-purple-300',
  },
  legendary: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-900/30',
    text: 'text-yellow-300',
  },
};

const AchievementModal: React.FC<AchievementModalProps> = ({
  isOpen,
  onClose,
  achievements,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || achievements.length === 0) return null;

  const currentAchievement = achievements[0];
  const styles = rarityStyles[currentAchievement.rarity];
  const IconComponent = ICON_MAP[currentAchievement.icon] || FaStar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`
          relative z-10 flex flex-col items-center p-8 rounded-xl border-2
          ${styles.border} ${styles.bg}
          shadow-2xl max-w-sm w-full mx-4
          animate-[scale-in_0.3s_ease-out]
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Achievement Unlocked
        </span>

        <IconComponent
          className={`text-6xl mb-4 ${currentAchievement.iconColor || styles.text}`}
        />

        <h2 className={`text-xl font-bold mb-2 ${styles.text}`}>
          {currentAchievement.name}
        </h2>

        <p className="text-gray-400 text-center mb-6">
          {currentAchievement.description}
        </p>

        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          Awesome!
        </button>

        {achievements.length > 1 && (
          <span className="mt-4 text-sm text-gray-500">
            +{achievements.length - 1} more achievement{achievements.length > 2 ? 's' : ''} unlocked
          </span>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AchievementModal;
