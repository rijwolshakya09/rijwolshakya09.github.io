import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,color,border-color] duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:scale-100",
    variant === "primary" && "bg-primary text-on-primary",
    variant === "outline" && "border-[1.5px] border-foreground text-foreground hover:bg-foreground hover:text-background",
    variant === "ghost" && "text-foreground hover:bg-surface",
    size === "sm" && "min-h-12 px-4 text-sm",
    size === "md" && "min-h-12 px-5 text-sm",
    size === "lg" && "min-h-14 px-7 text-base",
    className
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={buttonStyles({ variant, size, className })} {...props} />
  )
);

Button.displayName = "Button";
export { Button };
