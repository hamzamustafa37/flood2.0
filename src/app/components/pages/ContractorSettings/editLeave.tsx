import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import { addLeaveDay, updateLeaveDay } from "@/lib/features/leave";

interface EditHolidayModalProps {
  visible: boolean;
  onClose: () => void;
  initialValues?: { name: string; date: string; key?: string };
  isEditMode: boolean;
  onSuccess?: () => void;
}

const EditHolidayModal: React.FC<EditHolidayModalProps> = ({
  visible,
  onClose,
  initialValues,
  isEditMode,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        name: initialValues?.name || "",
        date: initialValues?.date ? dayjs(initialValues.date) : null,
      });
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async (values: { name: string; date: any }) => {
    setLoading(true);
    try {
      const name = values.name;
      const date = values.date ? values.date.format("YYYY-MM-DD") : "";

      if (!name || !date) return;

      let res;
      if (isEditMode && initialValues?.key) {
        res = await updateLeaveDay(initialValues.key, { name, date });
      } else {
        res = await addLeaveDay({ name, date });
      }

      if (res) {
        form.resetFields();
        onClose();
        onSuccess?.();
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

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

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            loading={loading}
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
