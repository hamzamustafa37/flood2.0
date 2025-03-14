import { IStepHeader } from "@/utils";
import { Typography } from "antd";
import React from "react";

export const StepHeader = ({ heading, label }: IStepHeader) => {
  const { Title, Text } = Typography;
  return (
    <div className="flex justify-center my-2">
      <div className="text-center ">
        <Title level={4}>{heading}</Title>
        <Text type="secondary">{label}</Text>
      </div>
    </div>
  );
};
