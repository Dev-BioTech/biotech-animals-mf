import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EmptyState, Pagination } from "@shared/components/ui";
import { Beef } from "lucide-react";
import { AnimalsListHeader } from "./AnimalsListHeader";
import { AnimalsListControls } from "./AnimalsListControls";
import { AnimalCard } from "./AnimalCard";
import { AnimalsTable } from "./AnimalsTable";
import { LoadingState } from "@shared/components/ui/States";

/**
 * Animals List View Component
 * Presentation component for displaying animals in grid or list mode
 */
export function AnimalsListView({
  animals = [],
  loading,
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
    <div className="w-full px-2 md:px-0 font-sans">
      {/* Header Hero Section - Always Visible */}
      <AnimalsListHeader onCreate={onCreate} onExport={handleExport} />

      {/* Controls - Always Visible */}
      <AnimalsListControls
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        filterType={filterType}
        onFilterChange={onFilterChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onExport={handleExport}
      />

      {/* Content - Skeleton or Real Content */}
      {loading ? (
        <div className="mt-8">
          {/* Here LoadingState IS our premium skeleton we defined before */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4"
              >
                <div className="h-48 bg-gray-100 rounded-2xl w-full" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
                <div className="flex gap-2 pt-2">
                  <div className="h-10 flex-1 bg-gray-100 rounded-xl" />
                  <div className="h-10 flex-1 bg-gray-100 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : animals.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon={Beef}
            title="No se encontraron animales"
            description={
              searchTerm || filterType !== "all"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Comienza agregando tu primer animal"
            }
          />
        </div>
      ) : (
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="safe-animal-grid"
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
            ) : (
              <motion.div
                key="list-desktop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-sm:hidden sm:block"
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
        </div>
      )}
    </div>
  );
}

export default AnimalsListView;
