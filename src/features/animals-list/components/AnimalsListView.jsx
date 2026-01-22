import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EmptyState } from "@shared/components/ui";
import { Beef } from "lucide-react";
import { AnimalsListHeader } from "./AnimalsListHeader";
import { AnimalsListControls } from "./AnimalsListControls";
import { AnimalCard } from "./AnimalCard";
import { AnimalsTable } from "./AnimalsTable";

/**
 * Animals List View Component
 * Main view for displaying animals in grid or list mode
 */
export function AnimalsListView({
  animals,
  onViewDetails,
  onEdit,
  onCreate,
  onDelete,
  actionLoading,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const safeAnimals = Array.isArray(animals) ? animals : [];

  // Filter animals based on search and filter criteria
  const filteredAnimals = safeAnimals.filter((animal) => {
    const name = animal.name || "";
    const identifier = animal.identifier || animal.visualCode || "";
    const type = animal.type || animal.categoryName || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      identifier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === "all" || type === filterType;

    return matchesSearch && matchesFilter;
  });

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
        onSearchChange={setSearchTerm}
        filterType={filterType}
        onFilterChange={setFilterType}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onExport={handleExport}
      />

      {/* Content */}
      {filteredAnimals.length === 0 ? (
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
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredAnimals.map((animal, index) => (
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
                animals={filteredAnimals}
                onViewDetails={onViewDetails}
                onEdit={onEdit}
                onDelete={onDelete}
                actionLoading={actionLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default AnimalsListView;
