"use client";
import { Typography, Radio, Form, Button } from "antd";
import React, { useEffect } from "react";

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
      <div className="flex justify-center">
        <div className="text-center">
          <Title level={3}>How Urgent is Your Situation?</Title>
          <Text className="block text-center text-gray-600 mb-2">
            Some issues need immediate action, while others can be scheduled.
          </Text>
        </div>
      </div>
      <Form.Item
        name="urgency"
        rules={[{ required: true, message: "Please select an option" }]}
      >
        <Radio.Group onChange={(e) => setFormData({ urgency: e.target.value })}>
          <div className="flex flex-col gap-2 ">
            <div className="bg-[#EFF2F6] p-3 border border-[#EFF2F6] rounded-lg">
              <Radio value="urgent" className="my-2">
                <strong>
                  I need help ASAP! (Emergency response: 1-3 hours)
                </strong>
                <p className="text-xs text-gray-500">
                  *Additional fees may apply
                </p>
              </Radio>
            </div>
            <div className="bg-[#EFF2F6] p-3 border border-[#EFF2F6] rounded-lg">
              <Radio value="scheduled" className="my-2 ">
                <strong>
                  I can wait for a scheduled visit (Free evaluation during
                  business hours: 9 AM - 5 PM)
                </strong>
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
        <Button className="h-[40px] w-[140px]" onClick={onPrev}>
          Previous
        </Button>
        <Button
          className="h-[40px] w-[140px]"
          type="primary"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </Form>
  );
};

export default StepTwo;
