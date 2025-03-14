// "use client";
// import type { ISelectOption } from "@/utils";
// // import { Select } from 'antd';
// import React from "react";

// interface ISelectField {
//   placeholder?: string;
//   options?: ISelectOption[];
//   allowClear?: boolean;
//   className?: string;
//   value?: string | number;
//   name?: string;
//   onChange?: (value: string | number) => void;
// }

// export const SelectField: React.FC<ISelectField> = ({
//   placeholder = "Select an option",
//   allowClear = false,
//   className = "",
//   value,
//   name,
//   options,
//   onChange,
// }) => (
//   <select
//     key={name}
//     value={value}
//     options={options}
//     allowClear={allowClear}
//     placeholder={placeholder}
//     className={className}
//     onChange={onChange}
//   ></select>
// );
