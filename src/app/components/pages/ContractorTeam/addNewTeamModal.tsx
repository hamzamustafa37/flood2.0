import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  Spin,
  Modal,
  Tag,
  Typography,
} from "antd";

import PropTypes from "prop-types";

import { CloseCircleOutlined } from "@ant-design/icons";
import {
  addTeam,
  getTeamById,
  getTeamsPagination,
  updateTeam,
} from "@/lib/features/team";

const { Text } = Typography;

interface IAddTeamProps {
  id: string;
  visible: boolean;
  onClose: (visible: boolean) => void;
}
const AddNewTeam = ({ id, visible, onClose }: IAddTeamProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [zip, setZip] = useState("");
  const [zipCodes, setZipCodes] = useState<Array<string>>([]);
  const [zipCodeErrors, setZipCodeErrors] = useState("");
  const [serviceError, setServiceError] = useState("");

  const [available, setAvailable] = useState(false);
  const [waterDamage, setWaterDamage] = useState(false);
  const [plumbing, setPlumbing] = useState(false);
  const [staffId, setStaffId] = useState("");

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        const response: any = await getTeamById(id);
        console.log("Fetched team data:", response);
        if (response) {
          form.setFieldsValue({
            name: response.name,
            email: response.email,
            mobileNumber: formatPhone(response.mobileNumber),
          });
          setZipCodes(response.zipCodes || []);
          setAvailable(response.available || false);
          setWaterDamage(response.waterDamage || false);
          setPlumbing(response.plumbing || false);
          setStaffId(response.staffId);
        }
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTeamData();
    }
  }, [id, form]);

  const formatPhone = (value: string) => {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const validateZipCode = (zipCode: string) => {
    if (!zipCode.trim()) return "Zipcode is required";
    if (!/^\d{5}$/.test(zipCode)) return "Valid 5-digit zip code is required";
    return "";
  };

  const handleZipAdd = () => {
    setZipCodeErrors("");
    const zipCodesArray = [...new Set(zip.split(",").map((z) => z.trim()))];

    const invalid = zipCodesArray.filter((z) => validateZipCode(z));
    if (invalid.length > 0) {
      setZipCodeErrors(invalid.join(", ") + " are invalid");
      return;
    }

    const newZips = zipCodesArray.filter((z) => !zipCodes.includes(z));
    if (zipCodes.length + newZips.length <= 20) {
      setZipCodes([...zipCodes, ...newZips]);
      setZip("");
    } else {
      setZipCodeErrors("Maximum limit is 20 zip codes");
    }
  };

  const handleSubmit = async (values: any) => {
    if (!waterDamage && !plumbing) {
      setServiceError("At least one service must be selected.");
      return;
    } else {
      setServiceError("");
    }

    const formData = {
      ...values,
      mobileNumber: values.mobileNumber.replace(/\D/g, ""),
      zipCodes,
      available,
      waterDamage,
      plumbing,
      staffId,
    };

    setLoading(true);
    try {
      console.log("Submitting form data:", formData);
      const response = id
        ? await updateTeam(id, formData)
        : await addTeam(formData);
      if (response) {
        await getTeamsPagination(1);
        form.resetFields();
        setZipCodes([]);
        setZip("");
        setAvailable(false);
        setWaterDamage(false);
        setPlumbing(false);
        setStaffId("");
        onClose(false);
      }
      console.log("Response:", response);
      onClose(false);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveZip = (index: number) => {
    setZipCodes(zipCodes.filter((_, i) => i !== index));
  };

  return (
    <Modal
      open={visible}
      title={id ? "Update Team Member" : "Create New Team Member"}
      onCancel={() => onClose(false)}
      footer={null}
      centered
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="mobileNumber"
            label="Mobile Number"
            rules={[
              { required: true, message: "Mobile number is required" },
              {
                pattern: /^\d{3}-\d{3}-\d{4}$/,
                message: "Invalid phone format (e.g. 123-456-7890)",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                form.setFieldsValue({
                  mobileNumber: formatPhone(value),
                });
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Add Zipcode (press enter)">
            <Input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              onPressEnter={(e) => {
                e.preventDefault();
                handleZipAdd();
              }}
              placeholder="Add zip codes separated by commas"
            />
            {zipCodeErrors && <Text type="danger">{zipCodeErrors}</Text>}
          </Form.Item>

          <Form.Item>
            {zipCodes.map((z, idx) => (
              <Tag
                key={idx}
                closable
                onClose={() => handleRemoveZip(idx)}
                closeIcon={<CloseCircleOutlined />}
              >
                {z}
              </Tag>
            ))}
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            >
              Available to Work
            </Checkbox>
          </Form.Item>

          <Form.Item label="Services">
            <Checkbox
              checked={waterDamage}
              onChange={(e) => setWaterDamage(e.target.checked)}
            >
              Water Damage
            </Checkbox>
            <Checkbox
              checked={plumbing}
              onChange={(e) => setPlumbing(e.target.checked)}
            >
              Plumbing
            </Checkbox>
            {serviceError && <Text type="danger">{serviceError}</Text>}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default AddNewTeam;
