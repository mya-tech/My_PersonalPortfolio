import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  download?: string | boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, download, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mid disabled:pointer-events-none disabled:opacity-50 active:scale-95";
    
    const variants = {
      primary: "bg-accent-mid text-white hover:bg-accent-dark shadow-sm shadow-accent-light/20",
      secondary: "bg-bg-tertiary text-accent-dark hover:bg-accent-light/30 border border-border-mid",
      outline: "border border-border-light text-text-primary hover:bg-bg-secondary hover:border-text-muted",
      ghost: "text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2 text-base",
      lg: "h-12 px-6 text-lg rounded-lg",
    };

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      if (download) {
        return (
          <a
            href={href}
            download={download}
            className={combinedClassName}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
