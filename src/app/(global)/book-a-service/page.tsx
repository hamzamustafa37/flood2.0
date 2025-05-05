import React from "react";
import type { Metadata, NextPage } from "next";
import { Book } from "@/app/components/pages/Book";

const bookService: NextPage = () => <Book />;

export const metadata: Metadata = {
  title: "Flood - BookingService",
};

export default bookService;
