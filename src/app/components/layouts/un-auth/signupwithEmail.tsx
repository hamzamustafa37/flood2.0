import React from "react";
import { Form, Input, Button, message } from "antd";
import { useAppDispatch } from "@/lib/hooks";
import { _signupContractor } from "@/lib/features/auth";
import { useRouter } from "next/navigation";

interface ISignupWithEmailProps {
  setShowEmailInput: (show: boolean) => void;
}
const SignupWithEmail = ({ setShowEmailInput }: ISignupWithEmailProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    dispatch(_signupContractor(router, "/contractor-dashboard", values));
  };

  return (
    <div className="mt-4 w-full max-w-[400px] mx-auto">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input size="large" placeholder="Enter Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input size="large" placeholder="Enter Email Address" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password size="large" placeholder="Enter Password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Sign Up with Email
          </Button>
        </Form.Item>

        <Form.Item>
          <Button block size="large" onClick={() => setShowEmailInput(false)}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupWithEmail;
