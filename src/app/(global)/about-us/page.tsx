import React from "react";
import type { Metadata, NextPage } from "next";
import { AboutUs } from "@/app/components/pages/AboutUs";

const AboutUsPage: NextPage = () => <AboutUs />;

export const metadata: Metadata = {
  title: "Flood - About Us",
};

export default AboutUsPage;
