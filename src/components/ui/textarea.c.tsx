import { cn } from "@/lib/utils";

const styles = {
  variants: {
    default:
      "bg-background flex items-center gap-2.5 w-full px-3 py-2 rounded-lg transition text-left border outline-0",
    ghost: "bg-transparent flex items-center gap-2.5 w-full px-3 py-2 rounded-lg transition text-left border border-transparent! outline-0 focus:border-border!",
  },
};

export function Textarea({
  className,
  variant,
  ...props
}: {
  variant?: keyof typeof styles.variants;
  icon?: React.ReactElement;
} & React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(styles.variants[variant ?? "default"], className)}
      {...props}
    ></textarea>
  );
}
