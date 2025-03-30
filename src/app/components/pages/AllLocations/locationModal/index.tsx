import CustomModal from "@/app/components/common/Modal";
import { ModalProps } from "@/utils";
import { Tabs } from "antd";
import React from "react";
import BasicLocationForm from "./basicLocation";
import ContactLocation from "./contact";
import Service from "./service";
import Integration from "./integration";

const LocationModal = ({ isOpen, onClose }: ModalProps) => {
  const items = [
    {
      key: "1",
      label: "Basic",
      children: <BasicLocationForm />,
    },
    {
      key: "2",
      label: "Contact",
      children: <ContactLocation />,
    },
    {
      key: "3",
      label: "Service",
      children: <Service />,
    },
    {
      key: "4",
      label: "Integration",
      children: <Integration />,
    },
  ];

  const handleTabChange = (key: string) => {
    console.log("Active tab changed to:", key);
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Register New Company">
      <p className="text-gray-500 text-sm mb-4">
        Define and configure location details in a structured and simplified
        way.
      </p>
      <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
    </CustomModal>
  );
};

export default LocationModal;
