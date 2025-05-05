"use client";
import { Typography, Radio, Form } from "antd";
import React, { useEffect } from "react";
import { StepHeader } from "./common/stepHeader";
import { Button } from "../../common";
import { ButtonVariant } from "@/utils";

const { Title, Text } = Typography;

interface StepTwoProps {
  formData: {
    issues: string[];
    urgency: string;
  };
  setFormData: (data: Partial<StepTwoProps["formData"]>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  formData,
  setFormData,
  onNext,
  onPrev,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleNext = () => {
    form.validateFields().then((values) => {
      setFormData(values);
      onNext();
    });
  };

  return (
    <Form layout="vertical" form={form} initialValues={formData}>
      <StepHeader
        label={
          "Some issues need immediate action, while others can be scheduled."
        }
        heading={"How Urgent is Your Situation?"}
      />
      <Form.Item
        name="urgency"
        rules={[{ required: true, message: "Please select an option" }]}
      >
        <Radio.Group onChange={(e) => setFormData({ urgency: e.target.value })}>
          <div className="flex flex-col gap-2 ">
            <div className="bg-[#EFF2F6] p-3 border border-[#EFF2F6] rounded-lg">
              <Radio value="urgent" className="my-2">
                <Title level={5} className="text-sm">
                  I need help ASAP! (Emergency response: 1-3 hours)
                </Title>
                <p className="text-xs text-gray-500">
                  *Additional fees may apply
                </p>
              </Radio>
            </div>
            <div className="bg-[#EFF2F6] p-3 border border-[#EFF2F6] rounded-lg">
              <Radio value="scheduled" className="my-2 ">
                <Title level={5} className="text-sm">
                  I can wait for a scheduled visit (Free evaluation during
                  business hours: 9 AM - 5 PM)
                </Title>
              </Radio>
            </div>
          </div>
        </Radio.Group>
      </Form.Item>

      {formData.issues.includes("major_flood") &&
        formData.urgency === "urgent" && (
          <div className="p-4 bg-red-100 border border-red-500 rounded">
            <p className="text-red-700 font-bold">
              🚨 Immediate action required! Please call our emergency hotline
              after submitting the form.
            </p>
          </div>
        )}

      <div className="flex justify-between mt-4">
        <Button
          variant={ButtonVariant.Light}
          className="h-[40px] w-[140px]"
          onClick={onPrev}
        >
          Previous
        </Button>
        <Button
          className="h-[40px] w-[140px]"
          variant={ButtonVariant.Primary}
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </Form>
  );
};

export default StepTwo;
