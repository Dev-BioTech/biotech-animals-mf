import React from "react";
import { motion } from "framer-motion";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { StatusBadge, IconButton } from "@shared/components/ui";
import alertService from "@shared/utils/alertService";

/**
 * Get animal image based on type
 */
const getAnimalImage = (animal) => {
  if (animal.image && !animal.image.includes("placeholder"))
    return animal.image;

  const type = (animal.type || animal.categoryName || "").toLowerCase();
  if (type.includes("bovino") || type.includes("vaca") || type.includes("toro"))
    return "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=800&auto=format&fit=crop";
  if (type.includes("porcino") || type.includes("cerdo"))
    return "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800&auto=format&fit=crop";
  if (type.includes("ovino") || type.includes("oveja"))
    return "https://images.unsplash.com/photo-1484557939439-5838d70889ec?q=80&w=800&auto=format&fit=crop";

  return "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?q=80&w=800&auto=format&fit=crop";
};

/**
 * Animal Table Row Component
 */
export const AnimalTableRow = ({
  animal,
  index,
  onViewDetails,
  onEdit,
  onDelete,
  actionLoading,
}) => {
  const handleDelete = async () => {
    const result = await alertService.deleteConfirm(
      animal.name,
      "¿Estás seguro de eliminar este animal?",
    );
    if (result.isConfirmed) {
      onDelete?.(animal.id);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="hover:bg-gray-50/50 transition-all"
    >
      {/* Identity */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-4">
          <img
            src={getAnimalImage(animal)}
            alt=""
            className="w-12 h-12 rounded-xl object-cover shadow-sm"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-base">{animal.name}</h4>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
              {animal.identifier || animal.visualCode}
            </span>
          </div>
        </div>
      </td>

      {/* Details */}
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium">
            {animal.type || animal.categoryName || "Bovino"}
          </span>
          <span className="text-gray-500 text-sm">
            {animal.breed || animal.breedName}
          </span>
        </div>
      </td>

      {/* Weight / Location */}
      <td className="py-4 px-6">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-sm text-gray-700">
            {animal.weight || animal.currentWeight || "0"} kg
          </span>
          <span className="text-xs text-gray-400">
            {animal.location || animal.paddockName || "Sin ubicación"}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-6">
        <StatusBadge status={animal.status} />
      </td>

      {/* Actions */}
      <td className="py-4 px-6">
        <div className="flex gap-2 justify-end">
          <IconButton
            icon={Eye}
            variant="ghost"
            onClick={() => onViewDetails(animal.id)}
            className="hover:text-green-600 hover:bg-green-50"
          />
          <IconButton
            icon={Edit2}
            variant="ghost"
            onClick={() => onEdit(animal.id)}
            className="hover:text-blue-600 hover:bg-blue-50"
          />
          <IconButton
            icon={Trash2}
            variant="ghost"
            onClick={handleDelete}
            disabled={actionLoading}
            className="hover:text-red-600 hover:bg-red-50"
          />
        </div>
      </td>
    </motion.tr>
  );
};

/**
 * Animals Table Component
 */
export const AnimalsTable = ({
  animals,
  onViewDetails,
  onEdit,
  onDelete,
  actionLoading,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-5 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                Identidad
              </th>
              <th className="text-left py-5 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                Detalles
              </th>
              <th className="text-left py-5 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                Peso / Ubicación
              </th>
              <th className="text-left py-5 px-6 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                Estado
              </th>
              <th className="text-right py-5 px-8 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {animals.map((animal, index) => (
              <AnimalTableRow
                key={animal.id}
                animal={animal}
                index={index}
                onViewDetails={onViewDetails}
                onEdit={onEdit}
                onDelete={onDelete}
                actionLoading={actionLoading}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnimalsTable;
