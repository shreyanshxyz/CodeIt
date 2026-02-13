'use client';

import React, { useState } from 'react';
import { FaSearch, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface ProblemFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  difficulty: Difficulty | null;
  setDifficulty: (value: Difficulty | null) => void;
  category: string | null;
  setCategory: (value: string | null) => void;
  tag: string | null;
  setTag: (value: string | null) => void;
  sortBy: 'order' | 'difficulty' | 'acceptance';
  setSortBy: (value: 'order' | 'difficulty' | 'acceptance') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (value: 'asc' | 'desc') => void;
  onClearFilters: () => void;
  categories: string[];
  tags: string[];
  resultsCount: number;
}

const ProblemFilters: React.FC<ProblemFiltersProps> = ({
  search,
  setSearch,
  difficulty,
  setDifficulty,
  category,
  setCategory,
  tag,
  setTag,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onClearFilters,
  categories,
  tags,
  resultsCount,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  const hasActiveFilters = search || difficulty || category || tag;

  const handleDifficultyClick = (diff: Difficulty) => {
    setDifficulty(difficulty === diff ? null : diff);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'Easy':
        return 'bg-green-600 text-white border-green-600';
      case 'Medium':
        return 'bg-yellow-600 text-white border-yellow-600';
      case 'Hard':
        return 'bg-red-600 text-white border-red-600';
    }
  };

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 sm:max-w-xs">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-dark-layer-1 border border-dark-divide-border rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:border-green-500 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => handleDifficultyClick(diff)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-colors ${
                difficulty === diff
                  ? getDifficultyColor(diff)
                  : 'bg-dark-layer-1 text-gray-400 hover:text-gray-200 hover:bg-dark-fill-2 border-dark-divide-border'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {categories.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Category</span>
            <select
              value={category || ''}
              onChange={(e) => setCategory(e.target.value || null)}
              className="px-3 py-1.5 text-sm bg-dark-layer-1 border border-dark-divide-border rounded-md text-gray-300 focus:outline-none focus:border-green-500 min-w-[120px]"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">Tag</span>
            <select
              value={tag || ''}
              onChange={(e) => setTag(e.target.value || null)}
              className="px-3 py-1.5 text-sm bg-dark-layer-1 border border-dark-divide-border rounded-md text-gray-300 focus:outline-none focus:border-green-500 min-w-[120px]"
            >
              <option value="">All</option>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Sort</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'order' | 'difficulty' | 'acceptance')}
            className="px-3 py-1.5 text-sm bg-dark-layer-1 border border-dark-divide-border rounded-md text-gray-300 focus:outline-none focus:border-green-500 min-w-[110px]"
          >
            <option value="order">Default</option>
            <option value="difficulty">Difficulty</option>
            <option value="acceptance">Acceptance</option>
          </select>
          <button
            onClick={toggleSortOrder}
            className="p-1.5 bg-dark-layer-1 border border-dark-divide-border rounded-md text-gray-400 hover:text-gray-200 hover:bg-dark-fill-2"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 hover:bg-dark-fill-2 rounded-md border border-dark-divide-border ml-auto"
          >
            <FaTimes className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {resultsCount > 0 && (
        <div className="pt-3 border-t border-dark-divide-border">
          <span className="text-sm text-gray-400">
            {hasActiveFilters ? (
              <>
                Found <span className="text-green-400 font-medium">{resultsCount}</span> problem{resultsCount !== 1 ? 's' : ''}
              </>
            ) : (
              <>
                <span className="text-green-400 font-medium">{resultsCount}</span> problem{resultsCount !== 1 ? 's' : ''} total
              </>
            )}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="mb-6 bg-dark-layer-2 rounded-lg border border-dark-divide-border">
      <div className="p-4 hidden lg:block">
        <FilterContent />
      </div>

      <div className="lg:hidden">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full px-4 py-3 flex items-center justify-between text-gray-300 hover:bg-dark-fill-2 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FaSearch className="text-gray-500" />
            <span className="text-sm font-medium">
              {hasActiveFilters ? 'Filters Active' : 'Search & Filters'}
            </span>
            {hasActiveFilters && (
              <span className="px-2 py-0.5 text-xs bg-green-600 text-white rounded-full">
                {[search && 1, difficulty && 1, category && 1, tag && 1].filter(Boolean).length}
              </span>
            )}
          </div>
          {showMobileFilters ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </button>

        {showMobileFilters && (
          <div className="px-4 pb-4 border-t border-dark-divide-border">
            <FilterContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemFilters;
