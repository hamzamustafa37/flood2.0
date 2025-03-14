"use client";
import { Progress } from "antd";
import React from "react";

interface IProgress {
  percent: number;
}
export const ProgressBar = ({ percent }: IProgress): React.ReactElement => {
  const twoColors = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };
  return (
    <Progress percent={percent} strokeColor={twoColors} showInfo={false} />
  );
};
