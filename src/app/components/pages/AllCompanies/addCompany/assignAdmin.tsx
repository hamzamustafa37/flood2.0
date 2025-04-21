"use client";

import { useState } from "react";
import { Form, Radio, Button, Select } from "antd";

const AssignAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [permissions, setPermissions] = useState("full");
  const [setupCompleted, setSetupCompleted] = useState("yes");

  return (
    <div className=" p-6  max-w-2xl mx-auto">
      <Form layout="vertical">
        <Form.Item
          label={
            <span className="font-semibold text-gray-600">ASSIGN ADMIN</span>
          }
        >
          <Select
            placeholder="Select an admin"
            value={admin}
            onChange={(value) => setAdmin(value)}
            className="w-full h-[45px]"
          >
            <Select.Option value="admin1">Admin 1</Select.Option>
            <Select.Option value="admin2">Admin 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Permissions" className="flex flex-col">
          <Radio.Group
            onChange={(e) => setPermissions(e.target.value)}
            value={permissions}
            className="flex gap-4"
          >
            <Radio value="full" className="flex items-center h-[45px]">
              Full Access
            </Radio>
            <Radio value="limited" className="flex items-center h-[45px]">
              Limited Access
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Is setup completed?" className="flex flex-col">
          <Radio.Group
            onChange={(e) => setSetupCompleted(e.target.value)}
            value={setupCompleted}
            className="flex gap-4"
          >
            <Radio value="yes" className="flex items-center h-[45px]">
              Yes
            </Radio>
            <Radio value="no" className="flex items-center h-[45px]">
              No
            </Radio>
          </Radio.Group>
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
          <Button className="border border-primaryBlue text-primaryBlue px-4 py-2 h-[45px] rounded-md">
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

export default AssignAdmin;
