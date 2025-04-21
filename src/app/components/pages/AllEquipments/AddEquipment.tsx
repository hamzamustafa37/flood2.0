import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Select, Input, Upload, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CustomModal from "../../common/Modal";
import { imagesPath, ModalProps } from "@/utils";
import Image from "next/image";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  equipmentName: Yup.string().required("Equipment Name is required"),
  group: Yup.string().required("Group is required"),
  type: Yup.string().required("Type is required"),
  services: Yup.array().min(1, "At least one service is required"),
  location: Yup.string().required("Location/Project is required"),
});

const EquipmentAddModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Formik
      initialValues={{
        equipmentName: "",
        group: "",
        type: "",
        services: [],
        location: "",
        requiresMonitoring: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted values:", values);
        onClose();
      }}
    >
      {({ values, errors, touched, handleSubmit, setFieldValue }) => (
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          title="Register Equipment & Assign Services"
          actions={
            <>
              <Button className="h-[40px] px-6" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="h-[40px] px-6"
                type="primary"
                onClick={() => handleSubmit()}
              >
                Save Equipment
              </Button>
            </>
          }
        >
          <p className="text-gray-500 text-sm mb-4">
            Upload details, assign services, and set up monitoring for better
            tracking.
          </p>
          <Upload className="w-full">
            <Button
              icon={
                <Image
                  src={imagesPath.imageUploader}
                  height={20}
                  width={20}
                  alt="uploader-icon"
                />
              }
              className="border-2 border-dashed border-textLink h-40 w-full flex flex-col items-center justify-center gap-2"
            >
              <p>Drag your photo here or</p>
              <p className="m-0 text-primaryBlue font-semibold">Upload Logo</p>
            </Button>
          </Upload>
          <Form className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Equipment Name
              </label>
              <Input
                className="w-full h-[45px]"
                placeholder="Enter Equipment Name"
                value={values.equipmentName}
                onChange={(e) => setFieldValue("equipmentName", e.target.value)}
              />
              {errors.equipmentName && touched.equipmentName && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.equipmentName}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Group</label>
              <Select
                value={values.group}
                onChange={(value) => setFieldValue("group", value)}
                className="w-full h-[45px]"
                placeholder="Select Group"
              >
                <Option value="group1">Group 1</Option>
                <Option value="group2">Group 2</Option>
              </Select>
              {errors.group && touched.group && (
                <div className="text-red-500 text-sm mt-1">{errors.group}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <Select
                value={values.type}
                onChange={(value) => setFieldValue("type", value)}
                className="w-full h-[45px]"
                placeholder="Select Type"
              >
                <Option value="type1">Type 1</Option>
                <Option value="type2">Type 2</Option>
              </Select>
              {errors.type && touched.type && (
                <div className="text-red-500 text-sm mt-1">{errors.type}</div>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Services</label>
              <Select
                mode="tags"
                value={values.services}
                onChange={(value) => setFieldValue("services", value)}
                className="w-full h-[45px]"
                placeholder="Enter Services"
              />
              {errors.services && touched.services && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.services}
                </div>
              )}
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Assign to Location/Project
              </label>
              <Input
                className="w-full h-[45px]"
                placeholder="Enter Location/Project"
                value={values.location}
                onChange={(e) => setFieldValue("location", e.target.value)}
              />
              {errors.location && touched.location && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.location}
                </div>
              )}
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <Checkbox
                checked={values.requiresMonitoring}
                onChange={(e) =>
                  setFieldValue("requiresMonitoring", e.target.checked)
                }
              />
              <span>Requires monitoring?</span>
            </div>
          </Form>
        </CustomModal>
      )}
    </Formik>
  );
};

export default EquipmentAddModal;
