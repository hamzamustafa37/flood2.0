// import { Spin } from 'antd';
import React from "react";

interface LoaderProps {
  customClass?: string;
}
const Loader: React.FC<LoaderProps> = ({ customClass }) => (
  <div className="flex items-center justify-center">
    {/* <Spin className={customClass} /> */}
  </div>
);

export default Loader;
