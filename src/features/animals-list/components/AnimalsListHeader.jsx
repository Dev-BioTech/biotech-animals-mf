import React from "react";
import { motion } from "framer-motion";
import { Plus, Beef } from "lucide-react";
import { Button } from "@shared/components/ui";

/**
 * Animals List Header Component
 * Hero section with title and create button
 */
export const AnimalsListHeader = ({ onCreate }) => {
  return (
    <motion.div
      className="mb-8 relative overflow-hidden rounded-3xl group shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="relative h-48 bg-cover bg-center rounded-3xl transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-emerald-800/85 to-teal-900/90 rounded-3xl" />
        <div className="relative h-full flex flex-col justify-center px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between flex-wrap gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Beef className="w-8 h-8 text-green-300" />
                <h1 className="text-3xl font-bold text-white">
                  Gestión de Animales
                </h1>
              </div>
              <p className="text-green-100 text-lg">
                Administra y monitorea el estado de tu ganado de forma
                eficiente.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onCreate}
                variant="primary"
                icon={Plus}
                className="bg-white text-green-800 hover:bg-green-50 shadow-lg font-bold"
              >
                Agregar Animal
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimalsListHeader;
