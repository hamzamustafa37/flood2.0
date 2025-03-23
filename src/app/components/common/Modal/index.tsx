import React from "react";
import { Modal } from "antd";

interface IModal {
  isModalOpen: boolean;
  handleCancel: () => void;
}
const ModalBox = ({ isModalOpen, handleCancel }: IModal) => {
  return (
    <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
export default ModalBox;
