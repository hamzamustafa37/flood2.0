import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Select, Input, DatePicker, Upload, Checkbox, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CustomModal from "../../common/Modal";
import { ModalProps } from "@/utils";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  equipment: Yup.string().required("Equipment is required"),
  readingValue: Yup.string().required("Reading value is required"),
  dateTime: Yup.string().required("Date & Time is required"),
  status: Yup.string().required("Status is required"),
});

const InventoryModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Formik
      initialValues={{
        equipment: "",
        threshold: "",
        currentStock: "",
        itemName: "",
        itemCode: "",
        floodTeamAllocation: "",
        syncMonitoring: false,
        tags: [],
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
          title="Record New Exhaust Reading"
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
                Save
              </Button>
            </>
          }
        >
          <p className="text-gray-500 text-sm mb-4">
            Manually enter or sync real-time exhaust readings to maintain
            accuracy and compliance.
          </p>
          <Form className="grid grid-cols-2 gap-4">
            {/* Equipment Selection */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Item Name
              </label>
              <Input
                className="w-full h-[45px]"
                placeholder="Enter Value"
                value={values.itemName}
                onChange={(e) => setFieldValue("itemName", e.target.value)}
              />
              {errors.itemName && touched.itemName && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.itemName}
                </div>
              )}
            </div>
            {/* item Code */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Item Code
              </label>
              <Input
                className="w-full h-[45px]"
                placeholder="Enter Value"
                value={values.itemCode}
                onChange={(e) => setFieldValue("itemCode", e.target.value)}
              />
              {errors.itemCode && touched.itemCode && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.itemCode}
                </div>
              )}
            </div>

            {/* Status Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Flood Team Allocation
              </label>
              <Select
                value={values.floodTeamAllocation}
                onChange={(value) =>
                  setFieldValue("floodTeamAllocation", value)
                }
                className="w-full h-[45px]"
                placeholder="Select Status"
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
              {errors.floodTeamAllocation && touched.floodTeamAllocation && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.floodTeamAllocation}
                </div>
              )}
            </div>
            {/* Equipment Selection */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Equipment
              </label>
              <Select
                value={values.equipment}
                onChange={(value) => setFieldValue("equipment", value)}
                className="w-full h-[45px]"
                placeholder="Select Equipment"
              >
                <Option value="engine1">Engine 1</Option>
                <Option value="engine2">Engine 2</Option>
              </Select>
              {errors.equipment && touched.equipment && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.equipment}
                </div>
              )}
            </div>
            {/* Reading Value */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Stock
              </label>
              <Input
                className="w-full h-[45px]"
                placeholder="Enter Value"
                value={values.currentStock}
                onChange={(e) => setFieldValue("currentStock", e.target.value)}
              />

              {errors.currentStock && touched.currentStock && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.currentStock}
                </div>
              )}
              {/* Reading Value */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Restock Alert Threshold
                </label>
                <Input
                  className="w-full h-[45px]"
                  placeholder="Enter Value"
                  value={values.threshold}
                  onChange={(e) => setFieldValue("threshold", e.target.value)}
                />
                {errors.threshold && touched.threshold && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.threshold}
                  </div>
                )}
              </div>
            </div>
            {/* File Upload */}
            <div className="col-span-2">
              <Upload className="w-full">
                <Button
                  className="w-full h-[60px] flex justify-center items-center"
                  icon={<UploadOutlined />}
                >
                  Upload Report/Image
                </Button>
              </Upload>
            </div>
            {/* Sync Checkbox */}
            <div className="col-span-2 flex items-center gap-2">
              <Checkbox
                checked={values.syncMonitoring}
                onChange={(e) =>
                  setFieldValue("syncMonitoring", e.target.checked)
                }
              />
              <span>Sync with Monitoring System</span>
            </div>
            {/* Tags Input */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Tags</label>
              <Select
                mode="tags"
                value={values.tags}
                onChange={(value) => setFieldValue("tags", value)}
                className="w-full h-[45px]"
                placeholder="Enter Tags"
              />
            </div>
          </Form>
        </CustomModal>
      )}
    </Formik>
  );
};

export default InventoryModal;
