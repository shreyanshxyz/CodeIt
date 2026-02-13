'use client';

import React, { useEffect, useState } from 'react';
import Topbar from '@/components/Topbar/Topbar';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import StatsCard from '@/components/Profile/StatsCard';
import AchievementSummary from '@/components/Profile/AchievementSummary';
import SubmissionHistory from '@/components/Profile/SubmissionHistory';
import { api } from '@/lib/api/client';
import { useSession } from 'next-auth/react';

interface UserProfileData {
  user: {
    id: string;
    name: string;
    email: string;
    avatar_url: string | null;
    github_username: string | null;
    role: 'user' | 'admin';
    created_at: string;
  };
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
  recentSubmissions: Array<{
    id: string;
    problem_id: string;
    code: string;
    language: string;
    status: 'pending' | 'accepted' | 'rejected' | 'error';
    execution_time_ms: number | null;
    memory_used_mb: number | null;
    test_cases_passed: number | null;
    total_test_cases: number | null;
    error_message: string | null;
    created_at: string;
  }>;
}

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  React.useEffect(() => {
    const getParams = async () => {
      const { id } = await params;
      setUserId(id);
      setIsOwnProfile(session?.user?.id === id);
    };
    getParams();
  }, [params, session?.user?.id]);

  useEffect(() => {
    if (!userId) return;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getUser(userId);
        if (response.success) {
          setProfile(response.data);
        } else {
          setError('Failed to load profile');
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!userId) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-layer-1">
        <Topbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="space-y-6">
            <div className="h-32 bg-dark-layer-2 rounded-lg animate-pulse" />
            <div className="h-24 bg-dark-layer-2 rounded-lg animate-pulse" />
            <div className="h-64 bg-dark-layer-2 rounded-lg animate-pulse" />
            <div className="h-80 bg-dark-layer-2 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-dark-layer-1">
        <Topbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-dark-layer-2 rounded-lg border border-dark-divide-border p-8 text-center">
            <div className="text-red-400">{error || 'Profile not found'}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-layer-1">
      <Topbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <ProfileHeader
          user={profile.user}
          isOwnProfile={isOwnProfile}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-1">
            <StatsCard stats={profile.stats} />
          </div>

          <div className="lg:col-span-2">
            <AchievementSummary
              achievements={profile.achievements}
              userId={userId}
            />
          </div>
        </div>

        <div className="mt-6">
          <SubmissionHistory submissions={profile.recentSubmissions} />
        </div>
      </div>
    </div>
  );
}
