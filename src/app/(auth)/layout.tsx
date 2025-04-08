import React from "react";
import { AuthLayout } from "../components/layouts/auth";

interface IPublicLayout {
  readonly children: React.ReactNode;
}

export default function AuthLayoutMain({
  children,
}: IPublicLayout): React.ReactElement {
  return <AuthLayout> {children} </AuthLayout>;
}
