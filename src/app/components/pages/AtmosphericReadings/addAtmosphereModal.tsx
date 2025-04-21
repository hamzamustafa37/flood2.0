import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Select, InputNumber } from "antd";
import CustomModal from "../../common/Modal";
import { ModalProps } from "@/utils";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  temperature: Yup.string().required("Temperature is required"),
  humidity: Yup.number().min(0).max(100).required("Humidity is required"),
  airPressure: Yup.string().required("Air Pressure is required"),
  location: Yup.string().required("Location is required"),
});

const AddAtmosphericReadingModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Formik
      initialValues={{
        temperature: "",
        humidity: undefined,
        airPressure: "",
        location: "",
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
          title="Add Atmospheric Reading"
          actions={
            <>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={() => handleSubmit()}>
                Save Reading
              </Button>
            </>
          }
        >
          <h4 className="text-sm text-secondary font-normal pt-2">
            Manually input temperature, humidity, and air pressure readings to
            ensure accurate tracking and analysis.
          </h4>
          <Form className="grid grid-cols-2 py-3 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Temperature (°F/°C)
              </label>
              <Select
                value={values.temperature}
                onChange={(value) => setFieldValue("temperature", value)}
                className="w-full"
              >
                <Option value="F">Fahrenheit (°F)</Option>
                <Option value="C">Celsius (°C)</Option>
              </Select>
              {errors.temperature && touched.temperature && (
                <div className="text-red-500 text-sm">{errors.temperature}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Humidity (%)</label>
              <InputNumber
                value={values.humidity}
                onChange={(value) => setFieldValue("humidity", value)}
                min={0}
                max={100}
                className="w-full h-[45px]"
              />
              {errors.humidity && touched.humidity && (
                <div className="text-red-500 text-sm">{errors.humidity}</div>
              )}
            </div>

            {/* Air Pressure Selection */}
            <div>
              <label className="block text-sm font-medium">
                Air Pressure (hPa/inHg)
              </label>
              <Select
                value={values.airPressure}
                onChange={(value) => setFieldValue("airPressure", value)}
                className="w-full"
              >
                <Option value="hPa">Hectopascal (hPa)</Option>
                <Option value="inHg">Inches of Mercury (inHg)</Option>
              </Select>
              {errors.airPressure && touched.airPressure && (
                <div className="text-red-500 text-sm">{errors.airPressure}</div>
              )}
            </div>

            {/* Location Selection */}
            <div>
              <label className="block text-sm font-medium">Location</label>
              <Select
                value={values.location}
                onChange={(value) => setFieldValue("location", value)}
                className="w-full"
              >
                <Option value="NY">New York</Option>
                <Option value="CA">California</Option>
              </Select>
              {errors.location && touched.location && (
                <div className="text-red-500 text-sm">{errors.location}</div>
              )}
            </div>
          </Form>
        </CustomModal>
      )}
    </Formik>
  );
};

export default AddAtmosphericReadingModal;
