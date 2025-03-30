"use client";

import { useState } from "react";
import { Form, Radio, Button, Upload, Space, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { imagesPath } from "@/utils";

const BrandIdentity = () => {
  const [theme, setTheme] = useState("custom");
  const [colors, setColors] = useState({
    primary: "",
    secondary: "",
    tertiary: "",
  });

  const handleColorChange = (color: string, type: string) => {
    setColors((prev) => ({ ...prev, [type]: color }));
  };

  return (
    <div className=" p-6 max-w-2xl mx-auto">
      <Form layout="vertical">
        <Form.Item label="Upload Logo">
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

        <Form.Item label="Choose Available Themes">
          <Radio.Group onChange={(e) => setTheme(e.target.value)} value={theme}>
            <Radio value="available">Available Themes</Radio>
            <Radio value="custom">Custom Design</Radio>
          </Radio.Group>
        </Form.Item>

        <Space size="middle" className="w-full flex">
          <Form.Item label="Primary Color" className="flex-1">
            <Input
              type="color"
              value={colors.primary}
              onChange={(e) => handleColorChange(e.target.value, "primary")}
              suffix={
                <Image
                  src={imagesPath.colorPlate}
                  height={20}
                  width={20}
                  alt="color-picker-icon"
                />
              }
            />
          </Form.Item>
          <Form.Item label="Secondary Color" className="flex-1">
            <Input
              type="color"
              value={colors.secondary}
              onChange={(e) => handleColorChange(e.target.value, "secondary")}
              suffix={
                <Image
                  src={imagesPath.colorPlate}
                  height={20}
                  width={20}
                  alt="color-picker-icon"
                />
              }
            />
          </Form.Item>
          <Form.Item label="Tertiary Color" className="flex-1">
            <Input
              type="color"
              value={colors.tertiary}
              onChange={(e) => handleColorChange(e.target.value, "tertiary")}
              suffix={
                <Image
                  src={imagesPath.colorPlate}
                  height={20}
                  width={20}
                  alt="color-picker-icon"
                />
              }
            />
          </Form.Item>
        </Space>

        <Button
          className="w-full h-10 border-2 border-dashed border-textLink "
          type="link"
        >
          Preview
        </Button>

        <div className="flex justify-end gap-2 mt-4">
          <Button>Cancel</Button>
          <Button type="primary">Next</Button>
        </div>
      </Form>
    </div>
  );
};

export default BrandIdentity;
