import Heading from "@/components/typography/headings";
import Text from "@/components/typography/text";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  title: string;
  className?: string;
  description: string;
}

const Title: FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
  title,
  description,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn("w-full text-center space-y-[12px]", className)}
    >
      <Heading variant="h5" weight="bold" className="!text-center">
        {title}
      </Heading>
      <Text size="md" weight="medium" className="!text-grayscale-60">
        {description}
      </Text>
    </div>
  );
};

export default Title;
