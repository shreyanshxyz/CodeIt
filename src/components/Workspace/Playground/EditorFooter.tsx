import React from "react";
import { BsChevronUp } from "react-icons/bs";
import { FiPlay } from "react-icons/fi";

type EditorFooterProps = {
  handleSubmit: () => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleSubmit }) => {
  return (
    <div className="flex bg-black-pure absolute bottom-0 z-10 w-full border-t border-border-subtle">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          <button className="px-3 py-1.5 font-medium items-center transition-all duration-150 inline-flex bg-black-surface text-sm hover:bg-black-hover text-text-secondary rounded-lg border border-border-subtle">
            <span>Console</span>
            <div className="ml-2 transform transition flex items-center">
              <BsChevronUp className="text-text-tertiary" />
            </div>
          </button>
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <button
            className="px-4 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all duration-150 focus:outline-none inline-flex bg-black-surface hover:bg-black-hover text-text-primary rounded-lg border border-border-subtle"
            onClick={handleSubmit}
          >
            <FiPlay className="mr-2" />
            Run
          </button>
          <button
            className="px-4 py-1.5 font-medium items-center transition-all duration-150 focus:outline-none inline-flex text-sm text-black-pure bg-accent-green hover:bg-accent-green-hover rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditorFooter;
