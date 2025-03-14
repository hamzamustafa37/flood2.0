import React from "react";

import { AuthSlider } from "../../pages";

interface IUnAuthLayout {
  readonly children: React.ReactNode;
}

export const UnAuthLayout = ({
  children,
}: IUnAuthLayout): React.ReactElement => (
  <>
    <section className="bg-white">
      <div className="grid md:grid-cols-2">
        <div className="flex justify-center items-center min-h-screen p-5">
          <div className="w-full max-w-lg">{children}</div>
        </div>
        <div className="grid">
          <div className="bg-grayLight flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg auth-content">
              <AuthSlider />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
