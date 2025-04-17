import React from "react";

import Image from "next/image";

interface IUnAuthLayout {
  readonly children: React.ReactNode;
}

export const UnAuthLayout = ({
  children,
}: IUnAuthLayout): React.ReactElement => (
  <>
    <div className="relative w-full min-h-screen bg-cover bg-[url('/backgrounds/login-bg.jpeg')]">
      <div className="absolute w-full min-h-screen bg-black opacity-50 z-10" />
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden h-[66vh] w-full max-w-4xl">
          {/* Left Section */}
          <div className="bg-[#eff2f6] p-8 flex-1 flex flex-col items-center justify-center">
            <Image
              src="/images/flood-logo.png"
              alt="Flood Team Logo"
              width={250}
              height={150}
              className="object-contain max-h-[333px]"
            />
            <h2 className="font-extrabold text-2xl mt-4">
              Welcome to Flood Team
            </h2>
          </div>

          {/* Right Section */}
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center gap-4">
            <p className="text-[24px] font-semibold">Flood Team</p>
            <h3 className="text-[25px] font-extrabold mb-0">Sign In</h3>
            <p className="text-[#525b75] text-base font-normal">
              Get access to your account
            </p>
            {children}
          </div>
        </div>
      </div>
    </div>
  </>
);
