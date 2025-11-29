//Reusable button
import { type ReactNode, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  children,
  className,
  disabled,
  type = "button",
  ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variantStyles = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
        danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    };

    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm gap-1.5",
        md: "px-4 py-2 text-base gap-2",
        lg: "px-6 py-3 text-lg gap-2.5",
    };

  const spinnerSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };
    return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
        >
{loading ? (
        <>
          <svg
            className={clsx("animate-spin", spinnerSizes[size])}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
        </button>
    );
};