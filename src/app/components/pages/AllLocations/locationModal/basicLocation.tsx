"use client";

import { useState } from "react";
import { Form, Input, Select, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { imagesPath } from "@/utils";

const BasicLocationForm = () => {
  const [locationName, setLocationName] = useState("");
  const [company, setCompany] = useState(null);
  const [locationType, setLocationType] = useState(null);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Form layout="vertical">
        <Form.Item
          label={
            <span className="font-semibold text-gray-600">LOCATION NAME</span>
          }
        >
          <Input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="w-full h-[45px] p-2"
            placeholder="Enter location name"
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="SELECT COMPANY">
            <Select
              placeholder="Select company"
              value={company}
              onChange={(value) => setCompany(value)}
              className="w-full h-[45px] p-2"
            >
              <Select.Option value="company1">Company 1</Select.Option>
              <Select.Option value="company2">Company 2</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="LOCATION TYPE">
            <Select
              placeholder="Select location type"
              value={locationType}
              onChange={(value) => setLocationType(value)}
              className="w-full h-[45px] p-2"
            >
              <Select.Option value="type1">Type 1</Select.Option>
              <Select.Option value="type2">Type 2</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Upload className="w-full">
            <Button
              icon={
                <Image
                  src={imagesPath.imageUploader}
                  height={20}
                  width={20}
                  alt="uploader-icon"
                />
              }
              className="border-2 border-dashed border-textLink h-40 w-full flex flex-col items-center justify-center gap-2"
            >
              <p>Drag your photo here or</p>
              <p className="m-0 text-primaryBlue font-semibold">Upload Logo</p>
            </Button>
          </Upload>
        </Form.Item>

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

export default BasicLocationForm;
