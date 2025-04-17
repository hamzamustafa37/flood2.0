import React from "react";
import type { Metadata, NextPage } from "next";
import LoginOptions from "@/app/components/pages/login";

const LoginPage: NextPage = () => <LoginOptions />;

export const metadata: Metadata = {
  title: "Flood - Login",
};

export default LoginPage;
