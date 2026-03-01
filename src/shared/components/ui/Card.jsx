import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable Card component with consistent styling
 */
export const Card = ({ children, className = "", hover = false, ...props }) => {
  const baseClasses =
    "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden";
  const hoverClasses = hover
    ? "transition-all duration-300 hover:shadow-lg hover:border-green-200"
    : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Animated Card with motion effects
 */
export const AnimatedCard = ({
  children,
  className = "",
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={className}
      {...props}
    >
      <Card hover>{children}</Card>
    </motion.div>
  );
};

/**
 * Card Header component
 */
export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card Body component
 */
export const CardBody = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

/**
 * Card Footer component
 */
export const CardFooter = ({ children, className = "" }) => {
  return (
    <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
