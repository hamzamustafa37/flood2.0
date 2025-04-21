import React from "react";
import { Modal } from "antd";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={title}
      footer={actions || null}
      centered
      destroyOnClose
    >
      <hr className="text-[#d9d9d9]" />
      <div className="pt-2">{children}</div>
    </Modal>
  );
};

export default CustomModal;
