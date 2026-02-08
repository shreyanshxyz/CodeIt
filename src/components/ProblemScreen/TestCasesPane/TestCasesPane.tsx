import { useState } from "react";
import { Problem } from "@/utils/types/problem";
import { PaneHeader } from "../Shared/PaneHeader";

interface TestCasesPaneProps {
  problem: Problem;
}

export function TestCasesPane({ problem }: TestCasesPaneProps) {
  const [activeCase, setActiveCase] = useState(0);

  const testCases =
    problem.examples?.length > 0
      ? problem.examples
      : [{ id: 1, inputText: "No test cases available", outputText: "" }];

  return (
    <div className="h-full flex flex-col bg-dark-layer-2 rounded-lg overflow-hidden border border-dark-divide-border">
      <PaneHeader
        title="Test Cases"
        actions={
          <button className="flex items-center gap-1 text-xs text-green-500 hover:text-green-400 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Custom
          </button>
        }
      />

      <div className="flex items-center gap-1 px-3 py-2 bg-dark-layer-1 border-b border-dark-divide-border overflow-x-auto">
        {testCases.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCase(index)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 whitespace-nowrap flex items-center gap-1.5
              ${
                activeCase === index
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                  : "text-gray-400 hover:text-gray-200 bg-dark-layer-2 hover:bg-dark-fill-2 border border-dark-divide-border"
              }
            `}
          >
            {activeCase === index && (
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            )}
            Case {index + 1}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {testCases[activeCase] && (
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Input:
              </label>
              <div className="p-3 bg-dark-layer-1 rounded-lg border border-dark-divide-border font-mono text-xs text-gray-300 hover:border-gray-600 transition-colors">
                {testCases[activeCase].inputText}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Expected Output:
              </label>
              <div className="p-3 bg-dark-layer-1 rounded-lg border border-dark-divide-border font-mono text-xs text-green-400 hover:border-gray-600 transition-colors">
                {testCases[activeCase].outputText}
              </div>
            </div>

            {testCases[activeCase].explanation && (
              <div>
                <label className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Explanation:
                </label>
                <div className="p-3 bg-dark-layer-1 rounded-lg border border-dark-divide-border text-xs text-gray-400 hover:border-gray-600 transition-colors">
                  {testCases[activeCase].explanation}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 px-4 py-3 bg-dark-layer-1 border-t border-dark-divide-border">
        <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-dark-fill-2 rounded transition-all duration-200 flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset
        </button>
        <button className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded transition-all duration-200 shadow-lg shadow-green-600/20 flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Run Tests
        </button>
      </div>
    </div>
  );
}
