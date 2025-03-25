import { Modal } from "antd";
import React from "react";
interface AddAtmosphereModalProps {
  show: boolean;
  handleClose: () => void;
}

const AddAtmosphereModal = ({ show, handleClose }: AddAtmosphereModalProps) => {
  return (
    <div>
      <Modal open={show} onClose={handleClose}></Modal>
    </div>
  );
};
export default AddAtmosphereModal;
