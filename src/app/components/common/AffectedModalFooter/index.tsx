import { IJob } from "@/utils";
import { Button } from "antd";
import React from "react";

interface IAffectedModalFooter {
  moveNext: (move: number) => void;
  previousPageNo: number;
  nextPageNo: number;
  specifyArea: IJob;
}

const AffectedModalFooter = ({
  moveNext,
  previousPageNo,
  nextPageNo,
  specifyArea,
}: IAffectedModalFooter) => {
  return (
    <div className="mt-6 flex items-center justify-between">
      <p
        className="text-sm text-blue-500 cursor-pointer"
        onClick={() => moveNext(previousPageNo)}
      >
        Previous
      </p>
      <Button
        onClick={() => moveNext(nextPageNo)}
        className={`rounded-lg px-4 py-2 text-white ${"bg-blue-500 hover:bg-blue-600"}`}
      >
        Next
      </Button>
    </div>
  );
};

export default AffectedModalFooter;
