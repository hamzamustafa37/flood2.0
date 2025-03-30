import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Select, Input, DatePicker, Radio } from "antd";
import CustomModal from "../../common/Modal";
import { ModalProps } from "@/utils";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  campaignName: Yup.string().required("Campaign Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  googleTagId: Yup.string().required("Google Tag Manager ID is required"),
  jobType: Yup.string().required("Job Type is required"),
  location: Yup.string().required("Location is required"),
  payModel: Yup.string().required("Pay Model is required"),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
  campaignDescription: Yup.string().required(
    "Campaign Description is required"
  ),
  status: Yup.string().required("Campaign Status is required"),
});

const AddCampaignModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Formik
      initialValues={{
        campaignName: "",
        phoneNumber: "",
        googleTagId: "",
        jobType: "",
        location: "",
        payModel: "",
        startDate: "",
        endDate: "",
        campaignDescription: "",
        status: "active",
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
          title="Create a New Campaign"
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
                Save Campaign
              </Button>
            </>
          }
        >
          <p className="text-gray-500 text-sm mb-4">
            Set up and customize your campaign details, targeting options, and
            job settings to optimize performance.
          </p>
          <Form className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Campaign Name
              </label>
              <Input
                className="w-full h-[45px]"
                placeholder="Enter Campaign Name"
                value={values.campaignName}
                onChange={(e) => setFieldValue("campaignName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <Input
                className="w-full h-[45px]"
                placeholder="Enter Phone Number"
                value={values.phoneNumber}
                onChange={(e) => setFieldValue("phoneNumber", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Google Tag Manager ID
              </label>
              <Input
                className="w-full h-[45px]"
                placeholder="Enter Google Tag ID"
                value={values.googleTagId}
                onChange={(e) => setFieldValue("googleTagId", e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Job Types
              </label>
              <Select
                className="w-full h-[45px]"
                placeholder="Select Job Type"
                value={values.jobType}
                onChange={(value) => setFieldValue("jobType", value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Select
                className="w-full h-[45px]"
                placeholder="Select Location"
                value={values.location}
                onChange={(value) => setFieldValue("location", value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Pay Model
              </label>
              <Select
                className="w-full h-[45px]"
                placeholder="Select Pay Model"
                value={values.payModel}
                onChange={(value) => setFieldValue("payModel", value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <DatePicker
                className="w-full h-[45px]"
                onChange={(date, dateString) =>
                  setFieldValue("startDate", dateString)
                }
                placeholder="Select Start Date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <DatePicker
                className="w-full h-[45px]"
                onChange={(date, dateString) =>
                  setFieldValue("endDate", dateString)
                }
                placeholder="Select End Date"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Campaign Description
              </label>
              <Input.TextArea
                className="w-full"
                placeholder="Enter Campaign Description"
                value={values.campaignDescription}
                onChange={(e) =>
                  setFieldValue("campaignDescription", e.target.value)
                }
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Campaign Status
              </label>
              <Radio.Group
                value={values.status}
                onChange={(e) => setFieldValue("status", e.target.value)}
              >
                <Radio value="active">Active</Radio>
                <Radio value="paused">Paused</Radio>
              </Radio.Group>
            </div>
          </Form>
        </CustomModal>
      )}
    </Formik>
  );
};

export default AddCampaignModal;
