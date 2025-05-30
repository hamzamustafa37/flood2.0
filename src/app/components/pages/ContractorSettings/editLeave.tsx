import React from "react";
import { Modal, Form, Input, DatePicker, Button } from "antd";
import dayjs from "dayjs";

interface EditHolidayModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; date: string }) => void;
  initialValues?: { name: string; date: string };
  isEditMode: boolean;
}

const EditHolidayModal: React.FC<EditHolidayModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialValues,
  isEditMode,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closable
      className="rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? "Update Leave" : "Add Leave"}
      </h2>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: initialValues?.name || "",
          date: initialValues?.date ? dayjs(initialValues.date) : null,
        }}
        onFinish={(values) => {
          onSubmit({
            name: values.name,
            date: values.date ? values.date.format("YYYY-MM-DD") : "",
          });
        }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter holiday name" }]}
        >
          <Input size="large" placeholder="Holiday Name" />
        </Form.Item>

        <Form.Item
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker size="large" className="w-full" format="DD/MM/YYYY" />
        </Form.Item>

        <div className="flex justify-between items-center mt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-green-500 hover:bg-green-600"
          >
            Submit
          </Button>
          <Button type="text" icon={<span className="text-xl">＋</span>} />
        </div>
      </Form>
    </Modal>
  );
};

export default EditHolidayModal;
