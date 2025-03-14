import React from "react";
import { UnAuthLayout } from "../components/layouts";

interface IUnAuthLayout {
  readonly children: React.ReactNode;
}

export default function UnAuthLayoutMain({
  children,
}: IUnAuthLayout): React.ReactElement {
  // UnAuthLayout Wrapper
  return <UnAuthLayout> {children} </UnAuthLayout>;
}
