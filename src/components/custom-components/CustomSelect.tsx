import React, { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
interface Data {
  name: string;
  value: string;
}
interface SelectProps extends ComponentProps<typeof NativeSelect> {
  label?: string;
  className?: string;
  error?: boolean | any;
  data: Data[];
  placeholder?: string;
}

const CustomSelect = ({
  label,
  className,
  error,
  required,
  data,
  placeholder,
  ...rest
}: SelectProps) => {
  const base = `w-full rounded-md !border-gray !focus-visible:ring-1 !focus-visible:ring-blue h-[46px] !border !text-sm !font-normal bg-transparent placeholder:text-dark`;
  const errorClass = error ? "!border-red-500" : "border-gray";
  return (
    <div className="w-full">
      <p className="text-[#6E6D7A] text-sm font-medium mb-1">
        {label}{" "}
        <span className="text-blue text-base">{required ? "*" : ""}</span>
      </p>
      <NativeSelect
        defaultValue=""
        className={cn(
          base,
          errorClass,
          className,
          !rest.value && "text-[#1d1e1f]",
        )}
        {...rest}
      >
        <NativeSelectOption value="" className="text-dark">
          {" "}
          {placeholder}
        </NativeSelectOption>
        {data?.map((d: Data, index: number) => (
          <NativeSelectOption
            value={d.value}
            className="capitalize cursor-pointer"
            key={index}
          >
            {d.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
};

export default CustomSelect;
