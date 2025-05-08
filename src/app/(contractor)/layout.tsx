import React from "react";
import { ContractorLayout } from "../components/layouts/contractor";

interface IPublicLayout {
  readonly children: React.ReactNode;
}

export default function ContractorLayoutMain({
  children,
}: IPublicLayout): React.ReactElement {
  return <ContractorLayout> {children} </ContractorLayout>;
}
