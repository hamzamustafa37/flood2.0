import React from "react";
import type { Metadata, NextPage } from "next";
import AllDots from "@/app/components/pages/AllDots";

const Dots: NextPage = () => <AllDots />;

export const metadata: Metadata = {
  title: "Flood - Causes",
};

export default Dots;
