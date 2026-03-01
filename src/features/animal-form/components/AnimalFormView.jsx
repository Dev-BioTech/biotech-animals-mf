import React, { useState, useEffect } from "react";
import {
  Save,
  X,
  Trash2,
  Upload,
  Zap,
  Activity,
  Calendar,
  Weight,
  Ruler,
  MapPin,
  DollarSign,
  Info,
  ChevronRight,
  Database,
  Search,
  AlertCircle,
  Settings,
  ExternalLink,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

/**
 * Animal Form View Component
 * Exact clone of the "Feeding/Nutrition" premium aesthetic
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
  const navigate = useNavigate();
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

  useEffect(() => {
    if (initialData) {
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
        birthDate: initialData.birthDate?.split("T")[0] || "",
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
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "REQUERIDO";
    if (!formData.identifier.trim()) newErrors.identifier = "REQUERIDO";
    if (!formData.categoryId) newErrors.categoryId = "REQUERIDO";
    if (!formData.breedId) newErrors.breedId = "REQUERIDO";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave(formData);
  };

  const isEditing = Boolean(animalId);

  // Styles from the shared image
  const inputStyles =
    "w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-white focus:ring-4 focus:ring-green-500/5 focus:border-green-500/30 outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-300 shadow-sm";
  const labelStyles =
    "flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1";
  const sectionTitleStyles =
    "text-[11px] font-black text-gray-900 uppercase tracking-[0.2em]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full my-4 md:my-6 bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden"
    >
      {/* Header Area */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl group shadow-lg">
        <div
          className="relative min-h-[180px] md:h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-emerald-800/85 to-teal-900/90" />
          <div className="relative h-full flex flex-col justify-center px-6 md:px-8 py-6 md:py-0 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-300/20 rounded-xl backdrop-blur-md">
                    <Zap className="w-6 h-6 md:w-8 md:h-8 text-green-300" />
                  </div>
                  <h2 className="text-xl md:text-3xl font-bold tracking-tight">
                    {isEditing ? "Actualizar Registro" : "Configuración Animal"}
                  </h2>
                </div>
                <p className="text-green-100/80 text-sm md:text-lg max-w-xl font-medium">
                  {isEditing
                    ? `Editando los parámetros biológicos para el activo ${formData.identifier}.`
                    : "Establezca los parámetros estratégicos para maximizar el rendimiento de su activo biológico."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/catalogs")}
                className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 transition-all active:scale-95 self-start md:self-center"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-300">
                    Configuración Base
                  </span>
                  <span className="text-xs font-bold whitespace-nowrap">
                    GESTIÓN DE CATÁLOGOS
                  </span>
                </div>
                <div className="p-2 bg-white/10 rounded-xl group-hover:bg-green-500 transition-colors">
                  <Settings className="w-5 h-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 md:p-10 lg:p-14 space-y-10 md:space-y-12"
      >
        {saveError && (
          <div className="p-5 bg-red-50/50 border border-red-100 rounded-2xl md:rounded-3xl text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-4 animate-pulse">
            <AlertCircle className="w-5 h-5" />
            {saveError}
          </div>
        )}

        {/* SECTION 1: IDENTITY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              <h3 className={sectionTitleStyles}>IDENTIDAD DEL ACTIVO</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className={labelStyles}>Nombre del Animal</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Ej: Estrella del Norte"
                  className={`${inputStyles} ${errors.name ? "border-red-200" : ""}`}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                  <div className="flex-1 min-w-0">
                    <label className={labelStyles}>Especie / Categoría</label>
                    <div className="flex gap-2">
                      <select
                        value={formData.categoryId}
                        onChange={(e) =>
                          handleChange("categoryId", e.target.value)
                        }
                        className={inputStyles}
                      >
                        <option value="">Seleccionar...</option>
                        {resources.categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        title="Administrar Categorías"
                        onClick={() => navigate("/catalogs")}
                        className="p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all active:scale-95 shrink-0"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className={labelStyles}>Fase / Raza</label>
                    <div className="flex gap-2">
                      <select
                        value={formData.breedId}
                        onChange={(e) =>
                          handleChange("breedId", e.target.value)
                        }
                        className={inputStyles}
                      >
                        <option value="">Seleccionar...</option>
                        {resources.breeds.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        title="Administrar Razas"
                        onClick={() => navigate("/catalogs")}
                        className="p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all active:scale-95 shrink-0"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              <h3 className={sectionTitleStyles}>ESTADO Y CAPACIDAD</h3>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className={labelStyles}>Identificador Visual</label>
                <input
                  type="text"
                  value={formData.identifier}
                  onChange={(e) => handleChange("identifier", e.target.value)}
                  placeholder="Ej: BOV-001"
                  className={inputStyles}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyles}>Género</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className={inputStyles}
                  >
                    <option value="Macho">Macho (Semental)</option>
                    <option value="Hembra">Hembra (Matriz)</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyles}>Prioridad / Estado</label>
                  <select className={inputStyles}>
                    <option>Activo (Saludable)</option>
                    <option>Observación</option>
                    <option>Tratamiento</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: METRICS (Indented Sub-box as in image) */}
        <div className="bg-gray-50/50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100/50 space-y-8 md:space-y-10">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            <h3 className={sectionTitleStyles}>
              PROYECCIÓN Y MÉTRICAS BIOLÓGICAS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <label className={labelStyles}>Peso Actual</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  className={`${inputStyles} pr-12`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-gray-400 uppercase">
                  KG
                </span>
              </div>
            </div>
            <div>
              <label className={labelStyles}>Altura</label>
              <div className="relative">
                <input
                  type="number"
                  step="1"
                  value={formData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  className={`${inputStyles} pr-12`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-gray-400 uppercase">
                  CM
                </span>
              </div>
            </div>
            <div className="sm:col-span-2 md:col-span-2">
              <label className={labelStyles}>
                Costo de Adquisición / Valor
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={formData.initialCost}
                  onChange={(e) => handleChange("initialCost", e.target.value)}
                  className={inputStyles}
                  placeholder="0.00"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">
                  $ USD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: LOCATION & MEDIA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label className={labelStyles}>Ubicación (Potrero)</label>
              <div className="relative">
                <div className="flex gap-2">
                  <select
                    value={formData.paddockId}
                    onChange={(e) => handleChange("paddockId", e.target.value)}
                    className={inputStyles}
                  >
                    <option value="">No asignado</option>
                    {resources.paddocks.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    title="Administrar Potreros"
                    onClick={() => navigate("/catalogs")}
                    className="p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all active:scale-95 shrink-0"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className={labelStyles}>Asignación de Lote</label>
              <select
                value={formData.batchId}
                onChange={(e) => handleChange("batchId", e.target.value)}
                className={inputStyles}
              >
                <option value="">Sin lote</option>
                {resources.batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelStyles}>Observaciones de Campo</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className={`${inputStyles} min-h-[120px] resize-none`}
                placeholder="Historial clínico, notas de comportamiento o suplementación especial..."
              />
            </div>
          </div>

          <div className="relative">
            <label className={labelStyles}>Registro de Imagen</label>
            <div className="group relative aspect-video lg:aspect-square rounded-[1.5rem] md:rounded-[2.5rem] bg-gray-50 border border-gray-100 overflow-hidden flex flex-col items-center justify-center transition-all hover:bg-white hover:border-green-200 shadow-inner">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
              ) : (
                <div className="text-center p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm">
                    <Upload className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Digitalizar Foto
                  </p>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 pt-10 border-t border-gray-50">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-gray-400 hover:text-gray-900 font-black text-[10px] uppercase tracking-widest transition-all"
            >
              Descartar cambios
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {isEditing && (
              <button
                type="button"
                onClick={onDelete}
                className="w-full sm:w-auto p-4 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto flex items-center justify-center gap-4 px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] bg-[#1a5a35] hover:bg-[#134428] text-white font-black text-[11px] md:text-[13px] uppercase tracking-[0.2em] shadow-xl md:shadow-2xl shadow-green-900/40 transition-all border border-green-400/20 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-5 h-5 md:w-6 md:h-6 border-3 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5 md:w-6 md:h-6 text-green-300" />
              )}
              {isSaving
                ? "PROCESANDO..."
                : isEditing
                  ? "CONFIRMAR"
                  : "CONFIRMAR REGISTRO"}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

export default AnimalFormView;
