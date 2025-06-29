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
import StepFourB from "./stepFourB";

export const Book: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [useStep4B, setUseStep4B] = React.useState(false);
  const [employees, setEmployees] = React.useState<any>();
  const [formData, setFormData] = React.useState({
    issues: [] as string[],
    zipCode: "",
    affectedAreas: [] as string[],
    affectedSize: "",
    urgency: "",
    propertyType: "",
    additionalInfo: "",
    causes: [] as string[],
    ImageURL: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    email: "",
    schedule: {
      date: "",
      slot: {
        start: "",
        end: "",
      },
    },
    empId: "",
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  console.log(employees, "the formData");
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
          setEmployees={setEmployees}
          setUseStep4B={setUseStep4B}
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
          onNext={() => (useStep4B ? setCurrentStep(4) : setCurrentStep(5))}
          onPrev={() => setCurrentStep(2)}
        />
      ),
    },
    {
      title: "Step 4-B",
      content: (
        <StepFourB
          formData={formData}
          setFormData={updateFormData}
          onNext={() => setCurrentStep(5)}
          onPrev={() => setCurrentStep(3)}
          employees={employees}
          duration={60}
          bufferTime={30}
        />
      ),
    },
    {
      title: "Step 5",
      content: (
        <StepFive
          formData={formData}
          setFormData={updateFormData}
          onNext={() => setCurrentStep(6)}
          onPrev={() => setCurrentStep(useStep4B ? 4 : 3)}
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
