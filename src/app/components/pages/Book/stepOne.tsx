"use client";
import { Typography, Checkbox, Space } from "antd";
import React, { useState } from "react";
import { StepHeader } from "./common/stepHeader";
import { ButtonVariant } from "@/utils";
import { Button } from "../../common";

const { Title, Text } = Typography;

interface StepOneProps {
  formData: {
    issues: string[];
  };
  setFormData: (data: Partial<{ issues: string[] }>) => void;
  onNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ formData, setFormData, onNext }) => {
  const handleCheckboxChange = (checkedValues: string[]) => {
    setFormData({ issues: checkedValues });
  };

  return (
    <>
      <div className="mt-6">
        <StepHeader
          label={" Let’s start by understanding what you need help with."}
          heading={"Identify Your Problem?"}
        />
        <div className="">
          <Checkbox.Group
            onChange={(values) => handleCheckboxChange(values as string[])}
            value={formData.issues}
            className="mt-2"
          >
            <Space direction="vertical">
              <Checkbox value="waterDamage">
                Water damage (leaks, flooding, etc.)
              </Checkbox>
              <Checkbox value="plumbingRepair">
                Plumbing repair (pipes, fixtures, etc.)
              </Checkbox>
              <Checkbox value="expertGuidance">
                Not sure, need expert guidance
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </div>
      </div>

      {formData.issues.includes("waterDamage") &&
        formData.issues.includes("plumbingRepair") && (
          <div className="mt-6">
            <Title level={5}>What issue is more urgent?</Title>
            <Checkbox.Group
              onChange={(values) =>
                setFormData({ issues: [...formData.issues, ...values] })
              }
              className="mt-2"
            >
              <Space direction="vertical">
                <Checkbox value="waterDamageUrgent">Water damage</Checkbox>
                <Checkbox value="plumbingRepairUrgent">
                  Plumbing repair
                </Checkbox>
              </Space>
            </Checkbox.Group>
          </div>
        )}
      <Text type="secondary" italic className="block mt-4">
        If you’re unsure, no worries! We’ll help you figure it out.
      </Text>
      <hr className="mt-4 text-[#EFF2F6]" />
      <div className="flex justify-end mt-6">
        <Button
          variant={ButtonVariant.Primary}
          className="h-[40px] w-[140px]"
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default StepOne;
