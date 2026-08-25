import React, { ComponentProps } from "react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
interface TextAreaProps extends ComponentProps<typeof Textarea> {
  label?: string;
  className?: string;
  error?: boolean | any;
}

const CustomTextArea = ({
  label,
  className,
  error,
  ...rest
}: TextAreaProps) => {
  const base = `w-full rounded-md !border-gray !focus-visible:ring-1 !focus-visible:ring-blue !border !text-sm !font-normal bg-transparent placeholder:text-dark`;
  const errorClass = error ? "border-red-500" : "border-gray";

  return (
    <div className="w-full">
      <p className="text-[#6E6D7A] text-sm font-medium mb-1">{label}</p>
      <Textarea className={cn(base, errorClass, className)} {...rest} />
    </div>
  );
};

export default CustomTextArea;
