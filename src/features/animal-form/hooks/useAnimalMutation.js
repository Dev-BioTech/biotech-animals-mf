import { useState } from "react";
import { animalService } from "@shared/services/animalService";

export function useAnimalMutation() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const createAnimal = async (data) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const result = await animalService.createAnimal(data);
      return result;
    } catch (err) {
      setSaveError(err.message || "Error al crear animal");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const updateAnimal = async (id, data) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const result = await animalService.updateAnimal(id, data);
      return result;
    } catch (err) {
      setSaveError(err.message || "Error al actualizar animal");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return { createAnimal, updateAnimal, isSaving, saveError };
}
