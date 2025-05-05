import React from "react";
import { GlobalLayout } from "../components/layouts/global";

interface IPublicLayout {
  readonly children: React.ReactNode;
}

export default function GlobalLayoutMain({
  children,
}: IPublicLayout): React.ReactElement {
  return <GlobalLayout> {children} </GlobalLayout>;
}
