import React from "react";
import { cn } from "@/lib/utils";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ className, children, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-tag-bg text-tag-text border-tag-border transition-colors hover:bg-accent-light/25",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
