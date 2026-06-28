import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-card/90 backdrop-blur-sm shadow-glass",
        className
      )}
      {...props}
    />
  );
};
