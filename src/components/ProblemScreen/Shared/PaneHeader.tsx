import { Difficulty } from "@/utils/types/problem";

interface PaneHeaderProps {
  title: string;
  difficulty?: Difficulty;
  category?: string;
  actions?: React.ReactNode;
}

export function PaneHeader({
  title,
  difficulty,
  category,
  actions,
}: PaneHeaderProps) {
  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case "Easy":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "Hard":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-dark-layer-2 border-b border-dark-divide-border">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-gray-200 truncate">
          {title}
        </h2>
        {difficulty && (
          <span
            className={`text-xs font-medium ${getDifficultyColor(difficulty)}`}
          >
            {difficulty}
          </span>
        )}
        {category && (
          <span className="text-xs text-gray-500 bg-dark-layer-1 px-2 py-0.5 rounded">
            {category}
          </span>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
