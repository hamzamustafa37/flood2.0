"use client";

import { useState } from "react";
import { Form, Input, Select, Checkbox, Button } from "antd";

const Service = () => {
  const [serviceZipCodes, setServiceZipCodes] = useState("");
  const [serviceTypes, setServiceTypes] = useState(null);
  const [payModel, setPayModel] = useState(null);
  const [tieUsers, setTieUsers] = useState(null);
  const [offerTrainings, setOfferTrainings] = useState(false);
  const [customPricing, setCustomPricing] = useState(false);

  return (
    <div className=" p-6  max-w-2xl mx-auto">
      <Form layout="vertical">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Service Zip Codes">
            <Input
              value={serviceZipCodes}
              onChange={(e) => setServiceZipCodes(e.target.value)}
              className="w-full h-[45px] border border-gray-300 rounded-md p-2"
            />
          </Form.Item>
          <Form.Item label="Service Types">
            <Select
              placeholder="Select service type"
              value={serviceTypes}
              onChange={setServiceTypes}
              className="w-full h-[45px] border border-gray-300 rounded-md"
            >
              <Select.Option value="type1">Type 1</Select.Option>
              <Select.Option value="type2">Type 2</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item label="Default Pay Model">
          <Select
            placeholder="Select pay model"
            value={payModel}
            onChange={setPayModel}
            className="w-full h-[45px] border border-gray-300 rounded-md"
          >
            <Select.Option value="model1">Model 1</Select.Option>
            <Select.Option value="model2">Model 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Auto Tie Users">
          <Select
            placeholder="Select users"
            value={tieUsers}
            onChange={setTieUsers}
            className="w-full h-[45px] border border-gray-300 rounded-md"
          >
            <Select.Option value="user1">User 1</Select.Option>
            <Select.Option value="user2">User 2</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex flex-col gap-2">
          <Checkbox
            checked={offerTrainings}
            onChange={(e) => setOfferTrainings(e.target.checked)}
          >
            Offer Trainings
          </Checkbox>
          <Checkbox
            checked={customPricing}
            onChange={(e) => setCustomPricing(e.target.checked)}
          >
            Allow Custom Pricing
          </Checkbox>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button className="border border-primaryBlue text-primaryBlue px-4 py-2 h-[45px] rounded-md">
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

export default Service;
