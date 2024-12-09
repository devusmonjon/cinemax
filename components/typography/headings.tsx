"use client";
import { cn } from "@/lib/utils";
import React, { FC, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  weight?: "bold" | "semibold" | "medium";
  className?: string;
}

const Heading: FC<Props & React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  variant,
  weight,
  className,
  ...props
}) => {
  const [variantc, setVariantc] = useState<Props["variant"]>("h1");
  const [weightc, setWeightc] = useState<Props["weight"]>("medium");

  useEffect(() => {
    if (variant) {
      setVariantc(variant);
    }
    if (weight) {
      setWeightc(weight);
    }
  }, [variant]);
  switch (variantc) {
    case "h1":
      return (
        <h1
          className={cn(
            "font-inter tracking-[0.32px] leading-[72px] text-[64px] text-grayscale-100 dark:text-grayscale-10",
            weightc === "bold" && "font-bold",
            weightc === "semibold" && "font-semibold",
            weightc === "medium" && "font-medium",
            className
          )}
          {...props}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={cn(
            "font-inter tracking-[0.28px] leading-[64px] text-[56px] text-grayscale-100 dark:text-grayscale-10",
            weightc === "bold" && "font-bold",
            weightc === "semibold" && "font-semibold",
            weightc === "medium" && "font-medium",
            className
          )}
          {...props}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={cn(
            "font-inter tracking-[0.24px] leading-[56px] text-[48px] text-grayscale-100 dark:text-grayscale-10",
            weightc === "bold" && "font-bold",
            weightc === "semibold" && "font-semibold",
            weightc === "medium" && "font-medium",
            className
          )}
          {...props}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={cn(
            "font-inter tracking-[0.2px] leading-[48px] text-[40px] text-grayscale-100 dark:text-grayscale-10",
            weightc === "bold" && "font-bold",
            weightc === "semibold" && "font-semibold",
            weightc === "medium" && "font-medium",
            className
          )}
          {...props}
        >
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5
          className={cn(
            "font-inter tracking-[0.16px] leading-[40px] text-[32px] text-grayscale-100 dark:text-grayscale-10",
            weightc === "bold" && "font-bold",
            weightc === "semibold" && "font-semibold",
            weightc === "medium" && "font-medium",
            className
          )}
          {...props}
        >
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6
          className={cn(
            "font-inter tracking-[0.12px] leading-[32px] text-[24px] text-grayscale-100 dark:text-grayscale-10",
            weightc === "bold" && "font-bold",
            weightc === "semibold" && "font-semibold",
            weightc === "medium" && "font-medium",
            className
          )}
          {...props}
        >
          {children}
        </h6>
      );
    default:
      return (
        <h1
          className={cn(
            "font-inter tracking-[0.32px] leading-[72px] text-[64px] text-grayscale-100 dark:text-grayscale-10",
            weightc === "bold" && "font-bold",
            weightc === "semibold" && "font-semibold",
            weightc === "medium" && "font-medium",
            className
          )}
          {...props}
        >
          {children}
        </h1>
      );
  }
};

export default Heading;
