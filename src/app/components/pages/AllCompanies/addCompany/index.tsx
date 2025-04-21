import CustomModal from "@/app/components/common/Modal";
import { ModalProps } from "@/utils";
import { Tabs } from "antd";
import React from "react";
import BasicDetails from "./basicDetails";
import BrandIdentity from "./brandNIdentity";
import AssignAdmin from "./assignAdmin";

const AddCompanyModal = ({ isOpen, onClose }: ModalProps) => {
  const items = [
    {
      key: "1",
      label: "Basic Details",
      children: <BasicDetails />,
    },
    {
      key: "2",
      label: "Brand & Identity",
      children: <BrandIdentity />,
    },
    {
      key: "3",
      label: "Admin Setup",
      children: <AssignAdmin />,
    },
  ];

  const handleTabChange = (key: string) => {
    console.log("Active tab changed to:", key);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Register New Company">
      <p className="text-gray-500 text-sm mb-4">
        Set up and customize your company details, branding, and admin settings.
      </p>
      <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
    </CustomModal>
  );
};

export default AddCompanyModal;
