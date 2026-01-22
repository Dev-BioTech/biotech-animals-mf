import apiClient from "@shared/utils/apiClient";
import ANIMALS_ENDPOINTS from "@shared/constants/apiEndpoints";
import { MOCK_ANIMALS } from "@shared/mocks/animalsData";

// Environment configuration
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API === "true";

/**
 * Animals Service
 * Handles all animal-related API calls with mock fallback
 */
export const animalService = {
  /**
   * Get list of animals with optional filters
   * @param {Object} filters - Filter parameters (farmId, status, etc.)
   * @returns {Promise<Array>} List of animals
   */
  getAnimals: async (filters = {}) => {
    if (USE_MOCK) {
      return mockGetAnimals(filters);
    }

    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });

      const response = await apiClient.get(
        `${ANIMALS_ENDPOINTS.BASE}?${params.toString()}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching animals:", error);
      throw error;
    }
  },

  /**
   * Get animal by ID
   * @param {string|number} id - Animal ID
   * @returns {Promise<Object>} Animal details
   */
  getAnimalById: async (id) => {
    if (USE_MOCK) {
      return mockGetAnimalById(id);
    }

    try {
      const response = await apiClient.get(ANIMALS_ENDPOINTS.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching animal ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new animal
   * @param {Object} animalData - Animal data
   * @returns {Promise<Object>} Created animal
   */
  createAnimal: async (animalData) => {
    if (USE_MOCK) {
      return mockCreateAnimal(animalData);
    }

    try {
      const response = await apiClient.post(ANIMALS_ENDPOINTS.BASE, animalData);
      return response.data;
    } catch (error) {
      console.error("Error creating animal:", error);
      throw error;
    }
  },

  /**
   * Update existing animal
   * @param {string|number} id - Animal ID
   * @param {Object} animalData - Updated animal data
   * @returns {Promise<Object>} Updated animal
   */
  updateAnimal: async (id, animalData) => {
    if (USE_MOCK) {
      return mockUpdateAnimal(id, animalData);
    }

    try {
      const response = await apiClient.put(
        ANIMALS_ENDPOINTS.BY_ID(id),
        animalData,
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating animal ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete animal
   * @param {string|number} id - Animal ID
   * @returns {Promise<Object>} Deletion result
   */
  deleteAnimal: async (id) => {
    if (USE_MOCK) {
      return mockDeleteAnimal(id);
    }

    try {
      const response = await apiClient.delete(ANIMALS_ENDPOINTS.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error deleting animal ${id}:`, error);
      throw error;
    }
  },

  /**
   * Register animal movement
   * @param {string|number} id - Animal ID
   * @param {Object} movementData - Movement data
   * @returns {Promise<Object>} Movement result
   */
  registerMovement: async (id, movementData) => {
    if (USE_MOCK) {
      return mockRegisterMovement(id, movementData);
    }

    try {
      const response = await apiClient.post(
        ANIMALS_ENDPOINTS.MOVEMENT(id),
        movementData,
      );
      return response.data;
    } catch (error) {
      console.error(`Error registering movement for animal ${id}:`, error);
      throw error;
    }
  },

  /**
   * Update animal weight
   * @param {string|number} id - Animal ID
   * @param {Object} weightData - Weight data
   * @returns {Promise<Object>} Weight update result
   */
  updateWeight: async (id, weightData) => {
    if (USE_MOCK) {
      return mockUpdateWeight(id, weightData);
    }

    try {
      const response = await apiClient.post(
        ANIMALS_ENDPOINTS.WEIGHT(id),
        weightData,
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating weight for animal ${id}:`, error);
      throw error;
    }
  },

  /**
   * Move animal to batch
   * @param {string|number} id - Animal ID
   * @param {Object} batchData - Batch data
   * @returns {Promise<Object>} Batch move result
   */
  moveToBatch: async (id, batchData) => {
    if (USE_MOCK) {
      return mockMoveToBatch(id, batchData);
    }

    try {
      const response = await apiClient.post(
        ANIMALS_ENDPOINTS.BATCH(id),
        batchData,
      );
      return response.data;
    } catch (error) {
      console.error(`Error moving animal ${id} to batch:`, error);
      throw error;
    }
  },

  /**
   * Mark animal as sold
   * @param {string|number} id - Animal ID
   * @param {Object} saleData - Sale data
   * @returns {Promise<Object>} Sale result
   */
  markAsSold: async (id, saleData) => {
    if (USE_MOCK) {
      return mockMarkAsSold(id, saleData);
    }

    try {
      const response = await apiClient.post(
        ANIMALS_ENDPOINTS.SELL(id),
        saleData,
      );
      return response.data;
    } catch (error) {
      console.error(`Error marking animal ${id} as sold:`, error);
      throw error;
    }
  },

  /**
   * Mark animal as dead
   * @param {string|number} id - Animal ID
   * @param {Object} deathData - Death data
   * @returns {Promise<Object>} Death registration result
   */
  markAsDead: async (id, deathData) => {
    if (USE_MOCK) {
      return mockMarkAsDead(id, deathData);
    }

    try {
      const response = await apiClient.post(
        ANIMALS_ENDPOINTS.DEATH(id),
        deathData,
      );
      return response.data;
    } catch (error) {
      console.error(`Error marking animal ${id} as dead:`, error);
      throw error;
    }
  },

  /**
   * Get available breeds
   * @returns {Promise<Array>} List of breeds
   */
  getBreeds: async () => {
    if (USE_MOCK) {
      return mockGetBreeds();
    }

    try {
      const response = await apiClient.get(ANIMALS_ENDPOINTS.BREEDS);
      return response.data;
    } catch (error) {
      console.error("Error fetching breeds:", error);
      return [];
    }
  },

  /**
   * Get available categories
   * @returns {Promise<Array>} List of categories
   */
  getCategories: async () => {
    if (USE_MOCK) {
      return mockGetCategories();
    }

    try {
      const response = await apiClient.get(ANIMALS_ENDPOINTS.CATEGORIES);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  /**
   * Get available paddocks
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Array>} List of paddocks
   */
  getPaddocks: async (filters = {}) => {
    if (USE_MOCK) {
      return mockGetPaddocks(filters);
    }

    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });

      const response = await apiClient.get(
        `${ANIMALS_ENDPOINTS.PADDOCKS}?${params.toString()}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching paddocks:", error);
      return [];
    }
  },

  /**
   * Get available batches
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Array>} List of batches
   */
  getBatches: async (filters = {}) => {
    if (USE_MOCK) {
      return mockGetBatches(filters);
    }

    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });

      const response = await apiClient.get(
        `${ANIMALS_ENDPOINTS.BATCHES}?${params.toString()}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching batches:", error);
      return [];
    }
  },

  /**
   * Get movement types
   * @returns {Promise<Array>} List of movement types
   */
  getMovementTypes: async () => {
    if (USE_MOCK) {
      return mockGetMovementTypes();
    }

    try {
      const response = await apiClient.get(ANIMALS_ENDPOINTS.MOVEMENT_TYPES);
      return response.data;
    } catch (error) {
      console.error("Error fetching movement types:", error);
      return [];
    }
  },
};

// ============================================================================
// MOCK IMPLEMENTATIONS
// ============================================================================

const MOCK_BREEDS = [
  { id: "1", name: "Holstein" },
  { id: "2", name: "Angus" },
  { id: "3", name: "Jersey" },
  { id: "4", name: "Brahman" },
  { id: "5", name: "Simmental" },
  { id: "6", name: "Charolais" },
  { id: "7", name: "Merino" },
  { id: "8", name: "Duroc" },
  { id: "9", name: "Yorkshire" },
];

const MOCK_CATEGORIES = [
  { id: "1", name: "Vaca" },
  { id: "2", name: "Toro" },
  { id: "3", name: "Novilla" },
  { id: "4", name: "Novillo" },
  { id: "5", name: "Ternero" },
  { id: "6", name: "Ternera" },
  { id: "7", name: "Bovino" },
  { id: "8", name: "Porcino" },
  { id: "9", name: "Ovino" },
];

const MOCK_PADDOCKS = [
  { id: "1", name: "Potrero A", capacity: 50 },
  { id: "2", name: "Potrero B", capacity: 30 },
  { id: "3", name: "Potrero C", capacity: 40 },
  { id: "4", name: "Corral A-1", capacity: 20 },
  { id: "5", name: "Corral A-3", capacity: 20 },
  { id: "6", name: "Corral A-4", capacity: 20 },
  { id: "7", name: "Corral B-1", capacity: 15 },
  { id: "8", name: "Corral B-2", capacity: 15 },
  { id: "9", name: "Corral C-1", capacity: 25 },
];

const MOCK_BATCHES = [
  { id: "1", name: "Lote 1", count: 25 },
  { id: "2", name: "Lote 2", count: 15 },
  { id: "3", name: "Lote 3", count: 20 },
];

const MOCK_MOVEMENT_TYPES = [
  { id: 1, name: "Compra" },
  { id: 2, name: "Venta" },
  { id: 3, name: "Traslado" },
  { id: 4, name: "Nacimiento" },
  { id: 5, name: "Muerte" },
];

// Mock data storage (simulates database)
let mockAnimalsDB = [...MOCK_ANIMALS];

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

async function mockGetAnimals(filters) {
  await delay();
  let filtered = [...mockAnimalsDB];

  if (filters.farmId) {
    filtered = filtered.map((a) => ({ ...a, farmId: filters.farmId }));
  }

  if (filters.status) {
    filtered = filtered.filter((a) => a.status === filters.status);
  }

  return filtered;
}

async function mockGetAnimalById(id) {
  await delay(200);
  // Buscamos ignorando tipos (==) y quitando posibles espacios
  const targetId = String(id).trim();
  const animal = mockAnimalsDB.find((a) => String(a.id).trim() === targetId);

  if (!animal) {
    console.warn(
      `Animal with ID ${id} not found in mock DB. Available IDs:`,
      mockAnimalsDB.map((a) => a.id),
    );
    throw new Error("Animal not found");
  }
  return animal;
}

async function mockCreateAnimal(animalData) {
  await delay();
  const newAnimal = {
    id: String(mockAnimalsDB.length + 1),
    ...animalData,
    status: animalData.status || "Activo",
  };
  mockAnimalsDB.push(newAnimal);
  return { data: newAnimal };
}

async function mockUpdateAnimal(id, animalData) {
  await delay();
  const index = mockAnimalsDB.findIndex((a) => a.id === String(id));
  if (index === -1) throw new Error("Animal not found");
  mockAnimalsDB[index] = { ...mockAnimalsDB[index], ...animalData };
  return mockAnimalsDB[index];
}

async function mockDeleteAnimal(id) {
  await delay();
  const index = mockAnimalsDB.findIndex((a) => a.id === String(id));
  if (index === -1) throw new Error("Animal not found");
  mockAnimalsDB.splice(index, 1);
  return { success: true };
}

async function mockRegisterMovement(id, movementData) {
  await delay();
  return { success: true, message: "Movement registered", data: movementData };
}

async function mockUpdateWeight(id, weightData) {
  await delay();
  const animal = mockAnimalsDB.find((a) => a.id === String(id));
  if (animal) animal.weight = weightData.weight;
  return { success: true, data: weightData };
}

async function mockMoveToBatch(id, batchData) {
  await delay();
  const animal = mockAnimalsDB.find((a) => a.id === String(id));
  if (animal) animal.batch = batchData.batchName;
  return { success: true, data: batchData };
}

async function mockMarkAsSold(id, saleData) {
  await delay();
  const animal = mockAnimalsDB.find((a) => a.id === String(id));
  if (animal) animal.status = "Vendido";
  return { success: true, data: saleData };
}

async function mockMarkAsDead(id, deathData) {
  await delay();
  const animal = mockAnimalsDB.find((a) => a.id === String(id));
  if (animal) animal.status = "Muerto";
  return { success: true, data: deathData };
}

async function mockGetBreeds() {
  await delay(200);
  return MOCK_BREEDS;
}

async function mockGetCategories() {
  await delay(200);
  return MOCK_CATEGORIES;
}

async function mockGetPaddocks(filters) {
  await delay(200);
  return MOCK_PADDOCKS;
}

async function mockGetBatches(filters) {
  await delay(200);
  return MOCK_BATCHES;
}

async function mockGetMovementTypes() {
  await delay(200);
  return MOCK_MOVEMENT_TYPES;
}

export default animalService;
