import React, { Suspense } from "react";
import type { Metadata, NextPage } from "next";
import VerifyEmail from "@/app/components/pages/VerifyEmail";

const verifyEmail: NextPage = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<VerifyEmail />
	</Suspense>
);

export const metadata: Metadata = {
	title: "Flood - verify-email",
};

export default verifyEmail;
