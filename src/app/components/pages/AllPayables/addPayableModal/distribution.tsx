"use client";

import { useState } from "react";
import { Form, Select, Input, Button } from "antd";

const Distribution = () => {
  // State variables for form fields
  const [role, setRole] = useState(null);
  const [percentage, setPercentage] = useState("");

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <p className="text-gray-600 mb-4">
        Set up pay distribution based on roles.
      </p>

      <Form layout="vertical">
        {/* Add Role */}
        <Form.Item label="ADD ROLE">
          <Select
            value={role}
            onChange={setRole}
            placeholder="Select Role"
            className="w-full h-[45px] border border-gray-300 rounded-md"
          >
            <Select.Option value="role1">Role 1</Select.Option>
            <Select.Option value="role2">Role 2</Select.Option>
          </Select>
        </Form.Item>

        {/* Set Percentage of Pay Per Role */}
        <Form.Item label="SET PERCENTAGE OF PAY PER ROLE">
          <Input
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="%"
            prefix="%"
            className="w-full h-[45px] border border-gray-300 rounded-md p-2"
          />
        </Form.Item>

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

export default Distribution;
