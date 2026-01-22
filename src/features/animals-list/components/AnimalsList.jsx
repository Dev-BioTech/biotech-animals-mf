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
    refetch,
    updateWeight,
    moveToBatch,
    markAsSold,
    markAsDead,
    registerMovement,
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
      actionLoading={actionLoading}
      onCreate={handleCreate}
      onViewDetails={handleViewDetails}
      onEdit={handleEdit}
      onUpdateWeight={updateWeight}
      onMoveToBatch={moveToBatch}
      onMarkAsSold={markAsSold}
      onMarkAsDead={markAsDead}
      onRegisterMovement={registerMovement}
      onDelete={deleteAnimal}
    />
  );
}
