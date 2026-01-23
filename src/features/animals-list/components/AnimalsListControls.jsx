import React from "react";
import { Search, Filter, Download, Grid, List } from "lucide-react";
import { motion } from "framer-motion";
import { Input, Select, IconButton } from "@shared/components/ui";

/**
 * Animals List Controls Component
 * Handles search, filters, and view mode toggle
 */
export const AnimalsListControls = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  viewMode,
  onViewModeChange,
  onExport,
}) => {
  const typeOptions = [
    { value: "all", label: "Todos los tipos" },
    { value: "Bovino", label: "Bovinos" },
    { value: "Porcino", label: "Porcinos" },
    { value: "Ovino", label: "Ovinos" },
    { value: "Avicultura", label: "Avicultura" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-sm p-4 md:p-6 border border-gray-100 mb-8 flex flex-col xl:flex-row gap-4 items-stretch xl:items-center"
    >
      {/* Search Input */}
      <div className="flex-1 min-w-0">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar animal..."
          icon={Search}
          className="bg-gray-50 border-none focus:bg-white text-sm md:text-base"
        />
      </div>

      {/* Filters Group */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Type Filter */}
        <div className="relative flex-1 sm:w-64">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
          <Select
            value={filterType}
            onChange={(e) => onFilterChange(e.target.value)}
            options={typeOptions}
            placeholder=""
            className="w-full pl-10 bg-gray-50 border-none focus:bg-white text-sm md:text-base"
          />
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <div className="h-8 w-px bg-gray-200 mx-1" />

          {/* View Mode Toggle */}
          <div className="flex bg-gray-50 p-1.5 rounded-xl gap-1">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              aria-label="Vista de cuadrícula"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
              aria-label="Vista de lista"
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Export Button (Desktop Only) */}
          {onExport && (
            <IconButton
              icon={Download}
              variant="ghost"
              onClick={onExport}
              className="bg-gray-50 hover:bg-green-50 hover:text-green-600"
              title="Exportar"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimalsListControls;
