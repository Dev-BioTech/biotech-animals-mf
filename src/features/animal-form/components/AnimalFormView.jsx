import React, { useState, useEffect } from "react";
import { Save, X, Trash2, Upload } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Select,
  Textarea,
} from "@shared/components/ui";

/**
 * Animal Form View Component
 * Refactored form using reusable UI components
 */
export function AnimalFormView({
  animalId,
  initialData,
  onSave,
  onCancel,
  isSaving,
  saveError,
  resources = { breeds: [], categories: [], paddocks: [], batches: [] },
  onDelete,
}) {
  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    breedId: "",
    categoryId: "",
    gender: "Macho",
    birthDate: "",
    weight: "",
    height: "",
    paddockId: "",
    batchId: "",
    initialCost: "",
    notes: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  // Load initial data when editing
  useEffect(() => {
    if (initialData) {
      // Función para encontrar ID por nombre si el ID no viene directo (común en mocks)
      const findIdByName = (list, name) => {
        if (!name) return "";
        const item = list.find(
          (i) => i.name?.toLowerCase() === name.toLowerCase(),
        );
        return item ? item.id : "";
      };

      setFormData({
        name: initialData.name || "",
        identifier: initialData.identifier || initialData.visualCode || "",
        breedId:
          initialData.breedId ||
          findIdByName(
            resources.breeds,
            initialData.breed || initialData.breedName,
          ) ||
          "",
        categoryId:
          initialData.categoryId ||
          findIdByName(
            resources.categories,
            initialData.type || initialData.categoryName,
          ) ||
          "",
        gender: initialData.sex === "M" ? "Macho" : "Hembra",
        birthDate: initialData.birthDate || "",
        weight: initialData.weight || initialData.currentWeight || "",
        height: initialData.height || "",
        paddockId:
          initialData.paddockId ||
          findIdByName(
            resources.paddocks,
            initialData.location || initialData.paddockName,
          ) ||
          "",
        batchId:
          initialData.batchId ||
          findIdByName(
            resources.batches,
            initialData.batch || initialData.batchName,
          ) ||
          "",
        initialCost: initialData.initialCost || "",
        notes: initialData.notes || "",
        image: initialData.image || "",
      });
      setImagePreview(initialData.image || "");
    }
  }, [initialData, resources]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.identifier.trim()) {
      newErrors.identifier = "El identificador es requerido";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "La categoría es requerida";
    }

    if (!formData.breedId) {
      newErrors.breedId = "La raza es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  const isEditing = Boolean(animalId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-4 md:p-6"
    >
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {isEditing ? "Editar Animal" : "Nuevo Animal"}
                </h2>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  {isEditing
                    ? "Actualiza la información del animal"
                    : "Completa los datos del nuevo animal"}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            {saveError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {saveError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Basic Information */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 pb-2 border-b border-gray-100">
                  Información Básica
                </h3>
              </div>

              <Input
                label="Nombre *"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
                placeholder="Ej: Luna"
              />

              <Input
                label="Identificador *"
                value={formData.identifier}
                onChange={(e) => handleChange("identifier", e.target.value)}
                error={errors.identifier}
                placeholder="Ej: BOV-001"
              />

              <Select
                label="Categoría *"
                value={formData.categoryId}
                onChange={(e) => handleChange("categoryId", e.target.value)}
                error={errors.categoryId}
                options={resources.categories}
                placeholder="Seleccionar categoría"
              />

              <Select
                label="Raza *"
                value={formData.breedId}
                onChange={(e) => handleChange("breedId", e.target.value)}
                error={errors.breedId}
                options={resources.breeds}
                placeholder="Seleccionar raza"
              />

              <Select
                label="Género"
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                options={[
                  { value: "Macho", label: "Macho" },
                  { value: "Hembra", label: "Hembra" },
                ]}
              />

              <Input
                label="Fecha de Nacimiento"
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleChange("birthDate", e.target.value)}
              />

              {/* Physical Characteristics */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 pb-2 border-b border-gray-100">
                  Características Físicas
                </h3>
              </div>

              <Input
                label="Peso (kg)"
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                placeholder="0"
                step="0.1"
              />

              <Input
                label="Altura (cm)"
                type="number"
                value={formData.height}
                onChange={(e) => handleChange("height", e.target.value)}
                placeholder="0"
                step="0.1"
              />

              {/* Location and Management */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 pb-2 border-b border-gray-100">
                  Ubicación y Gestión
                </h3>
              </div>

              <Select
                label="Potrero"
                value={formData.paddockId}
                onChange={(e) => handleChange("paddockId", e.target.value)}
                options={resources.paddocks}
                placeholder="Seleccionar potrero"
              />

              <Select
                label="Lote"
                value={formData.batchId}
                onChange={(e) => handleChange("batchId", e.target.value)}
                options={resources.batches}
                placeholder="Seleccionar lote"
              />

              <Input
                label="Costo Inicial"
                type="number"
                value={formData.initialCost}
                onChange={(e) => handleChange("initialCost", e.target.value)}
                placeholder="0.00"
                step="0.01"
              />

              {/* Image Upload */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 pb-2 border-b border-gray-100">
                  Imagen
                </h3>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Foto del Animal
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden bg-white shadow-inner flex items-center justify-center border border-gray-100">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm text-gray-500 mb-3">
                      Sube una foto clara del animal para facilitar su
                      identificación.
                    </p>
                    <label className="cursor-pointer inline-block">
                      <div className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-green-50 text-green-700 border border-green-200 rounded-lg transition-all shadow-sm">
                        <Upload size={18} />
                        <span className="text-sm font-bold">
                          {imagePreview
                            ? "Cambiar imagen"
                            : "Seleccionar imagen"}
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="md:col-span-2 mt-4">
                <Textarea
                  label="Notas"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Observaciones adicionales sobre salud, comportamiento, etc..."
                  rows={4}
                />
              </div>
            </div>
          </CardBody>

          <CardFooter className="bg-gray-50 sm:bg-white border-t sm:border-none p-4 md:p-6">
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between w-full gap-4">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {isEditing && onDelete && (
                  <Button
                    type="button"
                    variant="danger"
                    icon={Trash2}
                    onClick={onDelete}
                    disabled={isSaving}
                    className="w-full sm:w-auto"
                  >
                    Eliminar
                  </Button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  icon={X}
                  onClick={onCancel}
                  disabled={isSaving}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  icon={Save}
                  loading={isSaving}
                  disabled={isSaving}
                  className="w-full sm:w-auto order-1 sm:order-2"
                >
                  {isEditing ? "Guardar Cambios" : "Crear Animal"}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>
    </motion.div>
  );
}

export default AnimalFormView;
