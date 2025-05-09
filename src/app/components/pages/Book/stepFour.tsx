"use client";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  // Typography,
  Checkbox,
  Image,
  Upload,
  Form,
  message,
  type UploadFile,
  type UploadProps,
} from "antd";
import { StepHeader } from "./common/stepHeader";
import { ButtonVariant } from "@/utils";
import { Button } from "../../common";

// const { Title, Text } = Typography;
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ causes: formData.causes });
  }, [formData.causes]);

  useEffect(() => {
    if (formData.uploadedImage) {
      const previewURL = URL.createObjectURL(formData.uploadedImage);
      setFileList([
        {
          uid: "-1",
          name: formData.uploadedImage.name,
          status: "done",
          url: previewURL,
          preview: previewURL,
        },
      ]);
    }
  }, [formData.uploadedImage]);

  const handleCauseChange = (checkedValues: string[]) => {
    setFormData({ causes: checkedValues });
    form.setFieldsValue({ causes: checkedValues });
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const uploadedFile =
      newFileList.length > 0 ? newFileList[0].originFileObj : null;

    if (uploadedFile) {
      const previewURL = URL.createObjectURL(uploadedFile);
      newFileList[0].preview = previewURL;
      setFileList([newFileList[0]]);
      setFormData({ uploadedImage: uploadedFile });
      form.setFieldsValue({ uploadedImage: uploadedFile });
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      onNext();
    } catch {
      message.error("Please complete the required fields.");
    }
  };

  return (
    <div className="w-full max-w-xl p-6">
      <StepHeader
        label="Understanding the cause helps us prepare better."
        heading="What Caused the Problem?"
      />
      <Form
        form={form}
        initialValues={formData}
        layout="vertical"
        className="mt-6"
      >
        <Form.Item
          label="Do you know what caused the issue?"
          name="causes"
          rules={[
            { required: true, message: "Please select at least one cause" },
          ]}
        >
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
        </Form.Item>

        <Form.Item
          label="Upload a photo for a better assessment!"
          name="uploadedImage"
          rules={[{ required: true, message: "Please upload one image" }]}
        >
          <Dragger
            fileList={fileList}
            maxCount={1}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("You can only upload image files!");
                return Upload.LIST_IGNORE;
              }
              return isImage;
            }}
            onChange={handleChange}
            className="mt-2"
          >
            <p className="ant-upload-drag-icon">
              <PlusOutlined />
            </p>
            <p>Click or drag an image file to this area to upload</p>
          </Dragger>
        </Form.Item>

        {fileList.length > 0 && (
          <div className="flex justify-center">
            <Image
              src={fileList[0].preview || fileList[0].url}
              alt="Preview"
              width={200}
              height={200}
              style={{ marginTop: "10px", borderRadius: "8px" }}
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          {" "}
          <Button
            onClick={onPrev}
            variant={ButtonVariant.Light}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-[40px] w-[140px]"
          >
            Previous
          </Button>
          <Button
            className="h-[40px] w-[140px]"
            variant={ButtonVariant.ThemeColor}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StepFour;
