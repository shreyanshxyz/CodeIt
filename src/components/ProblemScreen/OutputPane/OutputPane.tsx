import { useState, ReactNode } from "react";
import { PaneHeader } from "../Shared/PaneHeader";

type TabType = "results" | "console" | "output";

interface TestResult {
  id: number;
  status: "pass" | "fail";
  input: string;
  output: string;
  expected: string;
  runtime?: string;
}

interface OutputPaneProps {
  results?: TestResult[];
  consoleOutput?: string[];
  stdout?: string;
  isRunning?: boolean;
}

export function OutputPane({
  results,
  consoleOutput,
  stdout,
  isRunning,
}: OutputPaneProps) {
  const [activeTab, setActiveTab] = useState<TabType>("results");

  const tabs: { id: TabType; label: string; icon: ReactNode }[] = [
    {
      id: "results",
      label: "Test Results",
      icon: (
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
      ),
    },
    {
      id: "console",
      label: "Console",
      icon: (
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
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "output",
      label: "Output",
      icon: (
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
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      ),
    },
  ];

  const hasResults = results && results.length > 0;
  const passedCount = results?.filter((r) => r.status === "pass").length || 0;
  const allPassed = hasResults && passedCount === results?.length;

  return (
    <div className="h-full flex flex-col bg-dark-layer-2 rounded-lg overflow-hidden border border-dark-divide-border">
      <PaneHeader
        title="Output"
        actions={
          <button
            className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-fill-2 rounded transition-colors"
            title="Clear Output"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        }
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
            {tab.icon}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isRunning ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-3 text-gray-400">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Running tests...</span>
            </div>
          </div>
        ) : activeTab === "results" ? (
          hasResults ? (
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-dark-layer-1 rounded-lg border border-dark-divide-border">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-full ${allPassed ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                  >
                    {allPassed ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-gray-300 font-medium">
                    {allPassed
                      ? "All test cases passed!"
                      : `${passedCount}/${results?.length} test cases passed`}
                  </span>
                </div>
              </div>

              {results?.map((result) => (
                <div
                  key={result.id}
                  className="p-3 bg-dark-layer-1 rounded-lg border border-dark-divide-border hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex items-center justify-center w-5 h-5 rounded-full text-xs ${result.status === "pass" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                      >
                        {result.status === "pass" ? "✓" : "✗"}
                      </span>
                      <span className="text-xs text-gray-300 font-medium">
                        Case {result.id}
                      </span>
                    </div>
                    {result.runtime && (
                      <span className="text-xs text-gray-500 bg-dark-fill-2 px-2 py-0.5 rounded">
                        {result.runtime}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-gray-500">Input:</span>
                      <span className="text-gray-300 font-mono">
                        {result.input}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-gray-500">Output:</span>
                      <span
                        className={`${result.status === "pass" ? "text-green-400" : "text-red-400"} font-mono`}
                      >
                        {result.output}
                      </span>
                    </div>
                    {result.status === "fail" && (
                      <div className="flex flex-wrap gap-1">
                        <span className="text-gray-500">Expected:</span>
                        <span className="text-green-400 font-mono">
                          {result.expected}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>No test results yet</p>
              <p className="text-xs text-gray-500 mt-2">
                Run your code to see results
              </p>
            </div>
          )
        ) : activeTab === "console" ? (
          consoleOutput && consoleOutput.length > 0 ? (
            <div className="font-mono text-xs space-y-1">
              {consoleOutput.map((line, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-green-400"
                >
                  <span className="text-gray-500">{">"}</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
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
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p>No console output</p>
            </div>
          )
        ) : stdout ? (
          <div className="space-y-3">
            <div className="text-xs text-gray-500 font-medium">
              Standard Output
            </div>
            <div className="p-3 bg-dark-layer-1 rounded-lg border border-dark-divide-border font-mono text-xs text-gray-300">
              {stdout}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <p>No output</p>
          </div>
        )}
      </div>

      {hasResults && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-dark-layer-1 border-t border-dark-divide-border text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${allPassed ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <span className={allPassed ? "text-green-500" : "text-red-500"}>
                {passedCount}/{results?.length} passed
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
