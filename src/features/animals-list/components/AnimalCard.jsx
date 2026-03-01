import React from "react";
import { motion } from "framer-motion";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { Card, StatusBadge, Button, IconButton } from "@shared/components/ui";
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
  if (
    type.includes("avicultura") ||
    type.includes("pollo") ||
    type.includes("gallina")
  )
    return "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800&auto=format&fit=crop";
  if (type.includes("equino") || type.includes("caballo"))
    return "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=800&auto=format&fit=crop";

  return "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?q=80&w=800&auto=format&fit=crop";
};

/**
 * Animal Card Component for Grid View
 */
export const AnimalCard = ({
  animal,
  index,
  onViewDetails,
  onEdit,
  onDelete,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
    >
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
        {/* Image Section */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={getAnimalImage(animal)}
            alt={animal.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Type Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-gray-700 bg-white/90 backdrop-blur shadow-sm uppercase tracking-wider">
              {animal.type || animal.categoryName || "Bovino"}
            </span>
          </div>

          {/* Animal Name */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white">
            <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-0.5">
              {animal.name}
            </h3>
            <p className="text-white/80 text-[10px] sm:text-sm font-medium tracking-wide">
              {animal.identifier || animal.visualCode}
            </p>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 scale-90 sm:scale-100 origin-top-right">
            <StatusBadge status={animal.status} />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between items-center text-gray-600">
              <span className="font-medium">Raza</span>
              <span className="text-gray-900 font-semibold">
                {animal.breedName || animal.breed || "No especificada"}
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span className="font-medium">Peso</span>
              <span className="text-gray-900 font-semibold text-emerald-600">
                {animal.weight || animal.currentWeight || "0"} kg
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span className="font-medium">Ubicación</span>
              <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-bold border border-green-100">
                {animal.location || animal.paddockName || "Sin ubicación"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon={Eye}
                onClick={() => onViewDetails(animal.id)}
                className="justify-center"
              >
                Detalles
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={Edit2}
                onClick={() => onEdit(animal.id)}
                className="justify-center"
              >
                Editar
              </Button>
            </div>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={handleDelete}
              className="w-full justify-center"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AnimalCard;
