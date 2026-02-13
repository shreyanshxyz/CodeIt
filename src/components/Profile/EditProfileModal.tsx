'use client';

import React, { useState } from 'react';
import { FaTimes, FaUser, FaImage } from 'react-icons/fa';
import { api } from '@/lib/api/client';
import { toast } from 'react-toastify';

interface EditProfileModalProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar_url: string | null;
    github_username: string | null;
    role: 'user' | 'admin';
    created_at: string;
  };
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    avatar_url: user.avatar_url || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.updateUser(user.id, formData);
      if (response.success) {
        toast.success('Profile updated successfully');
        onClose();
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-layer-2 rounded-lg border border-dark-divide-border w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-dark-divide-border">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaUser className="inline-block w-4 h-4 mr-1" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              disabled={isLoading}
              className="w-full px-3 py-2 bg-dark-fill-2 border border-dark-divide-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaImage className="inline-block w-4 h-4 mr-1" />
              Avatar URL
            </label>
            <input
              type="url"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              disabled={isLoading}
              className="w-full px-3 py-2 bg-dark-fill-2 border border-dark-divide-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-green"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to use default avatar
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-dark-fill-2 text-gray-400 hover:text-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-accent-green hover:bg-accent-green-hover text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
