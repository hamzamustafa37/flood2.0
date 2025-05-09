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
import { storage } from "@firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// const { Title, Text } = Typography;
const { Dragger } = Upload;

interface StepFourProps {
  formData: Partial<IFormData>;
  setFormData: (data: Partial<IFormData>) => void;
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    form.setFieldsValue({ causes: formData.causes });
  }, [formData.causes]);

  useEffect(() => {
    if (formData.ImageURL) {
      const previewURL = formData.ImageURL;
      setFileList([
        {
          uid: "-1",
          name: formData.ImageURL,
          status: "done",
          url: previewURL,
          preview: previewURL,
        },
      ]);
    }
  }, [formData.ImageURL]);

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
      // setFormData({ uploadedImage: uploadedFile });
      // form.setFieldsValue({ uploadedImage: uploadedFile });
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      if (fileList.length === 0 || !fileList[0].originFileObj) {
        message.error("Please upload an image file.");
        return;
      }

      const file = fileList[0].originFileObj as File;
      const fileRef = ref(storage, `uploads/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      setFormData({ ImageURL: url });
      onNext();
      setLoading(false);
    } catch (error) {
      message.error("Please complete the required fields.");
      setLoading(false);
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

        <div className="flex flex-wrap sm:justify-between justify-center mt-6">
          {" "}
          <Button
            onClick={onPrev}
            variant={ButtonVariant.Light}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-[40px] w-full m-2"
          >
            Previous
          </Button>
          <Button
            className="h-[40px] w-full m-2"
            variant={ButtonVariant.ThemeColor}
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StepFour;
