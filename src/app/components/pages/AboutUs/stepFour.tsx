"use client";
import React, { useEffect, useState } from "react";
import { Upload, Button, Typography, Checkbox, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd/es/upload/interface";

const { Title, Text } = Typography;
const { Dragger } = Upload;

interface StepFourProps {
  formData: { causes: string[]; uploadedImage: File | null };
  setFormData: (data: Partial<StepFourProps["formData"]>) => void;
  onPrev: () => void;
  onNext: () => void;
}

const StepFour: React.FC<StepFourProps> = ({
  formData,
  setFormData,
  onPrev,
  onNext,
}) => {
  const [fileList, setFileList] = useState<Array<UploadFile>>([]);

  useEffect(() => {
    if (formData.uploadedImage) {
      const file: UploadFile = {
        uid: "-1",
        name: formData.uploadedImage.name,
        status: "done",
        url: URL.createObjectURL(formData.uploadedImage),
      };
      setFileList([file]);
    }
  }, [formData.uploadedImage]);

  const handleUpload: UploadProps["onChange"] = ({ file, fileList }) => {
    if (file.status === "done") {
      setFileList([file]);
      setFormData({ uploadedImage: file.originFileObj || null });
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const handleRemove: UploadProps["onRemove"] = (file) => {
    setFileList([]); // Clear the file list
    setFormData({ uploadedImage: null }); // Clear the uploaded image in form data
    return true; // Return true to allow the file to be removed
  };

  const handleCauseChange = (checkedValues: Array<string>) => {
    setFormData({ causes: checkedValues });
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    fileList,
    beforeUpload: () => false,
    onChange: handleUpload,
    onRemove: handleRemove,
    maxCount: 1,
    listType: "picture-card",
  };

  return (
    <div className="w-full max-w-xl p-6">
      <Title level={2} className="text-center">
        What Caused the Problem?
      </Title>
      <Text className="block text-center text-gray-600">
        Understanding the cause helps us prepare better.
      </Text>

      <div className="mt-6">
        <Text className="font-medium text-gray-700">
          Do you know what caused the issue?
        </Text>
        <Checkbox.Group
          className="grid gap-2 mt-2"
          value={formData.causes}
          onChange={handleCauseChange}
        >
          <Checkbox value="Burst Pipe">Burst Pipe</Checkbox>
          <Checkbox value="Flash Flooding">Flash Flooding</Checkbox>
          <Checkbox value="Dishwasher Overflow">Dishwasher Overflow</Checkbox>
          <Checkbox value="Foundation Seepage">Foundation Seepage</Checkbox>
          <Checkbox value="Not Sure">
            Not Sure (Let an expert assess it)
          </Checkbox>
        </Checkbox.Group>
      </div>

      <div className="mt-6">
        <Text className="font-medium text-gray-700">
          Upload a photo for a better assessment!
        </Text>
        <Dragger {...uploadProps} className="rounded-md p-6 mt-2">
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="text-4xl text-gray-400" />
          </p>
          <p className="ant-upload-text">
            Click or drag a file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Please upload a clear image for
            assessment.
          </p>
          <Button className="mt-2 bg-[#31374A] text-white px-4 py-2 rounded-md">
            Upload Photo
          </Button>
        </Dragger>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          onClick={onPrev}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-[40px] w-[140px]"
        >
          Previous
        </Button>
        <Button
          className="h-[40px] w-[140px] bg-blue-600 text-white hover:bg-blue-700"
          type="primary"
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepFour;
