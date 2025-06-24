"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Form, Input, InputRef, Typography, message } from "antd";
import { StepHeader } from "./common/stepHeader";
import { Button } from "../../common";
import { ButtonVariant } from "@/utils";
import {
  saveBooking,
  saveNonScheduledBooking,
} from "@/lib/features/bookService";
import { fetchAddressDetailsFromAddress } from "@/lib/features/location";

interface StepFiveProps {
  formData: IFormData;
  setFormData: (data: Partial<StepFiveProps["formData"]>) => void;
  onPrev: () => void;
  onNext: () => void;
}

const StepFive: React.FC<StepFiveProps> = ({
  formData,
  setFormData,
  onPrev,
  onNext,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const apiKey = "AIzaSyD5dzUNlXR1b7oFj523utB_eZymWX3X0wY";

  // State for address autocomplete dropdown
  const [inputValue, setInputValue] = useState(formData.address || "");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const autocompleteService = useRef<
    google.maps.places.AutocompleteService | undefined
  >(undefined);

  // Load Google Maps Places API script and initialize AutocompleteService
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.id = "google-maps-api";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = () => {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
      };
      document.body.appendChild(script);
    } else {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, [apiKey]);

  // Fetch predictions from Google Places API for inputValue
  const fetchPredictions = (input: string) => {
    if (!autocompleteService.current || input.length === 0) {
      setPredictions([]);
      setDropdownVisible(false);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      { input, types: ["address"] },
      (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          const filtered = results.filter((pred) =>
            pred.description.toLowerCase().startsWith(input.toLowerCase())
          );
          setPredictions(filtered);
          setDropdownVisible(filtered.length > 0);
        } else {
          setPredictions([]);
          setDropdownVisible(false);
        }
      }
    );
  };

  // Handle input changes for address field
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setFormData({ address: val });

    if (val.length > 0) {
      fetchPredictions(val);
    } else {
      setPredictions([]);
      setDropdownVisible(false);
    }
  };

  const onSelectPrediction = async (description: string) => {
    setInputValue(description);
    setDropdownVisible(false);
    setPredictions([]);
    setFormData({ address: description });

    try {
      const res: any = await fetchAddressDetailsFromAddress(description);
      console.log("Address details:", res);
      const fullAddress =
        `${res.streetNumber || ""} ${res.locality || ""}`.trim();

      setFormData({
        address: fullAddress,
        city: res.city || formData.city,
        state: res.state,
        zipCode: res.zipCode,
      });
      form.setFieldsValue({
        address: fullAddress,
        city: res.city || formData.city,
        state: res.state,
        zipCode: res.zipCode,
      });
      setInputValue(fullAddress);
    } catch (err) {
      console.error("Failed to fetch address details:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      let res: any = null;

      if (formData.urgency === "scheduled") {
        res = await saveBooking(formData, "normal", "approved");
      } else {
        res = await saveNonScheduledBooking(formData as any);
      }

      if (res) {
        message.success("Booking saved successfully!");
        onNext();
      }
    } catch (err: any) {
      message.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StepHeader
        label="Final Details – Let’s Get You Scheduled!"
        heading="Just a few more details to confirm your booking."
      />
      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        className="mt-6"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Enter your name" }]}
        >
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            size="large"
            className="p-3 bg-gray-100 rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Enter your phone" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter 10-digit phone number",
            },
          ]}
        >
          <Input
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ phone: e.target.value })}
            size="large"
            className="p-3 bg-gray-100 rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Enter your address" }]}
          style={{ position: "relative" }}
        >
          <Input
            placeholder="Start typing address"
            value={inputValue}
            onChange={onInputChange}
            size="large"
            className="p-3 bg-gray-100 rounded-md"
            autoComplete="off"
          />
          {/* Dropdown */}
          {dropdownVisible && (
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                border: "1px solid #ccc",
                maxHeight: 200,
                overflowY: "auto",
                position: "absolute",
                width: "100%",
                backgroundColor: "white",
                zIndex: 10,
                borderRadius: 4,
              }}
            >
              {predictions.map((pred) => (
                <li
                  key={pred.place_id}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #eee",
                    cursor: "pointer",
                  }}
                  onClick={() => onSelectPrediction(pred.description)}
                >
                  {pred.description}
                </li>
              ))}
            </ul>
          )}
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please enter your city" }]}
        >
          <Input
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ city: e.target.value })}
            size="large"
            className="p-3 bg-gray-100 rounded-md"
          />
        </Form.Item>

        <Form.Item label="State" name="state">
          <Input
            disabled
            value={formData.state}
            size="large"
            className="p-3 bg-gray-100 rounded-md"
          />
        </Form.Item>

        <Form.Item label="ZIP Code" name="zipCode">
          <Input
            disabled
            value={formData.zipCode}
            size="large"
            className="p-3 bg-gray-100 rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Enter your email" }]}
        >
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ email: e.target.value })}
            size="large"
            className="p-3 bg-gray-100 rounded-md"
          />
        </Form.Item>

        <div className="flex justify-between mt-6">
          <Button
            variant={ButtonVariant.Light}
            className="h-10 w-full sm:w-40"
            onClick={onPrev}
          >
            Previous
          </Button>
          <Button
            variant={ButtonVariant.ThemeColor}
            className="h-10 w-full sm:w-40"
            loading={loading}
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StepFive;
