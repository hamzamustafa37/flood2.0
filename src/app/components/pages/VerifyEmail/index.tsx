"use client";
import { _verifyEmail } from "@/lib/features/auth";
import { loading } from "@/lib/features/global";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { appRoute } from "@/utils";
import { Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const oobCode = searchParams.get("oobCode")?.replace(/"/g, "");
  const uid = searchParams.get("uid")?.replace(/"/g, "");
  const _loading = useAppSelector(loading);

  console.log("param", oobCode);
  console.log("param", uid);

  const handleVerifyEmail = () => {
    if (oobCode && uid) {
      dispatch(_verifyEmail(router, appRoute.login, oobCode, uid));
    } else {
      console.error("Invalid verification parameters.");
      router.push(appRoute.login);
    }
  };

  return (
    <div className="flex items-center justify-center h-[80%] bg-gray-100">
      <div className=" flex flex-col items-center justify-center border p-6 rounded-lg shadow-md bg-white">
        <h4 className="text-[black]"> Welcome to the Disaster Logic</h4>
        <p className="text-lg text-[black]">
          . A verification link has been sent to your email address.
        </p>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleVerifyEmail}
          disabled={_loading.VERIFY_EMAIL}
        >
          {_loading.VERIFY_EMAIL ? <Spin /> : "Verify Email"}
        </button>
      </div>
    </div>
  );
};
export default VerifyEmail;
