import Text from "@/components/typography/text";
import { ArrowRight } from "@/icons";
import { isActive } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface Props {
  Icon: React.ElementType;
  link: string;
  children?: React.ReactNode;
}

const SettingsItem: FC<Props> = ({ Icon, link, children, ...props }) => {
  console.log(isActive("/settings", "/settings/profile"));
  const pathname = usePathname();
  return (
    <Link
      href={`/settings/${link}`}
      className={cn(
        "flex items-center justify-between text-grayscale-70 duration-300 dark:hover:text-grayscale-10 hover:text-grayscale-100",
        isActive(pathname, `/settings/${link}`) &&
          "dark:text-grayscale-10 text-grayscale-100"
      )}
      {...props}
    >
      <div className="flex items-center gap-[11.88px]">
        <Icon
          className={cn(
            "!min-w-6 !min-h-6 !text-grayscale-70 duration-300",
            isActive(pathname.replace("/settings", ""), `/${link}`) &&
              "!text-primary"
          )}
        />{" "}
        <Text size="lg" weight="medium" className="!text-inherit">
          {children}
        </Text>
      </div>
      <ArrowRight />
    </Link>
  );
};

export default SettingsItem;
