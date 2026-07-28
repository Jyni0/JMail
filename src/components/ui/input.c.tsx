import { cn } from "@/lib/utils";

const styles = {
  variants: {
    default:
      "h-9 bg-background flex items-center gap-2.5 w-full px-3 rounded-lg transition text-left border outline-0 hover:bg-secondary/80",
    ghost: "h-9 bg-transparent flex items-center gap-2.5 w-full px-3 rounded-lg transition text-left border border-transparent! outline-0 hover:bg-scondary/25 focus:border-border!",
  },
};

export function Input({
  className,
  variant,
  ...props
}: {
  variant?: keyof typeof styles.variants;
  icon?: React.ReactElement;
} & React.ComponentProps<"input">) {
  return (
    <input
      className={cn(styles.variants[variant ?? "default"], className)}
      {...props}
    ></input>
  );
}
