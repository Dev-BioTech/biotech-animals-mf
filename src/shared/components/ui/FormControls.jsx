import React from "react";

/**
 * Reusable Input component
 */
export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  className = "",
  containerClassName = "",
  ...props
}) => {
  const baseInputClasses =
    "w-full px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";
  const errorClasses = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300";
  const iconPadding = Icon ? "pl-10" : "";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`${baseInputClasses} ${errorClasses} ${iconPadding} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

/**
 * Reusable Select component
 */
export const Select = ({
  label,
  error,
  helperText,
  options = [],
  placeholder = "Seleccionar...",
  className = "",
  containerClassName = "",
  ...props
}) => {
  const baseSelectClasses =
    "w-full px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white";
  const errorClasses = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`${baseSelectClasses} ${errorClasses} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option
            key={option.value || option.id || index}
            value={option.value || option.id}
          >
            {option.label || option.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

/**
 * Reusable Textarea component
 */
export const Textarea = ({
  label,
  error,
  helperText,
  className = "",
  containerClassName = "",
  rows = 4,
  ...props
}) => {
  const baseTextareaClasses =
    "w-full px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none";
  const errorClasses = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300";

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`${baseTextareaClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
