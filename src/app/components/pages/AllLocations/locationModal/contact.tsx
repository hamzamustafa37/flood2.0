"use client";

import { useState } from "react";
import { Form, Input, Button } from "antd";

const ContactLocation = () => {
  const [form] = Form.useForm();

  return (
    <div className=" p-6 max-w-2xl mx-auto">
      <Form layout="vertical" form={form}>
        <Form.Item
          label={
            <span className="font-semibold text-gray-600">PHONE NUMBER</span>
          }
        >
          <Input
            className="w-full h-[45px] p-2"
            placeholder="Enter phone number"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-600">EMAIL</span>}
        >
          <Input className="w-full h-[45px] p-2" placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold text-gray-600">WEBSITE</span>}
        >
          <Input
            className="w-full h-[45px] p-2"
            placeholder="Enter website URL"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-semibold text-gray-600">
              ADDRESS FOR DISPATCH
            </span>
          }
        >
          <Input
            className="w-full h-[45px] p-2"
            placeholder="Enter dispatch address"
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-semibold text-gray-600">BILLING ADDRESS</span>
          }
        >
          <Input
            className="w-full h-[45px] p-2"
            placeholder="Enter billing address"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label={
              <span className="font-semibold text-gray-600">OWNER NAME</span>
            }
          >
            <Input
              className="w-full h-[45px] p-2"
              placeholder="Enter owner name"
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-semibold text-gray-600">EIN (TAX ID)</span>
            }
          >
            <Input
              className="w-full h-[45px] p-2"
              placeholder="Enter EIN (Tax ID)"
            />
          </Form.Item>
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

export default ContactLocation;
