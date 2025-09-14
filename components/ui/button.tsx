import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Button style variants using CVA - makes it easy to add new styles later
const buttonVariants = cva(
  // Base styles that apply to all buttons
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", // For delete actions
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground", // Minimal style
        link: "text-primary underline-offset-4 hover:underline", // Text-only style
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3", // Smaller buttons for tight spaces
        lg: "h-11 rounded-md px-8", // Bigger for important actions
        icon: "h-10 w-10", // Square buttons for icons only
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// TypeScript interface for button props - extends standard button props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Renders as a different element (useful for links)
}

// Main button component with forwardRef for proper ref handling
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Slot for polymorphic rendering when asChild is true
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

// Set display name for debugging
Button.displayName = "Button";

// Export everything we need
export { Button, buttonVariants };
