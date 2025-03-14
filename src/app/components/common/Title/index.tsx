import React from "react";

interface TitleProps {
  title: string;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ title, className }) => (
  <h5
    className={`text-dark text-xl md:text-2xl md:leading-[48px] font-semibold mb-1 ${className}`}
  >
    {title}
  </h5>
);
