import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-ocean text-neutral-white hover:bg-primary-ocean/90",
        outline:
          "border border-primary-ocean text-primary-ocean hover:bg-primary-ocean hover:text-neutral-white",
        secondary:
          "bg-primary-aqua text-neutral-white hover:bg-primary-aqua/90",
        ghost: "hover:bg-neutral-gray-100 hover:text-primary-ocean",
        link: "underline-offset-4 hover:underline text-primary-ocean",
      },
      size: {
        default: "h-11 px-6 rounded-md",
        sm: "h-9 px-4 rounded-md text-sm",
        lg: "h-14 px-8 rounded-md text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(classes, children.props?.className),
        ref,
        ...props,
      } as any);
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

