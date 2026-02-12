'use client';

import React, { useState, useEffect } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useSession } from 'next-auth/react';
import { api } from '@/lib/api/client';
import AchievementModal from '@/components/Achievements/AchievementModal';

type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

type SubmitMode = 'run' | 'submit';

type NewAchievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: string;
};

const Playground: React.FC<PlaygroundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  let [userCode, setUserCode] = useState<string>(problem.starterCode || '');

  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const { data: session } = useSession();

  const [newAchievements, setNewAchievements] = useState<NewAchievement[]>([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);

  const {
    query: { pid },
  } = useRouter();

  const executeCodeOnClient = (): { success: boolean; passed: number; total: number; error?: string } => {
    try {
      const functionName = problem.starterFunctionName || '';
      const codeToExtract = userCode.slice(userCode.indexOf(functionName));
      const userFunction = new Function(`return ${codeToExtract}`)();

      const handlerCode = problem.handlerFunction;
      const testHandler = eval(`(${handlerCode})`);

      const result = testHandler(userFunction);

      return {
        success: true,
        passed: 1,
        total: 1,
      };
    } catch (error: any) {
      const errorMessage = error.message || String(error);

      if (errorMessage.includes('Test case')) {
        return {
          success: false,
          passed: 0,
          total: 1,
          error: errorMessage,
        };
      }

      return {
        success: false,
        passed: 0,
        total: 1,
        error: errorMessage,
      };
    }
  };

  const handleSubmit = async (mode: SubmitMode = 'run') => {
    const result = executeCodeOnClient();

    if (!session?.user && mode === 'submit') {
      toast.error('Please sign in to submit your solution', {
        position: 'top-center',
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    if (result.success) {
      if (mode === 'run') {
        toast.success("All tests passed!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      }

      if (mode === 'submit') {
        toast.success("Submitting solution...", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });

        try {
          const response = await api.createSubmission({
            problem_id: pid as string,
            code: userCode,
            language: 'javascript',
            test_results: {
              passed: result.passed,
              total: result.total,
            },
          });

          if (response.success && response.data.status === 'accepted') {
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 4000);

            setSolved(true);
            localStorage.setItem(`solved-${pid}`, "true");

            if (response.data.newAchievements && response.data.newAchievements.length > 0) {
              setNewAchievements(response.data.newAchievements);
              setShowAchievementModal(true);
            }
          }
        } catch (error: any) {
          console.error('Submission error:', error);
          toast.error(error.message || 'Failed to submit solution', {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        }
      } else {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
    } else {
      if (mode === 'run') {
        toast.error("One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(result.error || "One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  const handleCloseAchievementModal = () => {
    setShowAchievementModal(false);
    setNewAchievements([]);
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    setUserCode(code ? JSON.parse(code) : problem.starterCode || '');
  }, [pid, problem.starterCode]);

  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  return (
    <div className="flex flex-col bg-black-pure relative overflow-x-hidden">
      <PreferenceNav settings={settings} setSettings={setSettings} />

      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto bg-black-pure">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[javascript()]}
            style={{ fontSize: settings.fontSize }}
          />
        </div>
        <div className="w-full px-5 overflow-auto bg-black-pure">
          <div className="flex h-10 items-center space-x-6 border-b border-border-subtle">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-text-primary">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-accent-green" />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {problem.examples?.map((example, index) => (
              <button
                className="items-start"
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all duration-150 focus:outline-none inline-flex relative rounded-lg px-4 py-1.5 cursor-pointer whitespace-nowrap text-sm border
										${
                      activeTestCaseId === index
                        ? "bg-accent-green/10 text-accent-green border-accent-green/30"
                        : "bg-black-surface text-text-secondary border-border-subtle hover:bg-black-hover"
                    }
									`}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-text-secondary">
              Input:
            </p>
            <div className="w-full cursor-text rounded-lg border border-border-subtle px-3 py-[10px] bg-black-surface text-text-primary mt-2 font-mono text-sm">
              {problem.examples?.[activeTestCaseId]?.inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-text-secondary">
              Output:
            </p>
            <div className="w-full cursor-text rounded-lg border border-border-subtle px-3 py-[10px] bg-black-surface text-text-primary mt-2 font-mono text-sm">
              {problem.examples?.[activeTestCaseId]?.outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
      <AchievementModal
        isOpen={showAchievementModal}
        onClose={handleCloseAchievementModal}
        achievements={newAchievements}
      />
    </div>
  );
};

export default Playground;
