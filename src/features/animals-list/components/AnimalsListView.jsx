import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EmptyState, Pagination } from "@shared/components/ui";
import { Beef } from "lucide-react";
import { AnimalsListHeader } from "./AnimalsListHeader";
import { AnimalsListControls } from "./AnimalsListControls";
import { AnimalCard } from "./AnimalCard";
import { AnimalsTable } from "./AnimalsTable";

/**
 * Animals List View Component
 * Presentation component for displaying animals in grid or list mode
 */
export function AnimalsListView({
  animals = [],
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  onViewDetails,
  onEdit,
  onCreate,
  onDelete,
  actionLoading,
}) {
  const [viewMode, setViewMode] = useState("grid");

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export animals data");
  };

  return (
    <div className="w-full px-2 md:px-0">
      {/* Header Hero Section */}
      <AnimalsListHeader onCreate={onCreate} onExport={handleExport} />

      {/* Controls */}
      <AnimalsListControls
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        filterType={filterType}
        onFilterChange={onFilterChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onExport={handleExport}
      />

      {/* Content */}
      {animals.length === 0 ? (
        <EmptyState
          icon={Beef}
          title="No se encontraron animales"
          description={
            searchTerm || filterType !== "all"
              ? "Intenta ajustar los filtros de búsqueda"
              : "Comienza agregando tu primer animal"
          }
        />
      ) : (
        <>
          <AnimatePresence mode="wait">
            {/* Force grid on mobile screens */}
            <div className="block sm:hidden">
              <motion.div
                key="grid-mobile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 gap-6"
              >
                {animals.map((animal, index) => (
                  <AnimalCard
                    key={animal.id}
                    animal={animal}
                    index={index}
                    onViewDetails={onViewDetails}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    actionLoading={actionLoading}
                  />
                ))}
              </motion.div>
            </div>

            {/* Desktop/Tablet View Mode Selection */}
            <div className="hidden sm:block">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid-desktop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {animals.map((animal, index) => (
                    <AnimalCard
                      key={animal.id}
                      animal={animal}
                      index={index}
                      onViewDetails={onViewDetails}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list-desktop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AnimalsTable
                    animals={animals}
                    onViewDetails={onViewDetails}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    actionLoading={actionLoading}
                  />
                </motion.div>
              )}
            </div>
          </AnimatePresence>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="mt-10 mb-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AnimalsListView;
