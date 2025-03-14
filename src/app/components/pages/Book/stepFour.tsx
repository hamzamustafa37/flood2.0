"use client";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Typography,
  Checkbox,
  Image,
  Upload,
  Form,
  message,
  type GetProp,
  type UploadFile,
  type UploadProps,
} from "antd";
import { StepHeader } from "./common/stepHeader";
import { ButtonVariant } from "@/utils";
import { Button } from "../../common";

const { Title, Text } = Typography;

interface StepFourProps {
  formData: { causes: string[]; uploadedImage: File | null };
  setFormData: (data: Partial<StepFourProps["formData"]>) => void;
  onPrev: () => void;
  onNext: () => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const StepFour: React.FC<StepFourProps> = ({
  formData,
  setFormData,
  onPrev,
  onNext,
}) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({ causes: formData.causes });
  }, [formData.causes]);

  const handleCauseChange = (checkedValues: Array<string>) => {
    setFormData({ causes: checkedValues });
    form.setFieldsValue({ causes: checkedValues }); // Update form state
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const uploadedFile =
      newFileList.length > 0 ? newFileList[0].originFileObj : null;
    setFormData({ uploadedImage: uploadedFile });
    form.setFieldsValue({ uploadedImage: uploadedFile });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      onNext();
    } catch (error) {
      message.error("Please complete the required fields.");
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  React.useEffect(() => {
    if (formData.uploadedImage) {
      setFileList([
        {
          uid: "-1",
          name: formData.uploadedImage.name,
          status: "done",
          url: URL.createObjectURL(formData.uploadedImage),
        },
      ]);
    }
  }, [formData.uploadedImage]);

  return (
    <div className="w-full max-w-xl p-6">
      <StepHeader
        label={"    Understanding the cause helps us prepare better."}
        heading={"What Caused the Problem?"}
      />
      <Form
        form={form}
        initialValues={formData}
        layout="vertical"
        className="mt-6"
      >
        {/* Checkbox Group Validation */}
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
          rules={[
            { required: true, message: "Please upload at least one image" },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            className=""
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>

        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={onPrev}
            variant={ButtonVariant.Light}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-[40px] w-[140px]"
          >
            Previous
          </Button>
          <Button
            className="h-[40px] w-[140px] bg-blue-600 text-white hover:bg-blue-700"
            variant={ButtonVariant.Primary}
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
