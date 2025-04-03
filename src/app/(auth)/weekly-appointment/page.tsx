import React from "react";
import type { Metadata, NextPage } from "next";
import AppointmentWeek from "@/app/components/pages/Appointments";

const appointments: NextPage = () => <AppointmentWeek />;

export const metadata: Metadata = {
  title: "Flood - Appointment",
};

export default appointments;
