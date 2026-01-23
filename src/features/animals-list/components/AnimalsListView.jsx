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
    <div className="w-full">
      {/* Header Hero Section */}
      <AnimalsListHeader onCreate={onCreate} />

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
            {viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                key="list"
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
