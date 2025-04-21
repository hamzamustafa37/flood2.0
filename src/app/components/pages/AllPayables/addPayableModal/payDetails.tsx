"use client";

import { useState } from "react";
import { Form, Input, Select, Button } from "antd";

const PayDetails = () => {
  // State variables for form fields
  const [payModelName, setPayModelName] = useState("");
  const [payType, setPayType] = useState(null);
  const [payMethod, setPayMethod] = useState(null);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <p className="text-gray-600 mb-4">
        Define how compensation is structured.
      </p>

      <Form layout="vertical">
        {/* Pay Model Name */}
        <Form.Item label="PAY MODEL NAME">
          <Input
            value={payModelName}
            onChange={(e) => setPayModelName(e.target.value)}
            placeholder="Enter Pay Model Name"
            className="w-full h-[45px] border border-gray-300 rounded-md p-2"
          />
        </Form.Item>

        {/* Grid for Pay Type and Pay Method */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="PAY TYPE">
            <Select
              value={payType}
              onChange={setPayType}
              placeholder="Select Pay Type"
              className="w-full h-[45px] border border-gray-300 rounded-md"
            >
              <Select.Option value="type1">Type 1</Select.Option>
              <Select.Option value="type2">Type 2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="PAY METHOD">
            <Select
              value={payMethod}
              onChange={setPayMethod}
              placeholder="Select Pay Method"
              className="w-full h-[45px] border border-gray-300 rounded-md"
            >
              <Select.Option value="method1">Method 1</Select.Option>
              <Select.Option value="method2">Method 2</Select.Option>
            </Select>
          </Form.Item>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="default"
            className="border border-primaryBlue text-primaryBlue px-4 py-2 h-[45px] rounded-md"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="bg-primaryBlue px-4 py-2 h-[45px] rounded-md text-white"
          >
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PayDetails;
