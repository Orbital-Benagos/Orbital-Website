import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import React, { ComponentProps, ReactNode } from "react";
import { IconType } from "react-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface ButtonProps extends ComponentProps<typeof Button> {
  name: string;
  className?: string;
  iconClassName?: string;
  spinnerClassName?: string;
  iconLeft?: IconType | any;
  iconRight?: IconType | any;
  loading?: boolean;
  isAltIcon?: boolean;
  altIcon?: IconType;
  altIconDirection?: "left" | "right";
}

const CustomButton = ({
  name,
  className,
  iconLeft,
  iconRight,
  iconClassName,
  spinnerClassName,
  loading,
  isAltIcon,
  altIcon,
  altIconDirection,
  ...rest
}: ButtonProps) => {
  const base = `bg-blue text-white py-5.5 px-6 !text-sm font-medium rounded-none cursor-pointer border border-blue 
    transition-all ease-in-out duration-500 group-hover:bg-transparent group-hover:text-blue flex items-center gap-2`;
  const iconBaseClassName = "text-white size-4 group-hover:text-blue";
  const spinner = "text-white size-5 group-hover:text-blue";
  const Icon: IconType | any = altIcon;
  return (
    <div className="group w-full">
      <Button className={cn(base, className)} {...rest}>
        {loading && <Spinner className={cn(spinner, spinnerClassName)} />}
        {iconLeft && (
          <HugeiconsIcon
            icon={iconLeft}
            className={cn(iconBaseClassName, iconClassName)}
          />
        )}
        {altIcon && altIconDirection === "left" && (
          <Icon className={cn(iconBaseClassName, iconClassName)} />
        )}
        {name}
        {iconRight && (
          <HugeiconsIcon
            icon={iconRight}
            className={cn(iconBaseClassName, iconClassName)}
          />
        )}
        {altIcon && altIconDirection === "right" && (
          <Icon className={cn(iconBaseClassName, iconClassName)} />
        )}
      </Button>
    </div>
  );
};

export default CustomButton;
