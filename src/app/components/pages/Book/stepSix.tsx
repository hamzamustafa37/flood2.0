import { ButtonVariant, imagesPath } from "@/utils";
import { Typography } from "antd";
import Image from "next/image";
import React from "react";
import { Button } from "../../common";
import { useRouter } from "next/navigation";

interface StepSixProps {
  name: string;
}

const StepSix: React.FC<StepSixProps> = ({ name }) => {
  const { Title, Text } = Typography;
  const router = useRouter();
  const handleSubmit = () => {
    // Handle the form submission logic here
    console.log("Form submitted");
  };
  return (
    <div className="    text-center">
      <Image
        src={imagesPath.completed}
        alt="completed"
        width={100}
        height={100}
        className="mx-auto"
      />
      <div className=" mt-4">
        <Title level={3} type="success">
          Booking Confirmed!
        </Title>
        <Text>Your request has been successfully submitted.</Text>
        <br />
        <Text>Thank you, {name}! Our team is on it.</Text>
      </div>

      <div className="flex flex-wrap sm:justify-between justify-center mt-6">
        <Button
          onClick={() => {
            router.push("/");
          }}
          variant={ButtonVariant.Light}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-[40px] w-[140px] m-2"
        >
          Back To home
        </Button>
        <Button
          className="h-[40px] w-[140px] m-2"
          onClick={handleSubmit}
          variant={ButtonVariant.ThemeColor}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default StepSix;
