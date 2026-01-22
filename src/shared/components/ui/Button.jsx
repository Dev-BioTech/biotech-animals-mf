import React from "react";

/**
 * Button variants configuration
 */
const variants = {
  primary:
    "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg",
  secondary:
    "bg-white border-2 border-green-600 text-green-700 hover:bg-green-50",
  danger:
    "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md hover:shadow-lg",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
};

/**
 * Button sizes configuration
 */
const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

/**
 * Reusable Button component
 */
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";

  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && Icon && iconPosition === "left" && <Icon size={18} />}
      {children}
      {!loading && Icon && iconPosition === "right" && <Icon size={18} />}
    </button>
  );
};

/**
 * Icon Button component
 */
export const IconButton = ({
  icon: Icon,
  variant = "ghost",
  size = "md",
  className = "",
  ...props
}) => {
  const sizeMap = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <Button
      variant={variant}
      className={`${sizeMap[size]} ${className}`}
      {...props}
    >
      <Icon size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
    </Button>
  );
};

export default Button;
