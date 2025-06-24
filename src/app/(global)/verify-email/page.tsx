import React, { Suspense } from "react";
import type { Metadata, NextPage } from "next";
import VerifyEmail from "@/app/components/pages/VerifyEmail";

const EmailVerification: NextPage = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<VerifyEmail />
	</Suspense>
);

export const metadata: Metadata = {
	title: "Flood - BookingService",
};

export default EmailVerification;
