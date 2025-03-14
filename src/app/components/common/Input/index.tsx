'use client';
import { InputType } from '@/utils/commonTypes';
import React from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { EyeIcon, SvgIcon } from '../Icons';

interface InputProps {
    type?: InputType;
    id?: string;
    label?: string | React.ReactNode;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
    inputClassName?: string;
    disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
    type = InputType.Text,
    id,
    label,
    placeholder,
    value,
    onChange,
    required = false,
    className = '',
    inputClassName = '',
    disabled = false,
}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = (): void => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className={`relative mb-4 ${className}`}>
            <label
                htmlFor={id}
                className="block mb-1 text-base font-medium text-black"
            >
                {label}
            </label>
            <input
                type={
                    type === InputType.Password
                        ? showPassword
                            ? InputType.Text
                            : InputType.Password
                        : type
                }
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={`bg-gray-50 border border-borderLight text-gray-900 focus:border-primary focus:ring-primary focus:outline-none text-sm rounded-lg block w-full p-3 px-4 ${inputClassName}`}
            />
            {type === InputType.Password && (
                <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute bottom-3 right-1 flex items-center focus:outline-none px-3"
                >
                    {!showPassword ? (
                        <FaEyeSlash className="text-gray text-lg" />
                    ) : (
                        <SvgIcon icon={EyeIcon} size={18} />
                    )}
                </button>
            )}
        </div>
    );
};
