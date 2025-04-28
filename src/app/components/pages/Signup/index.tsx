"use client";

import React from "react";
import { ButtonVariant } from "@/utils";
import { Input } from "antd";
import { Button } from "../../common";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const [showPhoneInput, setShowPhoneInput] = React.useState(false);
  const router = useRouter();

  return (
    <>
      {showPhoneInput ? (
        <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-[400px]">
          <Input
            type="text"
            placeholder="Enter Email Address"
            className="w-full px-4 py-5 border border-gray-300 rounded"
          />
          <Button
            onClick={() => router.push("/api/auth/signin")}
            className="w-full py-4"
            variant={ButtonVariant.Outline}
          >
            Submit
          </Button>
          <Button
            onClick={() => setShowPhoneInput(false)}
            className="py-4 w-full"
            variant={ButtonVariant.OutlineSecondary}
          >
            Back
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-[400px] flex flex-col gap-3 mt-4">
          <Button
            onClick={() => router.push("/api/auth/signin?provider=google")}
            className="w-full py-4"
            variant={ButtonVariant.OutlineDanger}
          >
            Signup with Google
          </Button>

          <Button
            onClick={() => setShowPhoneInput(true)}
            className="bg-[#f5f7fa] text-black px-4 py-4 rounded w-full"
            variant={ButtonVariant.Outline}
          >
            Signup with Email
          </Button>
        </div>
      )}
    </>
  );
}
