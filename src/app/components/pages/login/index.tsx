"use client";
import React, { useState } from "react";

export default function LoginPage() {
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  return (
    <>
      <div className="w-full max-w-[400px] flex flex-col gap-3 mt-4">
        <button
          onClick={() =>
            (window.location.href = "/api/auth/signin?provider=google")
          }
          className="btn btn-primary w-full"
        >
          Sign in with Google
        </button>

        <button
          onClick={() => setShowPhoneInput(true)}
          className="btn btn-dark w-full"
        >
          Login with Text Message
        </button>

        <button
          onClick={() =>
            (window.location.href = "/api/auth/signin?provider=email")
          }
          className="bg-[#f5f7fa] text-black px-4 py-2 rounded w-full"
        >
          Login with Email
        </button>
      </div>

      {showPhoneInput && (
        <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-[400px]">
          <input
            type="text"
            placeholder="Enter Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <button
            onClick={() =>
              (window.location.href = "/api/auth/signin?provider=text")
            }
            className="btn btn-primary w-full"
          >
            Submit
          </button>
          <button
            onClick={() => setShowPhoneInput(false)}
            className="btn btn-light w-full"
          >
            Back
          </button>
        </div>
      )}
    </>
  );
}
