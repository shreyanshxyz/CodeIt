import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
import { Problem } from "@/utils/types/problem";
import { BsCheck2Circle } from "react-icons/bs";

type ProblemDescriptionProps = {
  problem: Problem;
  _solved: boolean;
};

const DifficultyBadge: React.FC<{ difficulty: string }> = ({ difficulty }) => {
  const colorClasses = {
    Easy: "text-difficulty-easy bg-difficulty-easy/10 border-difficulty-easy/20",
    Medium:
      "text-difficulty-medium bg-difficulty-medium/10 border-difficulty-medium/20",
    Hard: "text-difficulty-hard bg-difficulty-hard/10 border-difficulty-hard/20",
  };

  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded border ${colorClasses[difficulty as keyof typeof colorClasses] || "text-text-secondary bg-black-surface border-border-subtle"}`}
    >
      {difficulty}
    </span>
  );
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  problem,
  _solved,
}) => {
  return (
    <div className="bg-black-pure h-full">
      {/* TAB */}
      <div className="flex h-11 w-full items-center bg-black-pure text-text-primary border-b border-border-subtle">
        <div className="bg-black-pure border-b-2 border-accent-green px-5 py-[10px] text-xs cursor-pointer font-medium">
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5 w-full">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-lg text-text-primary font-medium">
                {problem?.title}
              </h1>
              {_solved && (
                <BsCheck2Circle className="text-accent-green text-xl" />
              )}
            </div>

            {/* Difficulty badge */}
            <div className="mb-4">
              <DifficultyBadge difficulty={problem.difficulty} />
            </div>

            {/* Problem Statement(paragraphs) */}
            <div className="text-text-secondary text-sm leading-relaxed">
              <div
                dangerouslySetInnerHTML={{ __html: problem.problemStatement || problem.description || '' }}
              />
            </div>

            {/* Examples */}
            <div className="mt-6 space-y-4">
              {problem.examples.map((example, index) => (
                <div key={example.id}>
                  <p className="font-medium text-text-primary text-sm mb-2">
                    Example {index + 1}:
                  </p>
                  {example.img && (
                    <img
                      src={example.img}
                      alt={`Example ${index + 1}`}
                      className="mt-3 mb-3 rounded border border-border-subtle max-w-full"
                    />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-text-primary">Input: </strong>{" "}
                      {example.inputText}
                      <br />
                      <strong className="text-text-primary">
                        Output:
                      </strong>{" "}
                      {example.outputText} <br />
                      {example.explanation && (
                        <>
                          <strong className="text-text-primary">
                            Explanation:
                          </strong>{" "}
                          {example.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-8 pb-4">
              <div className="text-text-primary text-sm font-medium mb-3">
                Constraints:
              </div>
              <ul className="text-text-secondary text-sm space-y-1">
                <div
                  dangerouslySetInnerHTML={{ __html: problem.constraints }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemDescription;
