import CustomModal from "@/app/components/common/Modal";
import { ModalProps } from "@/utils";
import { Tabs } from "antd";
import React from "react";
import MaterialDetails from "./materialDetails";
import Restoration from "./restoration";

const AddMaterialModal = ({ isOpen, onClose }: ModalProps) => {
  const items = [
    {
      key: "1",
      label: "Material Details",
      children: <MaterialDetails />,
    },
    {
      key: "2",
      label: "Restoration",
      children: <Restoration />,
    },
  ];

  const handleTabChange = (key: string) => {
    console.log("Active tab changed to:", key);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Add Material">
      <p className="text-gray-500 text-sm mb-4">
        Define material properties to optimize restoration and recovery
        processes.
      </p>
      <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
    </CustomModal>
  );
};

export default AddMaterialModal;
