import React from "react";
import { motion } from "framer-motion";

/**
 * Loading Spinner component
 */
export const Spinner = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <div className={`${className}`}>
      <svg
        className={`animate-spin ${sizeClass} text-green-600`}
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
    </div>
  );
};

/**
 * Loading State component with message
 */
export const LoadingState = ({ message = "Cargando...", size = "lg" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size={size} />
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  );
};

/**
 * Empty State component
 */
export const EmptyState = ({
  icon: Icon,
  title = "No hay datos",
  description,
  action,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      {Icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon size={32} className="text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>
      )}
      {action}
    </motion.div>
  );
};

/**
 * Error State component
 */
export const ErrorState = ({
  title = "Algo salió mal",
  message,
  onRetry,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
    >
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {message && (
        <p className="text-gray-600 text-center max-w-md mb-6">{message}</p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Intentar nuevamente
        </button>
      )}
    </motion.div>
  );
};

export default LoadingState;
