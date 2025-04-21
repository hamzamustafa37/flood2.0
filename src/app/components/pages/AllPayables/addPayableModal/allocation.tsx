"use client";

import { useState } from "react";
import { Form, Input, Select, Button } from "antd";

const Allocation = () => {
  // State variables for form fields
  const [totalExpenseName, setTotalExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [offTheTopDestination, setOffTheTopDestination] = useState(null);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <p className="text-gray-600 mb-4">
        Manage additional costs within this model.
      </p>

      <Form layout="vertical">
        {/* Total Expense Name */}
        <Form.Item label="TOTAL EXPENSE NAME">
          <Input
            value={totalExpenseName}
            onChange={(e) => setTotalExpenseName(e.target.value)}
            placeholder="Enter Total Expense Name"
            className="w-full h-[45px] border border-gray-300 rounded-md p-2"
          />
        </Form.Item>

        {/* Amount */}
        <Form.Item label="AMOUNT">
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$"
            prefix="$"
            className="w-full h-[45px] border border-gray-300 rounded-md p-2"
          />
        </Form.Item>

        {/* Off-the-Top Destination */}
        <Form.Item label="OFF-THE-TOP DESTINATION">
          <Select
            value={offTheTopDestination}
            onChange={setOffTheTopDestination}
            placeholder="Select Off-the-Top Destination"
            className="w-full h-[45px] border border-gray-300 rounded-md"
          >
            <Select.Option value="destination1">Destination 1</Select.Option>
            <Select.Option value="destination2">Destination 2</Select.Option>
          </Select>
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
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Allocation;
