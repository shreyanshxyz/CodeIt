import Split from "react-split";
import { ProblemInfoPane } from "../ProblemInfoPane/ProblemInfoPane";
import { EditorPane } from "../EditorPane/EditorPane";
import { TestCasesPane } from "../TestCasesPane/TestCasesPane";
import { OutputPane } from "../OutputPane/OutputPane";
import { Problem } from "@/utils/types/problem";

interface SplitPaneLayoutProps {
  problem: Problem;
}

export function SplitPaneLayout({ problem }: SplitPaneLayoutProps) {
  return (
    <div className="h-full w-full overflow-hidden bg-dark-layer-1 p-2">
      <Split
        direction="vertical"
        sizes={[60, 40]}
        minSize={[100, 100]}
        gutterSize={8}
        className="flex flex-col h-full"
        gutter={() => {
          const gutter = document.createElement("div");
          gutter.className =
            "h-2 bg-dark-divide-border hover:bg-green-500/50 cursor-row-resize rounded transition-colors flex items-center justify-center";
          gutter.innerHTML =
            '<div class="h-1 w-8 bg-dark-layer-2 rounded-full"></div>';
          return gutter;
        }}
      >
        <Split
          direction="horizontal"
          sizes={[30, 70]}
          minSize={[200, 300]}
          gutterSize={8}
          className="flex h-full"
          gutter={() => {
            const gutter = document.createElement("div");
            gutter.className =
              "w-2 bg-dark-divide-border hover:bg-green-500/50 cursor-col-resize rounded transition-colors flex items-center justify-center";
            gutter.innerHTML =
              '<div class="w-1 h-8 bg-dark-layer-2 rounded-full"></div>';
            return gutter;
          }}
        >
          <div className="overflow-hidden">
            <ProblemInfoPane problem={problem} />
          </div>

          <div className="overflow-hidden">
            <EditorPane problem={problem} />
          </div>
        </Split>

        <Split
          direction="horizontal"
          sizes={[30, 70]}
          minSize={[200, 300]}
          gutterSize={8}
          className="flex h-full"
          gutter={() => {
            const gutter = document.createElement("div");
            gutter.className =
              "w-2 bg-dark-divide-border hover:bg-green-500/50 cursor-col-resize rounded transition-colors flex items-center justify-center";
            gutter.innerHTML =
              '<div class="w-1 h-8 bg-dark-layer-2 rounded-full"></div>';
            return gutter;
          }}
        >
          <div className="overflow-hidden">
            <TestCasesPane problem={problem} />
          </div>

          <div className="overflow-hidden">
            <OutputPane />
          </div>
        </Split>
      </Split>
    </div>
  );
}
