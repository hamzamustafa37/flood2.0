import { ButtonType, ButtonVariant } from "@/utils/commonTypes";
import React from "react";
import { Spin } from "antd";

interface IButton {
  type?: ButtonType;
  variant?: ButtonVariant;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  loaderColor?: string;
}

export const Button: React.FC<IButton> = ({
  type = ButtonType.Button,
  variant = ButtonVariant.Primary,
  className = "",
  onClick,
  children,
  loading = false,
  disabled = false,
  loaderColor = "spin-blue",
}) => {
  const baseStyle = "font-medium rounded-lg text-base text-center";
  const variantStyle = (() => {
    switch (variant) {
      case ButtonVariant.Primary:
        return "bg-primary hover:bg-secondary text-white";
      case ButtonVariant.Light:
        return "text-gray hover:text-primary bg-white border border-borderLight hover:border-primary";
      case ButtonVariant.Danger:
        return "bg-danger hover:bg-dangerDark text-white";
      case ButtonVariant.Outline:
        return "text-primary border border-primary hover:bg-primary hover:text-white";
      case ButtonVariant.OutlineSecondary:
        return "text-borderSecondary border border-borderSecondary hover:bg-borderSecondary hover:text-white";
      default:
        return "bg-secondary hover:bg-primary text-white";
    }
  })();
  return (
    <button
      type={type}
      className={`${baseStyle} ${variantStyle} ${className}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading && <Spin size="small" className={`${loaderColor}`} />}

      {!loading && children}
    </button>
  );
};
