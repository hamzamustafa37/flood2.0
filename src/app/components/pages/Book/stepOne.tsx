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
  const [error, setError] = useState("");

  const handleCheckboxChange = (checkedValues: string[]) => {
    setError("");
    setFormData({ issues: checkedValues });
  };

  const handleNext = () => {
    if (formData.issues.length === 0) {
      setError("Please select at least one option.");
      return;
    }
    onNext();
  };

  return (
    <>
      <div className="mt-6">
        <StepHeader
          label={"Let’s start by understanding what you need help with."}
          heading={"Identify Your Problem?"}
        />
        <Title className="text-sm" level={5}>
          What’s the main issue you’re facing?
        </Title>
        {error && <Text type="danger">{error}</Text>}
        <div>
          <Checkbox.Group
            onChange={(values) => handleCheckboxChange(values as string[])}
            value={formData.issues}
            className="mt-2"
          >
            <Space direction="vertical">
              <Checkbox value="waterDamage">
                Water damage (leaks, flooding, etc.)
              </Checkbox>
              <Checkbox value="plumbing">
                Plumbing repair (pipes, fixtures, etc.)
              </Checkbox>
              <Checkbox value="expertGuidance">
                Not sure, need expert guidance
              </Checkbox>
            </Space>
          </Checkbox.Group>
        </div>
      </div>

      <hr className="mt-4 text-[#EFF2F6]" />
      <div className="flex justify-end mt-6">
        <Button
          variant={ButtonVariant.ThemeColor}
          className="h-[40px] w-[140px]"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default StepOne;
