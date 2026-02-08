import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";

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

const Playground: React.FC<PlaygroundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  let [userCode, setUserCode] = useState<string>(problem.starterCode);

  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const {
    query: { pid },
  } = useRouter();

  const handleSubmit = async () => {
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${userCode}`)();
      const handler = problems[pid as string].handlerFunction;

      if (typeof handler === "function") {
        const success = handler(cb);
        if (success) {
          toast.success("Congrats! All tests passed!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
            style: {
              backgroundColor: "#0a0a0a",
              color: "#ffffff",
              border: "1px solid #1f1f1f",
            },
          });
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);

          setSolved(true);
          localStorage.setItem(`solved-${pid}`, "true");
        }
      }
    } catch (error: any) {
      console.log(error.message);
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:",
        )
      ) {
        toast.error("Oops! One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          style: {
            backgroundColor: "#0a0a0a",
            color: "#ffffff",
            border: "1px solid #1f1f1f",
          },
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          style: {
            backgroundColor: "#0a0a0a",
            color: "#ffffff",
            border: "1px solid #1f1f1f",
          },
        });
      }
    }
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    setUserCode(code ? JSON.parse(code) : problem.starterCode);
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
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6 border-b border-border-subtle">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-text-primary">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-accent-green" />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {problem.examples.map((example, index) => (
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
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-text-secondary">
              Output:
            </p>
            <div className="w-full cursor-text rounded-lg border border-border-subtle px-3 py-[10px] bg-black-surface text-text-primary mt-2 font-mono text-sm">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};
export default Playground;
