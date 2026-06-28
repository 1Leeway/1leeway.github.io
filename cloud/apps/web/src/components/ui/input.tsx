import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-white/15 bg-white/[0.02] px-3 text-sm text-zinc-100 outline-none transition focus:border-white/40 focus:bg-white/[0.05]",
        className
      )}
      {...props}
    />
  );
};
