import React, { useState } from "react";
import {
  ArrowLeft,
  Edit2,
  Calendar,
  Activity,
  Heart,
  TrendingUp,
  MapPin,
  Users,
  Weight,
  Ruler,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  StatusBadge,
} from "@shared/components/ui";

/**
 * Info Item Component
 */
const InfoItem = ({ icon: Icon, color, label, value }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-base font-bold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
};

/**
 * Section Title Component
 */
const SectionTitle = ({ children }) => {
  return (
    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
      {children}
    </h3>
  );
};

/**
 * Detail Card Component
 */
const DetailCard = ({
  label,
  value,
  bg = "bg-white",
  border = "border-gray-200",
}) => {
  return (
    <div className={`${bg} p-4 rounded-xl border ${border}`}>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

/**
 * Animal Detail View Component
 */
export function AnimalDetailView({ animal, onBack, onEdit }) {
  const [activeTab, setActiveTab] = useState("general");

  if (!animal) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">No se encontró información del animal</p>
      </div>
    );
  }

  const getAnimalImage = () => {
    if (animal.image && !animal.image.includes("placeholder")) {
      return animal.image;
    }
    return "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=800&auto=format&fit=crop";
  };

  const calculateAge = () => {
    if (!animal.birthDate) return "N/A";
    const birth = new Date(animal.birthDate);
    const today = new Date();
    const months =
      (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0) {
      return `${years} año${years > 1 ? "s" : ""}${remainingMonths > 0 ? ` y ${remainingMonths} mes${remainingMonths > 1 ? "es" : ""}` : ""}`;
    }
    return `${months} mes${months > 1 ? "es" : ""}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={onBack}
          className="hover:bg-gray-100"
        >
          Volver
        </Button>
        <Button variant="primary" icon={Edit2} onClick={onEdit}>
          Editar Animal
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Image and Basic Info */}
        <div className="lg:col-span-1">
          <Card>
            <div className="relative h-80 overflow-hidden rounded-t-xl">
              <img
                src={getAnimalImage()}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <StatusBadge status={animal.status || "Activo"} />
              </div>
            </div>
            <CardBody>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {animal.name}
              </h2>
              <p className="text-green-600 font-semibold mb-4">
                {animal.identifier || animal.visualCode}
              </p>

              <div className="space-y-3">
                <DetailCard
                  label="Categoría"
                  value={animal.type || animal.categoryName || "N/A"}
                  bg="bg-green-50"
                  border="border-green-200"
                />
                <DetailCard
                  label="Raza"
                  value={animal.breed || animal.breedName || "N/A"}
                />
                <DetailCard
                  label="Género"
                  value={
                    animal.gender ||
                    (animal.sex === "M" ? "Macho" : "Hembra") ||
                    "N/A"
                  }
                />
                <DetailCard label="Edad" value={calculateAge()} />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Physical Characteristics */}
          <Card>
            <CardHeader>
              <SectionTitle>Características Físicas</SectionTitle>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={Weight}
                  color="bg-blue-500"
                  label="Peso Actual"
                  value={`${animal.weight || animal.currentWeight || "0"} kg`}
                />
                <InfoItem
                  icon={Ruler}
                  color="bg-purple-500"
                  label="Altura"
                  value={`${animal.height || "N/A"} cm`}
                />
                <InfoItem
                  icon={Calendar}
                  color="bg-green-500"
                  label="Fecha de Nacimiento"
                  value={animal.birthDate || "N/A"}
                />
                <InfoItem
                  icon={DollarSign}
                  color="bg-yellow-500"
                  label="Costo Inicial"
                  value={`$${animal.initialCost || "0"}`}
                />
              </div>
            </CardBody>
          </Card>

          {/* Location and Management */}
          <Card>
            <CardHeader>
              <SectionTitle>Ubicación y Gestión</SectionTitle>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={MapPin}
                  color="bg-red-500"
                  label="Ubicación"
                  value={animal.location || animal.paddockName || "Sin asignar"}
                />
                <InfoItem
                  icon={Users}
                  color="bg-indigo-500"
                  label="Lote"
                  value={animal.batch || animal.batchName || "Sin asignar"}
                />
              </div>
            </CardBody>
          </Card>

          {/* Health Records */}
          {animal.healthRecords && animal.healthRecords.length > 0 && (
            <Card>
              <CardHeader>
                <SectionTitle>Historial de Salud</SectionTitle>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {animal.healthRecords.map((record, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-semibold text-gray-900">
                          {record.type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {record.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        {record.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        Veterinario: {record.veterinarian}
                      </p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {/* Weight History */}
          {animal.weightHistory && animal.weightHistory.length > 0 && (
            <Card>
              <CardHeader>
                <SectionTitle>Historial de Peso</SectionTitle>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  {animal.weightHistory.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-600">
                        {record.date}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {record.weight} kg
                      </span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}

          {/* Notes */}
          {animal.notes && (
            <Card>
              <CardHeader>
                <SectionTitle>Notas</SectionTitle>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700">{animal.notes}</p>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default AnimalDetailView;
