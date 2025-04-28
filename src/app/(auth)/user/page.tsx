import React from "react";
import type { Metadata, NextPage } from "next";
import AllUserData from "@/app/components/pages/Users";

const Users: NextPage = () => <AllUserData />;

export const metadata: Metadata = {
  title: "Flood - Payable",
};

export default Users;
