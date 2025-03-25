import { imagesPath } from "@/utils";
import Image from "next/image";
import React from "react";

interface ITablePageHeaderProps {
  heading: string;
  strapLine: string;
}
export default function TablePageHeader({
  heading,
  strapLine,
}: ITablePageHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div className="">
        <h3 className="text-2xl" style={{ color: "var(--color-text)" }}>
          {heading}
        </h3>
        <p className="text-md text-textMuted">{strapLine}</p>
      </div>
      <div className=" flex items-center">
        <Image
          src={imagesPath.plusIcon}
          height={40}
          width={40}
          alt={"add icon"}
        />
      </div>
    </div>
  );
}
