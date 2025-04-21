import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Select, Input, DatePicker, Upload, Checkbox } from "antd";
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

const RecordExhaustReadingModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Formik
      initialValues={{
        equipment: "",
        readingValue: "",
        dateTime: "",
        status: "",
        syncMonitoring: false,
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
              <Button
                style={{ height: "40px", padding: "0 24px" }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                style={{ height: "40px", padding: "0 24px" }}
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
            <div>
              <label className="block text-sm font-medium mb-1">
                Equipment
              </label>
              <Select
                value={values.equipment}
                onChange={(value) => setFieldValue("equipment", value)}
                style={{ width: "100%", height: "45px" }}
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
                Reading Value
              </label>
              <Input
                style={{ height: "45px" }}
                placeholder="Enter Value"
                value={values.readingValue}
                onChange={(e) => setFieldValue("readingValue", e.target.value)}
              />
              {errors.readingValue && touched.readingValue && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.readingValue}
                </div>
              )}
            </div>
            {/* Date & Time */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date & Time
              </label>
              <DatePicker
                showTime
                style={{ width: "100%", height: "45px" }}
                onChange={(date, dateString) =>
                  setFieldValue("dateTime", dateString)
                }
                placeholder="Select Date & Time"
              />
              {errors.dateTime && touched.dateTime && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.dateTime}
                </div>
              )}
            </div>
            {/* Status Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select
                value={values.status}
                onChange={(value) => setFieldValue("status", value)}
                style={{ width: "100%", height: "45px" }}
                placeholder="Select Status"
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
              {errors.status && touched.status && (
                <div className="text-red-500 text-sm mt-1">{errors.status}</div>
              )}
            </div>
            {/* File Upload */}
            <div className="col-span-2">
              <Upload className="w-full">
                <Button
                  style={{ width: "100%", height: "55px", fontSize: "16px" }}
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
          </Form>
        </CustomModal>
      )}
    </Formik>
  );
};

export default RecordExhaustReadingModal;
