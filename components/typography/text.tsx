import { cn } from "@/lib/utils";
import { FC, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  weight?: "bold" | "semibold" | "medium";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  className?: string;
}

const Text: FC<Props & React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  weight,
  size,
  className,
  ...props
}): JSX.Element => {
  const [weightc, setWeightc] = useState<Props["weight"]>("medium");
  const [sizec, setSizec] = useState<Props["size"]>("md");

  useEffect(() => {
    if (size) {
      setSizec(size);
    }
    if (weight) {
      setWeightc(weight);
    }
  }, [weight, size]);

  return (
    <p
      className={cn(
        "font-inter text-grayscale-100 dark:text-grayscale-10",
        weightc === "bold" && "font-bold",
        weightc === "semibold" && "font-semibold",
        weightc === "medium" && "font-medium",
        sizec === "xl" && "text-[20px] leading-[28px] tracking-[0.1px]",
        sizec === "lg" && "text-[18px] leading-[26px] tracking-[0.09px]",
        sizec === "md" && "text-[16px] leading-[24px] tracking-[0.08px]",
        sizec === "sm" && "text-[14px] leading-[22px] tracking-[0.07px]",
        sizec === "xs" && "text-[12px] leading-[20px] tracking-[0.06px]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
