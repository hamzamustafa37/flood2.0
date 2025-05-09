"use client";
import React, { useState } from "react";
import { Form, Input, Select, Typography, message } from "antd";
import { StepHeader } from "./common/stepHeader";
import { Button } from "../../common";
import { ButtonVariant } from "@/utils";
import { saveNonScheduledBooking } from "@/lib/features/bookService";

const { Option } = Select;

interface StepFiveProps {
  formData: IFormData;
  setFormData: (data: Partial<StepFiveProps["formData"]>) => void;
  onPrev: () => void;
  onNext: () => void;
}

const cityData: { [key: string]: { state: string; zipCode: string } } = {
  Alcester: { state: "South Dakota", zipCode: "57001" },
  Houston: { state: "Texas", zipCode: "77001" },
  "New York": { state: "New York", zipCode: "10001" },
  Chicago: { state: "Illinois", zipCode: "60601" },
};

const StepFive: React.FC<StepFiveProps> = ({
  formData,
  setFormData,
  onPrev,
  onNext,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleCityChange = (city: string) => {
    const selectedCity = cityData[city] || { state: "", zipCode: "" };
    setFormData({
      city,
      state: selectedCity.state,
      zipCode: selectedCity.zipCode,
    });
    form.setFieldsValue({
      state: selectedCity.state,
      zipCode: selectedCity.zipCode,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      const res = await saveNonScheduledBooking({
        issues: formData.issues,
        zipCode: formData.zipCode,
        affectedAreas: formData.affectedAreas,
        affectedSize: formData.affectedSize,
        urgency: formData.urgency,
        propertyType: formData.propertyType,
        additionalInfo: formData.additionalInfo,
        causes: formData.causes,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        email: formData.email,
        ImageURL: formData.ImageURL,
      });
      if (res) {
        setLoading(false);
        message.success("Booking saved successfully!");
        onNext();
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      message.error(
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <StepHeader
        label={"Just a few more details to confirm your booking."}
        heading={" Final Details – Let’s Get You Scheduled!"}
      />
      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        className="mt-6"
      >
        {/* Name and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              size="large"
              className="p-3 rounded-md bg-gray-100"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ phone: e.target.value })}
              size="large"
              className="p-3 rounded-md bg-gray-100"
            />
          </Form.Item>
        </div>

        {/* Address */}
        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please enter your full address" },
          ]}
        >
          <Input
            placeholder="Enter the full address (e.g., 123 Main St, Houston, TX)"
            value={formData.address}
            onChange={(e) => setFormData({ address: e.target.value })}
            size="large"
            className="p-3 rounded-md bg-gray-100"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email address" },
          ]}
        >
          <Input
            placeholder="Enter the Email (abc@)"
            value={formData.email}
            onChange={(e) => setFormData({ email: e.target.value })}
            size="large"
            className="p-3 rounded-md bg-gray-100"
          />
        </Form.Item>
        {/* City */}
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please select your city" }]}
        >
          <Select
            placeholder="Select your city"
            onChange={handleCityChange}
            value={formData.city}
          >
            <Option value="">Select City</Option>
            {Object.keys(cityData).map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* State & Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="State" name="state">
            <Input
              value={formData.state}
              disabled
              size="large"
              className="p-3 rounded-md bg-gray-100"
            />
          </Form.Item>

          <Form.Item label="ZIP Code" name="zipCode">
            <Input
              value={formData.zipCode}
              disabled
              size="large"
              className="p-3 rounded-md bg-gray-100"
            />
          </Form.Item>
        </div>

        <div className="flex flex-wrap sm:justify-between justify-center mt-6">
          <Button
            onClick={onPrev}
            variant={ButtonVariant.Light}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-[40px] w-full sm:w-[140px] m-2"
          >
            Previous
          </Button>
          <Button
            className="h-[40px] w-full sm:w-[140px] m-2"
            onClick={handleSubmit}
            variant={ButtonVariant.ThemeColor}
            loading={loading}
            disabled={loading}
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StepFive;
