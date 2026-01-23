import { useState, useEffect, useCallback, useMemo } from "react";
import { animalService } from "@shared/services/animalService";
import { useAuthStore } from "@shared/store/authStore";
import alertService from "@shared/utils/alertService";

/**
 * Custom hook to manage animals data and UI states
 * Handles fetching, filtering, pagination, and CRUD operations
 */
export function useAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // UI States managed in hook
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth < 1024 ? 4 : 8,
  );

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 1024 ? 4 : 8);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectedFarm = useAuthStore((state) => state.selectedFarm);

  const fetchAnimals = useCallback(async () => {
    try {
      setLoading(true);

      // Check if farm is selected
      if (!selectedFarm?.id) {
        setError("Por favor selecciona una granja primero.");
        setLoading(false);
        return;
      }

      const response = await animalService.getAnimals({
        farmId: selectedFarm.id,
      });

      const animalsList = Array.isArray(response)
        ? response
        : response.data || [];

      setAnimals(animalsList);
      setError(null);
    } catch (err) {
      console.error("Error fetching animals:", err);

      if (err.response?.status === 405 || err.response?.status === 500) {
        console.warn(
          `Animals endpoint error (${err.response?.status}). Using demo data.`,
        );
        setAnimals([
          {
            id: "demo-1",
            name: "Vaca Demo 1",
            breed: "Holstein",
            age: 3,
            weight: 550,
            status: "Saludable",
            farmId: selectedFarm.id,
          },
          {
            id: "demo-2",
            name: "Vaca Demo 2",
            breed: "Jersey",
            age: 2,
            weight: 450,
            status: "Saludable",
            farmId: selectedFarm.id,
          },
        ]);
        alertService.warning(
          `Modo Demo: Error ${err.response?.status} en el servidor.`,
          "Modo Demo",
        );
        setError(null);
      } else if (err.response?.status === 404) {
        setAnimals([]);
        setError("No se encontraron animales en esta granja.");
      } else {
        setError("Error al cargar la lista de animales.");
      }
    } finally {
      setLoading(false);
    }
  }, [selectedFarm?.id]);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  // Logic for filtering (Client-side)
  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => {
      const name = animal.name || "";
      const identifier = animal.identifier || animal.visualCode || "";
      const type = animal.type || animal.categoryName || "";

      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        identifier.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filterType === "all" || type === filterType;

      return matchesSearch && matchesFilter;
    });
  }, [animals, searchTerm, filterType]);

  // Logic for pagination (Client-side)
  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
  const paginatedAnimals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAnimals.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAnimals, currentPage, itemsPerPage]);

  // Handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
    setCurrentPage(1);
  };

  // CRUD Actions
  const updateWeight = async (animalId, weightData) => {
    try {
      setActionLoading(true);
      await animalService.updateWeight(animalId, weightData);
      alertService.success("Peso actualizado correctamente", "Éxito");
      await fetchAnimals();
      return true;
    } catch (err) {
      console.error("Error updating weight:", err);
      alertService.error("Error al actualizar el peso", "Error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const moveToBatch = async (animalId, batchData) => {
    try {
      setActionLoading(true);
      await animalService.moveToBatch(animalId, batchData);
      alertService.success("Animal movido al lote correctamente", "Éxito");
      await fetchAnimals();
      return true;
    } catch (err) {
      console.error("Error moving to batch:", err);
      alertService.error("Error al mover el animal al lote", "Error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const markAsSold = async (animalId, saleData) => {
    try {
      setActionLoading(true);
      await animalService.markAsSold(animalId, saleData);
      alertService.success("Animal marcado como vendido", "Éxito");
      await fetchAnimals();
      return true;
    } catch (err) {
      console.error("Error marking as sold:", err);
      alertService.error("Error al marcar como vendido", "Error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const markAsDead = async (animalId, deathData) => {
    try {
      setActionLoading(true);
      await animalService.markAsDead(animalId, deathData);
      alertService.success("Animal marcado como fallecido", "Éxito");
      await fetchAnimals();
      return true;
    } catch (err) {
      console.error("Error marking as dead:", err);
      alertService.error("Error al marcar como fallecido", "Error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const registerMovement = async (animalId, movementData) => {
    try {
      setActionLoading(true);
      await animalService.registerMovement(animalId, movementData);
      alertService.success("Movimiento registrado correctamente", "Éxito");
      await fetchAnimals();
      return true;
    } catch (err) {
      console.error("Error registering movement:", err);
      alertService.error("Error al registrar el movimiento", "Error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const deleteAnimal = async (animalId) => {
    try {
      setActionLoading(true);
      await animalService.deleteAnimal(animalId);
      alertService.success("Animal eliminado correctamente", "Éxito");
      await fetchAnimals();
      return true;
    } catch (err) {
      console.error("Error deleting animal:", err);
      alertService.error("Error al eliminar el animal", "Error");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    // Data
    animals: paginatedAnimals, // Return current page of animals
    totalAnimals: filteredAnimals.length,
    paginatedAnimals,

    // UI States
    searchTerm,
    filterType,
    currentPage,
    totalPages,
    itemsPerPage,

    // Status
    loading,
    error,
    actionLoading,

    // Handlers
    setSearchTerm: handleSearchChange,
    setFilterType: handleFilterChange,
    setCurrentPage: handlePageChange,
    setItemsPerPage,
    refetch: fetchAnimals,

    // Actions
    updateWeight,
    moveToBatch,
    markAsSold,
    markAsDead,
    registerMovement,
    deleteAnimal,
  };
}
