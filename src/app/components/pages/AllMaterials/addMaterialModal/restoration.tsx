"use client";

import { useState } from "react";
import { Form, Select, Input, Button } from "antd";

const Restoration = () => {
  // State variables for form fields
  const [restorabilityLevel, setRestorabilityLevel] = useState(null);
  const [damageResistanceNotes, setDamageResistanceNotes] = useState("");

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <p className="text-gray-600 mb-4">
        Define how easily this material can be restored after damage.
      </p>

      <Form layout="vertical">
        {/* Restorability Level */}
        <Form.Item label="RESTORABILITY LEVEL">
          <Select
            value={restorabilityLevel}
            onChange={setRestorabilityLevel}
            placeholder="Select Restorability Level"
            className="w-full h-[45px] border border-gray-300 rounded-md"
          >
            <Select.Option value="level1">Level 1</Select.Option>
            <Select.Option value="level2">Level 2</Select.Option>
            <Select.Option value="level3">Level 3</Select.Option>
          </Select>
        </Form.Item>

        {/* Damage Resistance Notes */}
        <Form.Item label="DAMAGE RESISTANCE NOTES">
          <Input.TextArea
            value={damageResistanceNotes}
            onChange={(e) => setDamageResistanceNotes(e.target.value)}
            placeholder="Enter notes about damage resistance"
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
            rows={4} // Set the number of rows for the text area
          />
        </Form.Item>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="default"
            className="border border-primaryBlue text-primaryBlue px-4 py-2 h-[45px] rounded-md"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="bg-primaryBlue px-4 py-2 h-[45px] rounded-md text-white"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Restoration;
