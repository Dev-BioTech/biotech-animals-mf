import React from "react";

/**
 * Reusable Badge component for status indicators
 */
export const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    primary: "bg-green-600 text-white",
  };

  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  const variantClasses = variants[variant] || variants.default;

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

/**
 * Status Badge with predefined status colors
 */
export const StatusBadge = ({ status, className = "" }) => {
  const statusMap = {
    Activo: "success",
    Saludable: "success",
    "En Tratamiento": "warning",
    Observación: "warning",
    Vendido: "info",
    Muerto: "danger",
    Inactivo: "default",
  };

  const variant = statusMap[status] || "default";

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
};

export default Badge;
