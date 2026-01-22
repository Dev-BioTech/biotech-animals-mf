import { useState, useEffect } from "react";
import { animalService } from "@shared/services/animalService";

export function useAnimalDetail(id) {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(!!id); // Solo loading si hay ID
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setAnimal(null);
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await animalService.getAnimalById(id);

        // Manejar tanto { data: animal } como el animal directo
        const animalData = response?.data || response;

        if (
          !animalData ||
          (typeof animalData === "object" &&
            Object.keys(animalData).length === 0)
        ) {
          setError("Animal no encontrado");
        } else {
          setAnimal(animalData);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching animal detail:", err);
        setError("Error al cargar el detalle del animal.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { animal, loading, error };
}
