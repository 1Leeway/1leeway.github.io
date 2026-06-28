import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export const Badge = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-amber-300/40 bg-amber-400/15 px-2.5 py-1 text-xs font-medium text-amber-100",
        className
      )}
      {...props}
    />
  );
};
