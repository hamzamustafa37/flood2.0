"use client";

import { useState } from "react";
import { Form, Input, Select, Radio, Button, Tag, Space, Checkbox } from "antd";

const { Option } = Select;

const inputStyle = { height: "45px" };

const CompanyForm = () => {
  const [tags, setTags] = useState(["STUPIDITY", "JERRY", "NOT _THE_MOUSIE"]);
  const [hasMultipleLocations, setHasMultipleLocations] = useState(false);
  const [locations, setLocations] = useState([
    { id: 1, cityState: "", address: "" },
  ]);

  const handleClose = (removedTag: string) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  const handleAddLocation = () => {
    setLocations([
      ...locations,
      { id: locations.length + 1, cityState: "", address: "" },
    ]);
  };

  const handleRemoveLocation = (id: number) => {
    setLocations(locations.filter((location) => location.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-2">
      <Form layout="vertical">
        <Form.Item label="Company Type">
          <Radio.Group defaultValue="vendor">
            <Radio value="vendor">Vendor</Radio>
            <Radio value="insurance">Insurance</Radio>
            <Radio value="referral">Referral</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Company Name">
          <Select placeholder="Select company name" style={inputStyle}>
            <Option value="company1">Company 1</Option>
            <Option value="company2">Company 2</Option>
          </Select>
        </Form.Item>

        <Space size="middle" className="w-full flex">
          <Form.Item label="Company Phone" className="flex-1">
            <Input placeholder="Enter phone number" style={inputStyle} />
          </Form.Item>
          <Form.Item label="Company Email" className="flex-1">
            <Input placeholder="Enter email address" style={inputStyle} />
          </Form.Item>
        </Space>

        <Space size="middle" className="w-full flex">
          <Form.Item label="Cause Name" className="flex-1">
            <Input placeholder="Enter cause name" style={inputStyle} />
          </Form.Item>
          <Form.Item label="Category" className="flex-1">
            <Select placeholder="Select category" style={inputStyle}>
              <Option value="category1">Category 1</Option>
              <Option value="category2">Category 2</Option>
            </Select>
          </Form.Item>
        </Space>

        <Form.Item label="Physical Address">
          <Input placeholder="Enter address" style={inputStyle} />{" "}
          <a href="#">Add Manual</a>
        </Form.Item>

        <Form.Item label="Assign Tags">
          <Space wrap>
            {tags.map((tag) => (
              <Tag closable key={tag} onClose={() => handleClose(tag)}>
                {tag}
              </Tag>
            ))}
          </Space>
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={hasMultipleLocations}
            onChange={(e) => setHasMultipleLocations(e.target.checked)}
          >
            Do you have multiple locations to operate?
          </Checkbox>
        </Form.Item>

        {hasMultipleLocations && (
          <div className="p-2 rounded-md bg-[var(--color-bgComponent)] shadow-lg ">
            {locations.map((location, index) => (
              <div className="p-2">
                <div className="flex justify-between">
                  <h2>Location</h2>
                  <Button
                    danger
                    type="link"
                    onClick={() => handleRemoveLocation(location.id)}
                  >
                    Remove
                  </Button>
                </div>

                <Space key={location.id} className="w-full flex mb-2">
                  <Form.Item label="City/State" className="flex-1">
                    <Select placeholder="Select city/state" style={inputStyle}>
                      <Option value="city1">City 1</Option>
                      <Option value="city2">City 2</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Address" className="flex-1">
                    <Input placeholder="Enter address" style={inputStyle} />
                  </Form.Item>
                </Space>
              </div>
            ))}
            <Button type="link" onClick={handleAddLocation}>
              Add Another Location
            </Button>
          </div>
        )}

        <div className="flex justify-end gap-2 py-2">
          <Button>Cancel</Button>
          <Button type="primary">Next</Button>
        </div>
      </Form>
    </div>
  );
};

export default CompanyForm;
