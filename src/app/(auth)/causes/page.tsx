import React from "react";
import type { Metadata, NextPage } from "next";
import AllCauses from "@/app/components/pages/AllCauses";

const Causes: NextPage = () => <AllCauses />;

export const metadata: Metadata = {
  title: "Flood - Causes",
};

export default Causes;
