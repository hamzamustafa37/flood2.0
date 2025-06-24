"use client";
import { appRoute, ButtonVariant } from "@/utils";
import React, { useState } from "react";
import { Button } from "../../common";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { _googleLogin } from "@/lib/features/auth";
import LoginWithEmail from "./loginWithEmail";

export default function LoginPage() {
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <>
      {showPhoneInput ? (
        <LoginWithEmail setShowPhoneInput={setShowPhoneInput} />
      ) : (
        <div className="w-full max-w-[400px] flex flex-col gap-3 mt-4">
          <Button
            onClick={() =>
              dispatch(_googleLogin(router, appRoute.contractorDashboard))
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
