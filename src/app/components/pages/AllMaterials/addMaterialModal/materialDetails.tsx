"use client";

import { useState } from "react";
import { Form, Input, Select, Button } from "antd";

const MaterialDetails = () => {
  // State variables for form fields
  const [materialName, setMaterialName] = useState("");
  const [grouping, setGrouping] = useState(null);
  const [evaporationPotentialGoal, setEvaporationPotentialGoal] =
    useState(null);
  const [selectedServices, setSelectedServices] = useState(null);

  return (
    <div className="p-6 max-w-2xl mx-auto ">
      {/* Header */}
      <p className="text-gray-600 mb-4">
        Define key material details for accurate tracking.
      </p>

      <Form layout="vertical">
        {/* Material Name */}
        <Form.Item label="MATERIAL NAME">
          <Input
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
            placeholder="Enter Material Name"
            className="w-full h-[45px] border border-gray-300 rounded-md p-2"
          />
        </Form.Item>

        {/* Grid for Grouping and Evaporation Potential Goal */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="GROUPING">
            <Select
              value={grouping}
              onChange={setGrouping}
              placeholder="Select Grouping"
              className="w-full h-[45px] border border-gray-300 rounded-md"
            >
              <Select.Option value="group1">Group 1</Select.Option>
              <Select.Option value="group2">Group 2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="EVAPORATION POTENTIAL GOAL">
            <Select
              value={evaporationPotentialGoal}
              onChange={setEvaporationPotentialGoal}
              placeholder="Select Evaporation Potential Goal"
              className="w-full h-[45px] border border-gray-300 rounded-md"
            >
              <Select.Option value="goal1">Goal 1</Select.Option>
              <Select.Option value="goal2">Goal 2</Select.Option>
            </Select>
          </Form.Item>
        </div>

        {/* Select Services */}
        <Form.Item label="SELECT SERVICES">
          <Select
            value={selectedServices}
            onChange={setSelectedServices}
            placeholder="Select Services"
            className="w-full h-[45px] border border-gray-300 rounded-md"
          >
            <Select.Option value="service1">Service 1</Select.Option>
            <Select.Option value="service2">Service 2</Select.Option>
          </Select>
        </Form.Item>

        {/* Preview Icon Placeholder */}
        <Button
          className="w-full h-10 border-2 border-dashed border-textLink "
          type="link"
        >
          Preview Icon for Details
        </Button>
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

export default MaterialDetails;
