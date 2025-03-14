"use client";
import React from "react";
import { Input, Checkbox, Typography, Form } from "antd";
import { StepHeader } from "./common/stepHeader";
import { ButtonVariant } from "@/utils";
import { Button } from "../../common";

const { Title, Text } = Typography;

interface StepThreeProps {
  formData: { zipCode: string; affectedAreas: string[]; affectedSize: string };
  setFormData: (data: Partial<StepThreeProps["formData"]>) => void;
  onPrev: () => void;
  onNext: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  formData,
  setFormData,
  onNext,
  onPrev,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(() => {
      onNext();
    });
  };
  React.useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);
  return (
    <div className="w-full max-w-2xl ">
      <StepHeader
        label={
          "  Tell us where the issue is happening so we can send the right help."
        }
        heading={"  Where is the Problem?"}
      />
      <Form
        layout="vertical"
        form={form}
        className="mt-6"
        initialValues={formData}
      >
        {/* Zip Code Input */}
        <Form.Item
          label={<Text className="text-gray-700">ZIP CODE</Text>}
          name="zipCode"
          rules={[
            { required: true, message: "ZIP Code is required" },
            {
              pattern: /^[0-9]{5}$/,
              message: "Enter a valid 5-digit ZIP Code",
            },
          ]}
        >
          <div className="flex gap-2">
            <Input
              placeholder="Enter your Zip Code"
              value={formData.zipCode}
              onChange={(e) => setFormData({ zipCode: e.target.value })}
              className="p-3 rounded-md bg-gray-100"
            />
            <Button
              variant={ButtonVariant.Primary}
              className="h-[50px] w-[180px] px-4 bg-[#31374A]"
            >
              Use my Location
            </Button>
          </div>
        </Form.Item>

        {/* Affected Areas */}
        <Title level={5} className="mt-6">
          Which areas are affected?
        </Title>
        <Form.Item
          name="affectedAreas"
          rules={[{ required: true, message: "Select at least one area" }]}
        >
          <Checkbox.Group
            onChange={(checkedValues) =>
              setFormData({ affectedAreas: checkedValues as string[] })
            }
            value={formData.affectedAreas}
            className="grid grid-cols-1 gap-2"
          >
            <Checkbox value="Basement">Basement</Checkbox>
            <Checkbox value="Main Floor">Main Floor</Checkbox>
            <Checkbox value="Upstairs">Upstairs</Checkbox>
            <Checkbox value="Other">Other</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        {/* Affected Area Input */}
        <Title level={5} className="mt-6">
          How much space is affected?
        </Title>
        <Form.Item
          name="affectedSize"
          rules={[
            { required: true, message: "Affected area is required" },
            { pattern: /^[0-9]+$/, message: "Enter a valid number" },
          ]}
        >
          <Input
            placeholder="Enter square footage"
            value={formData.affectedSize}
            onChange={(e) => setFormData({ affectedSize: e.target.value })}
            className="p-3 rounded-md bg-gray-100"
          />
        </Form.Item>

        <Text className="block text-gray-500 text-sm italic">
          ℹ️ A typical room is about 250 sq ft if you’re unsure.
        </Text>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant={ButtonVariant.Light}
            onClick={onPrev}
            className="bg-gray-300 h-[40px] w-[140px]"
          >
            Previous
          </Button>
          <Button
            className="h-[40px] w-[140px]"
            variant={ButtonVariant.Primary}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StepThree;
