import React from "react";
import type { Metadata, NextPage } from "next";
import CreateAccount from "@/app/components/pages/Signup";

const signup: NextPage = () => <CreateAccount />;

export const metadata: Metadata = {
  title: "Flood - Sign-up",
};

export default signup;
