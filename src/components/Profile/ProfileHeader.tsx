'use client';

import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import EditProfileModal from './EditProfileModal';

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar_url: string | null;
    github_username: string | null;
    role: 'user' | 'admin';
    created_at: string;
  };
  isOwnProfile: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isOwnProfile }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 bg-dark-layer-2 rounded-lg border border-dark-divide-border">
        <div className="relative">
          <img
            src={
              user.avatar_url ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
            }
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-dark-divide-border"
          />
          {isOwnProfile && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute -bottom-2 -right-2 bg-accent-green hover:bg-accent-green-hover text-white p-1.5 rounded-full transition-colors"
            >
              <FaEdit className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            {user.role === 'admin' && (
              <span className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                Admin
              </span>
            )}
          </div>

          <p className="text-gray-400 mb-2">{user.email}</p>

          {user.github_username && (
            <p className="text-gray-400 mb-2">
              GitHub: {user.github_username}
            </p>
          )}

          <p className="text-gray-500 text-sm">
            Member since {formatDate(user.created_at)}
          </p>
        </div>

        {isOwnProfile && (
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="md:hidden bg-accent-green hover:bg-accent-green-hover text-white px-4 py-2 rounded-lg transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProfileHeader;
