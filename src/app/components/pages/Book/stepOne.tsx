import { Typography, Checkbox, Space } from "antd";
import React from "react";
import { StepHeader } from "./common/stepHeader";
import { ButtonVariant } from "@/utils";
import { Button } from "../../common";
import Image from "next/image";

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
        <Title className="text-sm" level={5}>
          What’s the main issue you’re facing?
        </Title>
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
        <div className="mt-6">
          <Title level={5} className="text-sm">
            What type of property is this service for?
          </Title>
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
      <div className="flex mt-4">
        <Image
          src="/icons/info.svg"
          alt="info-icon"
          height={15}
          width={15}
          className="mx-2"
        />
        <Text type="secondary" italic>
          If you’re unsure, no worries! We’ll help you figure it out.
        </Text>
      </div>

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
