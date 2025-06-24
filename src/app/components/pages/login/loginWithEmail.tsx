"use client";

import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { _signIn } from "@/lib/features/auth";
import { useRouter } from "next/navigation";
import { appRoute } from "@/utils";
import { loading } from "@/lib/features/global";

interface ILoginWithEmailProps {
  setShowPhoneInput: (show: boolean) => void;
}

const LoginWithEmail = ({ setShowPhoneInput }: ILoginWithEmailProps) => {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const _loading = useAppSelector(loading);
  const handleEmailChange = async () => {
    try {
      await form.validateFields(["email"]);
      setShowPassword(true);
    } catch {
      setShowPassword(false);
    }
  };

  const handleSignIn = (values: { email: string; password: string }) => {
    dispatch(
      _signIn(values.email, values.password, () => {
        router.push(appRoute.contractorDashboard);
      })
    );
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-[400px]">
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        className="w-full"
        onFinish={handleSignIn}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            className="bg-[#f5f7fa] text-black px-4 py-3 rounded-sm w-full"
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </Form.Item>

        {showPassword && (
          <>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                className="bg-[#f5f7fa] text-black px-4 py-3 rounded-sm w-full"
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="px-4 py-5 rounded w-full"
                disabled={_loading.SIGN_IN}
              >
                {_loading.SIGN_IN ? <Spin /> : "Sign In"}
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
};

export default LoginWithEmail;
