"use client";

import { useState } from "react";
import { Form, Input, Button } from "antd";

const Integration = () => {
  // State variables for form fields
  const [googleCalendarId, setGoogleCalendarId] = useState("");
  const [googleTagManagerId, setGoogleTagManagerId] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [googleReviewLink, setGoogleReviewLink] = useState("");
  const [roleForTransfers, setRoleForTransfers] = useState("");

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Form layout="vertical">
        {/* Google Calendar ID */}
        <Form.Item label="GOOGLE CALENDAR ID">
          <Input
            value={googleCalendarId}
            onChange={(e) => setGoogleCalendarId(e.target.value)}
            placeholder="Enter Google Calendar ID"
            className="w-full h-[45px] border border-gray-300 rounded-md p-2"
          />
        </Form.Item>

        {/* Grid for Google Tag Manager ID and Campaign ID */}
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="GOOGLE TAG MANAGER ID">
            <Input
              value={googleTagManagerId}
              onChange={(e) => setGoogleTagManagerId(e.target.value)}
              placeholder="Enter Google Tag Manager ID"
              className="w-full h-[45px] border border-gray-300 rounded-md p-2"
            />
          </Form.Item>
          <Form.Item label="CAMPAIGN ID">
            <Input
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              placeholder="Enter Campaign ID"
              className="w-full h-[45px] border border-gray-300 rounded-md p-2"
            />
          </Form.Item>
        </div>

        {/* Google Review Link */}
        <Form.Item label="GOOGLE REVIEW LINK">
          <Input
            value={googleReviewLink}
            onChange={(e) => setGoogleReviewLink(e.target.value)}
            placeholder="Enter Google Review Link"
            className="w-full h-[45px] border border-gray-300 rounded-md p-2"
          />
        </Form.Item>

        {/* Role for Transfers */}
        <Form.Item label="ROLE FOR TRANSFERS">
          <Input
            value={roleForTransfers}
            onChange={(e) => setRoleForTransfers(e.target.value)}
            placeholder="Enter Role for Transfers"
            className="w-full h-[45px] border border-gray-300 rounded-md p-2"
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
            Save Location
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Integration;
