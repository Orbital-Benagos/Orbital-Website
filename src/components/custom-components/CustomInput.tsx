import React, { ComponentProps } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface InputProps extends ComponentProps<typeof Input> {
  label?: string;
  className?: string;
  error?: boolean | any;
}

const CustomInput = ({
  label,
  className,
  error,
  required,
  ...rest
}: InputProps) => {
  const base = `w-full border-gray focus-visible:ring-1 focus-visible:ring-blue border py-5.5 !h-0 !text-sm !font-normal bg-transparent placeholder:text-dark`;
  const errorClass = error ? "border-red-500" : "border-gray";
  return (
    <div className="w-full">
      <p className="text-[#6E6D7A] text-sm font-medium mb-1">
        {label}{" "}
        <span className="text-blue text-base">{required ? "*" : ""}</span>
      </p>
      <Input className={cn(base, errorClass, className)} {...rest} />
    </div>
  );
};

export default CustomInput;
