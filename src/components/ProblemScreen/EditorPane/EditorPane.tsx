import { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Problem } from "@/utils/types/problem";
import { PaneHeader } from "../Shared/PaneHeader";

interface EditorPaneProps {
  problem: Problem;
}

export function EditorPane({ problem }: EditorPaneProps) {
  const [code, setCode] = useState(problem.starterCode);
  const [language, setLanguage] = useState("javascript");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
  ];

  const handleRun = useCallback(() => {
    setIsRunning(true);
    console.log("Running code:", code);
    // TODO: Implement run logic
    setTimeout(() => setIsRunning(false), 1000);
  }, [code]);

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    console.log("Submitting code:", code);
    // TODO: Implement submit logic
    setTimeout(() => setIsSubmitting(false), 1000);
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(problem.starterCode);
  }, [problem.starterCode]);

  const onChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  return (
    <div className="h-full flex flex-col bg-dark-layer-2 rounded-lg overflow-hidden border border-dark-divide-border">
      <PaneHeader
        title="Code Editor"
        actions={
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-dark-layer-1 text-gray-300 text-xs px-2 py-1 rounded border border-dark-divide-border focus:outline-none focus:border-green-500 cursor-pointer hover:border-gray-500 transition-colors"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleReset}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-fill-2 rounded transition-colors"
              title="Reset Code"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 flex items-center gap-1.5
                ${
                  isRunning
                    ? "bg-dark-fill-2 text-gray-400 cursor-not-allowed"
                    : "text-gray-300 bg-dark-layer-1 hover:bg-dark-fill-2 border border-dark-divide-border hover:border-gray-500"
                }
              `}
            >
              {isRunning ? (
                <>
                  <svg
                    className="animate-spin h-3 w-3"
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
                  Running...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
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
                  Run
                </>
              )}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 flex items-center gap-1.5
                ${
                  isSubmitting
                    ? "bg-green-700 text-gray-200 cursor-not-allowed"
                    : "text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-3 w-3"
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
                  Submitting...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
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
                  Submit
                </>
              )}
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={code}
          height="100%"
          extensions={[javascript()]}
          onChange={onChange}
          theme="dark"
          className="h-full text-sm cm-editor-dark"
          style={{ height: "100%", fontSize: "14px" }}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-1.5 bg-dark-layer-1 border-t border-dark-divide-border text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>Ln 1, Col 1</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">{language}</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  );
}
