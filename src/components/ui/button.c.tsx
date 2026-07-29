import type React from "react";
import { cn } from "@/lib/utils";

const propsBtn = {
  variants: {
    default: "bg-primary hover:bg-primary/75",
    secondary: "bg-secondary hover:bg-secondary/75 text-background",
    ghost: "bg-transparent hover:bg-secondary",
  },
  sizes: {
    normal: "h-9 px-3 rounded-[0.5rem]",
    small: "h-8 px-2 text-sm rounded-[0.5rem]",
  },
}

interface ButtonProps {
  variant?: keyof typeof propsBtn.variants;
  size?: keyof typeof propsBtn.sizes;
}

export function Button({ className, children, variant, size, ...props }: ButtonProps & React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "text-start hover:cursor-pointer transition-colors",
        propsBtn.variants[variant ?? "default"],
        propsBtn.sizes[size ?? "normal"],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
