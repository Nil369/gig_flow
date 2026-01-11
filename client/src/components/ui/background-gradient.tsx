import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <div
        className={cn(
          "absolute inset-0 rounded-3xl opacity-60 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]",
          animate && "animate-spin-slow"
        )}
      />
      <div
        className={cn(
          "relative bg-white dark:bg-zinc-900 rounded-[calc(1.5rem-1px)] overflow-hidden",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
