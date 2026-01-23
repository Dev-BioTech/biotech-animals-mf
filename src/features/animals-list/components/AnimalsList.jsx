import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimalsListView } from "./AnimalsListView";
import { useAnimals } from "../hooks/useAnimals";
import { useAuthStore } from "@shared/store/authStore";
import { LoadingState, EmptyState } from "@shared/components/ui";
import { Button } from "@shared/components/ui";
import { AlertTriangle } from "lucide-react";

export default function AnimalsList() {
  const navigate = useNavigate();
  const selectedFarm = useAuthStore((state) => state.selectedFarm);
  const {
    animals,
    loading,
    error,
    actionLoading,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    currentPage,
    totalPages,
    setCurrentPage,
    deleteAnimal,
  } = useAnimals();

  const handleCreate = () => {
    navigate("/animals/create");
  };

  const handleViewDetails = (id) => {
    navigate(`/animals/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/animals/edit/${id}`);
  };

  // Check if no farm is selected
  if (!selectedFarm?.id) {
    return (
      <div className="p-8">
        <EmptyState
          icon={AlertTriangle}
          title="Granja no seleccionada"
          description="Por favor selecciona una granja para ver los animales."
          action={
            <Button
              variant="primary"
              onClick={() => navigate("/farm-selector")}
            >
              Seleccionar Granja
            </Button>
          }
        />
      </div>
    );
  }

  if (loading) {
    return <LoadingState message="Cargando animales..." />;
  }

  return (
    <AnimalsListView
      animals={animals}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filterType={filterType}
      onFilterChange={setFilterType}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      actionLoading={actionLoading}
      onCreate={handleCreate}
      onViewDetails={handleViewDetails}
      onEdit={handleEdit}
      onDelete={deleteAnimal}
    />
  );
}
