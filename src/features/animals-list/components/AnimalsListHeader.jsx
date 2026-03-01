import React from "react";
import { motion } from "framer-motion";
import { Plus, Beef, Download } from "lucide-react";
import { Button } from "@shared/components/ui";

/**
 * Animals List Header Component
 * Hero section with title and create button
 * Matches Dashboard hero style exactly
 */
export const AnimalsListHeader = ({ onCreate, onExport }) => {
  return (
    <motion.div
      className="mb-6 md:mb-8 relative overflow-hidden rounded-2xl md:rounded-3xl group shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="relative min-h-[180px] md:h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-emerald-800/85 to-teal-900/90" />
        <div className="relative h-full flex flex-col justify-center px-6 md:px-8 py-6 md:py-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-300/20 rounded-xl backdrop-blur-md">
                  <Beef className="w-6 h-6 md:w-8 md:h-8 text-green-300" />
                </div>
                <h1 className="text-xl md:text-3xl font-bold text-white leading-tight">
                  Gestión de Animales
                </h1>
              </div>
              <p className="text-green-100/90 text-sm md:text-lg max-w-xl font-medium">
                Administra y monitorea el estado de tu ganado de forma eficiente
                desde cualquier dispositivo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {onExport && (
                <div className="w-full sm:hidden">
                  <Button
                    onClick={onExport}
                    variant="outline"
                    icon={Download}
                    className="w-full bg-white/10 border-white/20 text-white font-semibold py-2.5"
                  >
                    Exportar Reporte
                  </Button>
                </div>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={onCreate}
                  variant="primary"
                  icon={Plus}
                  className="w-full sm:w-auto bg-white text-green-800 hover:bg-green-50 shadow-lg font-bold py-2.5 sm:py-2 px-6 rounded-xl"
                >
                  Agregar Animal
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimalsListHeader;
