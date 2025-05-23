"use client";
import { ButtonVariant } from "@/utils";
import { Input } from "antd";
import React, { useState } from "react";
import { Button } from "../../common";

export default function LoginPage() {
  const [showPhoneInput, setShowPhoneInput] = useState(false);

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
            onClick={() =>
              (window.location.href = "/api/auth/signin?provider=text")
            }
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
            onClick={() =>
              (window.location.href = "/api/auth/signin?provider=google")
            }
            className="w-full py-4"
            variant={ButtonVariant.OutlineDanger}
          >
            SignIn with Google
          </Button>

          {/* <Button
            onClick={() => setShowPhoneInput(true)}
            className="btn btn-dark w-full py-4"
          >
            Login with Text Message
          </Button> */}

          <Button
            onClick={() => {
              setShowPhoneInput(true);
            }}
            className="bg-[#f5f7fa] text-black px-4 py-4 rounded w-full"
            variant={ButtonVariant.Outline}
          >
            SignIn with Email
          </Button>
        </div>
      )}
    </>
  );
}
