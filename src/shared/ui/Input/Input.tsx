import * as React from "react";

import { cn } from "@/shared/utils";
import { ReactNode } from "react";
import { CircleAlert, X } from "lucide-react";
import { Button } from "../Button/Button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  leftIcon?: ReactNode;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, size, label, leftIcon, onClear, value, ...props },
    ref
  ) => {
    // const clearableCondition = onClear && value !== "";
    const clearableCondition = true;

    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="relative">
          {leftIcon && (
            <span className="absolute top-1/2 -translate-y-1/2 text-gray-700 left-2">
              {leftIcon}
            </span>
          )}
          <input
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              error && "!border-error-500 !focus-visible:ring-error-500",
              leftIcon && "pl-8",
              clearableCondition && "pr-10",
              clearableCondition && error && "pr-19",
              className
            )}
            ref={ref}
            {...props}
          />
          {error && (
            <CircleAlert
              size={20}
              strokeWidth={1.5}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 text-error-500",
                clearableCondition && "right-12"
              )}
            />
          )}
          {clearableCondition && (
            <Button
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-sm"
              variant="ghost"
              size="icon-xs"
              leftIcon={<X size={20} strokeWidth={1.5} />}
            />
          )}
        </div>
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
