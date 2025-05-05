import { imagesPath } from "@/utils";
import Image from "next/image";
import React from "react";

interface ITablePageHeaderProps {
  heading: string;
  strapLine: string;
  isOpen?: boolean;
  enableModal: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export default function TablePageHeader({
  heading,
  strapLine,
  setIsOpen,
  isOpen,
  enableModal,
}: ITablePageHeaderProps) {
  return (
    <div className="pt-4 md:pt-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 pt-6 gap-4">
        <div>
          <h4
            className="text-2xl sm:text-3xl p-0 pb-1 m-0"
            style={{ color: "var(--color-text)" }}
          >
            {heading}
          </h4>
          <p className="text-md text-textMuted my-2">{strapLine}</p>
        </div>

        {enableModal && (
          <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
            <Image
              src={imagesPath.plusIcon}
              height={40}
              width={40}
              alt={"add icon"}
              className="cursor-pointer"
              onClick={() => {
                setIsOpen && setIsOpen(!isOpen);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
