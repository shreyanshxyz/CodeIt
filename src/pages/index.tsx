import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import ProblemFilters from "@/components/ProblemFilters/ProblemFilters";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import { api } from "@/lib/api/client";
import { useState, useEffect, useCallback, useMemo } from "react";

type Difficulty = 'Easy' | 'Medium' | 'Hard';

export default function Home() {
  const hasMounted = useHasMounted();

  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'order' | 'difficulty' | 'acceptance'>('order');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [resultsCount, setResultsCount] = useState(0);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await api.getProblemFilters();
        if (response.success) {
          setCategories(response.data.categories);
          setTags(response.data.tags);
        }
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    };
    fetchFilterOptions();
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setDifficulty(null);
    setCategory(null);
    setTag(null);
    setSortBy('order');
    setSortOrder('asc');
  }, []);

  const handleResultsCount = useCallback((count: number) => {
    setResultsCount(count);
  }, []);

  const filters = useMemo(() => ({
    search: search || undefined,
    difficulty,
    category,
    tag,
    sortBy,
    sortOrder,
  }), [search, difficulty, category, tag, sortBy, sortOrder]);

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-dark-layer-1 flex flex-col">
      <Topbar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center gap-4 sm:gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs sm:text-sm text-gray-400">Solved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              <span className="text-xs sm:text-sm text-gray-400">Attempted</span>
            </div>
          </div>

          <ProblemFilters
            search={search}
            setSearch={setSearch}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            category={category}
            setCategory={setCategory}
            tag={tag}
            setTag={setTag}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            onClearFilters={handleClearFilters}
            categories={categories}
            tags={tags}
            resultsCount={resultsCount}
          />

          <ProblemsTable
            filters={filters}
            onResultsCount={handleResultsCount}
          />
        </div>
      </main>
    </div>
  );
};
