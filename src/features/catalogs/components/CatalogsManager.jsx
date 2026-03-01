import React, { useState, useEffect } from "react";
import {
  Settings,
  Plus,
  Tags,
  Box,
  Map as MapIcon,
  ChevronRight,
  Loader2,
  Search,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { animalService } from "@shared/services/animalService";
import { useAuthStore } from "@shared/store/authStore";
import alertService from "@shared/utils/alertService";

const CATALOG_TYPES = [
  {
    id: "breeds",
    name: "Razas",
    icon: Tags,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "categories",
    name: "Categorías",
    icon: Box,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    id: "paddocks",
    name: "Potreros",
    icon: MapIcon,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: "batches",
    name: "Lotes",
    icon: Box,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export default function CatalogsManager() {
  const [activeTab, setActiveTab] = useState("breeds");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const selectedFarm = useAuthStore((state) => state.selectedFarm);

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = [];
      const filters =
        activeTab === "paddocks" || activeTab === "batches"
          ? { farmId: selectedFarm?.id }
          : {};

      switch (activeTab) {
        case "breeds":
          data = await animalService.getBreeds();
          break;
        case "categories":
          data = await animalService.getCategories();
          break;
        case "paddocks":
          data = await animalService.getPaddocks(filters);
          break;
        case "batches":
          data = await animalService.getBatches(filters);
          break;
        default:
          data = [];
      }
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching catalog data:", error);
      alertService.error("No se pudo cargar la información");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, selectedFarm?.id]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    setIsSaving(true);
    try {
      const payload = {
        name: newItemName,
        // Algunos catálogos requieren farmId
        ...(activeTab === "paddocks" || activeTab === "batches"
          ? { farmId: selectedFarm?.id }
          : {}),
      };

      switch (activeTab) {
        case "breeds":
          await animalService.createBreed(payload);
          break;
        case "categories":
          await animalService.createCategory(payload);
          break;
        case "paddocks":
          await animalService.createPaddock(payload);
          break;
        case "batches":
          await animalService.createBatch(payload);
          break;
      }

      alertService.success(`${newItemName} creado correctamente`);
      setNewItemName("");
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error creating item:", error);
      alertService.error("Error al crear el elemento");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Gestión de Catálogos
                </h1>
                <p className="text-gray-500 font-medium">
                  Configura los recursos base de tu granja
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-100 transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Nuevo Elemento
            </button>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
          <div className="flex overflow-x-auto gap-8 no-scrollbar">
            {CATALOG_TYPES.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? tab.color : "text-gray-400"}`}
                  />
                  {tab.name}
                  <span
                    className={`ml-1 text-xs px-2 py-0.5 rounded-full ${isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                  >
                    {!loading && activeTab === tab.id
                      ? filteredItems.length
                      : "-"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-8 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Buscar en ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none shadow-sm transition-all"
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium italic">
              Sincronizando con el servidor...
            </p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={item.id}
                className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>

                <div className="flex items-center gap-4 mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${CATALOG_TYPES.find((t) => t.id === activeTab).bg}`}
                  >
                    {React.createElement(
                      CATALOG_TYPES.find((t) => t.id === activeTab).icon,
                      {
                        className: `w-5 h-5 ${CATALOG_TYPES.find((t) => t.id === activeTab).color}`,
                      },
                    )}
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {activeTab}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-green-700 transition-colors">
                  {item.name}
                </h3>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 border-t border-gray-50 pt-4">
                  <span className="bg-gray-50 px-3 py-1 rounded-lg">
                    ID: {item.id}
                  </span>
                  <div className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors cursor-pointer">
                    {/* Delete icon could go here */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No se encontraron resultados
            </h2>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">
              Parece que aún no has registrado elementos en este catálogo o la
              búsqueda no coincide.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-green-600 font-bold hover:underline"
            >
              <Plus className="w-4 h-4" />
              Crear el primero ahora
            </button>
          </div>
        )}
      </main>

      {/* Quick Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-green-50"
            >
              {/* Modal Header with Gradient */}
              <div className="bg-gradient-to-br from-green-700 via-green-800 to-green-900 p-8 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-4 -translate-y-4 scale-150">
                  {React.createElement(
                    CATALOG_TYPES.find((t) => t.id === activeTab).icon,
                    { className: "w-24 h-24" },
                  )}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-1">
                    <Plus className="w-5 h-5 text-green-300" />
                    <h2 className="text-xl font-black tracking-tight uppercase">
                      Nuevo{" "}
                      {CATALOG_TYPES.find((t) => t.id === activeTab).name.slice(
                        0,
                        -1,
                      )}
                    </h2>
                  </div>
                  <p className="text-green-100 text-xs font-medium opacity-80 uppercase tracking-widest">
                    Registro de recurso base para la granja
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreate} className="p-8 space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                    Nombre del{" "}
                    {CATALOG_TYPES.find((t) => t.id === activeTab).name.slice(
                      0,
                      -1,
                    )}
                  </label>
                  <input
                    autoFocus
                    type="text"
                    required
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Escriba el nombre aquí..."
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none font-bold text-gray-800 transition-all shadow-inner"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-8 py-4 rounded-2xl text-gray-400 hover:text-gray-900 font-black text-[10px] uppercase tracking-widest transition-all"
                  >
                    Descartar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || !newItemName.trim()}
                    className="flex-1 px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-green-900/10 transition-all border border-green-500 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-300" />
                    )}
                    {isSaving ? "Guardando..." : "Confirmar Registro"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
