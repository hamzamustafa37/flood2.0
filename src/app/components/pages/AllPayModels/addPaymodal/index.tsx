import CustomModal from "@/app/components/common/Modal";
import { ModalProps } from "@/utils";
import { Tabs } from "antd";
import React from "react";
import PayDetails from "./payDetails";
import Distribution from "./distribution";
import Allocation from "./allocation";

const AddPayModal = ({ isOpen, onClose }: ModalProps) => {
  const items = [
    {
      key: "1",
      label: "Pay Details",
      children: <PayDetails />,
    },
    {
      key: "2",
      label: "Distribution",
      children: <Distribution />,
    },
    {
      key: "3",
      label: "Allocation",
      children: <Allocation />,
    },
  ];

  const handleTabChange = (key: string) => {
    console.log("Active tab changed to:", key);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create a New Pay Model"
    >
      <p className="text-gray-500 text-sm mb-4">
        Set up a structured pay model by defining roles, payment methods, and
        expense allocations for accurate payroll management.
      </p>
      <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
    </CustomModal>
  );
};

export default AddPayModal;
