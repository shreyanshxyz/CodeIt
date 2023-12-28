import React from "react";

type AutoCodeProps = {};

const AutoCode: React.FC<AutoCodeProps> = () => {
  return (
    <div className="flex justify-between h-[calc(100vh-5rem)] pointer-events-none select-none sm:px-12 px-2 md:px-24">
      <div className="text-white pt-12 flex-col">
        <h1 className="text-6xl pb-8 font-extrabold underline underline-offset-8">
          CodeIt
        </h1>
        <p className="font-medium text-xl">
          An{" "}
          <span className="t text-orange-500">
            interactive coding platform{" "}
          </span>
          for practicing coding problems with an editor, compiler & test cases.
          <br />
          Built with{" "}
          <span className="t text-cyan-700">NextJS & TypeScript</span>.
        </p>
      </div>
    </div>
  );
};
export default AutoCode;
