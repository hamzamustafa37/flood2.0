"use client";

import { Card } from "antd";
import { ProgressBar } from "../../common";
import React from "react";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";
import StepFive from "./stepeFive";
import StepSix from "./stepSix";

export const Book: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    issues: [] as string[],
    zipCode: "",
    affectedAreas: [] as string[],
    affectedSize: "",
    urgency: "",
    propertyType: "",
    additionalInfo: "",
    causes: [] as string[],
    uploadedImage: null as File | null,
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    email: "",
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  console.log("Form Data", formData);
  const steps = [
    {
      title: "Step 1",
      content: (
        <StepOne
          formData={formData}
          setFormData={updateFormData}
          onNext={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: "Step 2",
      content: (
        <StepTwo
          formData={formData}
          setFormData={updateFormData}
          onNext={() => setCurrentStep(2)}
          onPrev={() => setCurrentStep(0)}
        />
      ),
    },
    {
      title: "Step 3",
      content: (
        <StepThree
          formData={formData}
          setFormData={updateFormData}
          onNext={() => setCurrentStep(3)}
          onPrev={() => setCurrentStep(1)}
        />
      ),
    },
    {
      title: "Step 4",
      content: (
        <StepFour
          formData={formData}
          setFormData={updateFormData}
          onNext={() => setCurrentStep(4)}
          onPrev={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: "Step 5",
      content: (
        <StepFive
          formData={formData}
          setFormData={updateFormData}
          onNext={() => setCurrentStep(5)}
          onPrev={() => setCurrentStep(4)}
        />
      ),
    },
    {
      title: "Step 6",
      content: <StepSix name={formData.name} />,
    },
  ];

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-10">
      <div className="p-2 text-center">
        <h1 className="text-black text-4xl font-semibold">
          Book Water Damage Help in Minutes
        </h1>
        <p className="text-black text-lg mt-2">
          Answer a few quick questions so we can connect you with the
          best-certified team near you — fast, reliable, and ready when you need
          them.
        </p>
      </div>

      <Card className="w-full max-w-2xl mx-auto mt-10 p-6 shadow-lg">
        <ProgressBar percent={progressPercentage} />
        <div className="mt-6">{steps[currentStep].content}</div>
      </Card>
    </div>
  );
};
