import { useState } from "react";
import { Problem } from "@/utils/types/problem";
import { PaneHeader } from "../Shared/PaneHeader";

interface ProblemInfoPaneProps {
  problem: Problem;
}

type TabType = "description" | "examples" | "constraints" | "hints";

export function ProblemInfoPane({ problem }: ProblemInfoPaneProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const tabs: { id: TabType; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "examples", label: "Examples" },
    { id: "constraints", label: "Constraints" },
    { id: "hints", label: "Hints" },
  ];

  return (
    <div className="h-full flex flex-col bg-dark-layer-2 rounded-lg overflow-hidden border border-dark-divide-border">
      <PaneHeader
        title={problem.title}
        difficulty={problem.difficulty}
        category={problem.category}
      />

      <div className="flex border-b border-dark-divide-border bg-dark-layer-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-all duration-200 relative
              ${
                activeTab === tab.id
                  ? "text-green-500 bg-dark-layer-2"
                  : "text-gray-400 hover:text-gray-200 hover:bg-dark-fill-2"
              }
            `}
          >
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 text-gray-300 text-sm leading-relaxed">
        {activeTab === "description" && (
          <div className="space-y-4">
            <div
              className="prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
            />

            {(problem.acceptanceRate || problem.totalSubmissions) && (
              <div className="flex gap-4 pt-4 border-t border-dark-divide-border">
                {problem.acceptanceRate && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">Acceptance:</span>
                    <span className="text-green-500 font-medium">
                      {problem.acceptanceRate}%
                    </span>
                  </div>
                )}
                {problem.totalSubmissions && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">Submissions:</span>
                    <span className="text-gray-300">
                      {problem.totalSubmissions}
                    </span>
                  </div>
                )}
              </div>
            )}

            {problem.tags && problem.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {problem.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-dark-layer-1 text-green-400 rounded border border-dark-divide-border hover:border-green-500/50 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "examples" && (
          <div className="space-y-4">
            {problem.examples?.map((example, index) => (
              <div
                key={index}
                className="p-4 bg-dark-layer-1 rounded-lg border border-dark-divide-border hover:border-dark-fill-2 transition-colors"
              >
                <p className="text-xs text-gray-500 mb-3 font-medium">
                  Example {index + 1}:
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-xs">Input: </span>
                    <code className="text-green-400 text-xs bg-dark-fill-2 px-1.5 py-0.5 rounded">
                      {example.inputText}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs">Output: </span>
                    <code className="text-green-400 text-xs bg-dark-fill-2 px-1.5 py-0.5 rounded">
                      {example.outputText}
                    </code>
                  </div>
                  {example.explanation && (
                    <div className="text-gray-400 text-xs mt-2 pt-2 border-t border-dark-divide-border">
                      <span className="text-gray-500">Explanation: </span>
                      {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "constraints" && (
          <div className="space-y-2">
            {Array.isArray(problem.constraints) ? (
              problem.constraints.map((constraint: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-2 bg-dark-layer-1 rounded border border-dark-divide-border"
                >
                  <span className="text-green-500 mt-0.5">•</span>
                  <code className="text-gray-300 text-xs">{constraint}</code>
                </div>
              ))
            ) : (
              <div
                className="text-gray-300 text-xs space-y-2"
                dangerouslySetInnerHTML={{ __html: problem.constraints }}
              />
            )}
          </div>
        )}

        {activeTab === "hints" && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mb-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <p>No hints available for this problem.</p>
            <p className="text-xs text-gray-500 mt-2">
              Try solving it on your own!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
