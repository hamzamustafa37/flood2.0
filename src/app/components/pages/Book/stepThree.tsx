"use client";
import React from "react";
import { Radio } from "antd";
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
  const [propertyType, setPropertyType] = React.useState<string>("");

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
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <div className="flex items-center border border-[#9ea3b1] rounded-xl px-4 py-2 w-full">
            <div className="flex flex-col justify-center w-full sm:w-[50%]">
              <Text className="text-xs text-[#9ea3b1] font-semibold">
                ZIP CODE
              </Text>
              <strong>Enter Zip code here</strong>
            </div>

            <Form.Item
              name="zipCode"
              rules={[
                { required: true, message: "ZIP Code is required" },
                {
                  pattern: /^[0-9]{5}$/,
                  message: "Enter a valid 5-digit ZIP Code",
                },
              ]}
              className="mb-0 w-full sm:w-[50%] border-none"
            >
              <Input
                placeholder="Enter ZIP Code"
                value={formData.zipCode}
                onChange={(e) => setFormData({ zipCode: e.target.value })}
                className="p-3 border-none rounded-md bg-gray-100 w-full"
              />
            </Form.Item>
          </div>

          <Button
            variant={ButtonVariant.ThemeColor}
            className="h-[50px] w-full sm:w-auto px-4 rounded-md"
          >
            Use my Location
          </Button>
        </div>

        <div className="mt-4">
          <Title level={5} className="mt-6">
            What type of property is this service for?
          </Title>
          <Radio.Group
            onChange={(e) => setPropertyType(e.target.value)}
            value={propertyType}
            className="grid grid-cols-1 gap-2"
          >
            <Radio value="residential">Residential</Radio>
            <Radio value="commercial">Commercial</Radio>
          </Radio.Group>
        </div>
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
            variant={ButtonVariant.ThemeColor}
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
