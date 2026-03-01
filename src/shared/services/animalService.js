import apiClient from "@shared/utils/apiClient";
import ANIMALS_ENDPOINTS from "@shared/constants/apiEndpoints";

/**
 * Animals Service
 * Handles all animal-related API calls
 */
export const animalService = {
  /**
   * Get list of animals with optional filters
   * @param {Object} filters - Filter parameters (farmId, status, etc.)
   * @returns {Promise<Array>} List of animals
   */
  getAnimals: async (filters = {}) => {
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

      // Resilient data extraction
      return response.data?.data || response.data || [];
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
    try {
      const response = await apiClient.get(ANIMALS_ENDPOINTS.BY_ID(id));
      // Resilient data extraction
      return response.data?.data || response.data;
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
    try {
      const response = await apiClient.post(ANIMALS_ENDPOINTS.BASE, animalData);
      // Resilient data extraction
      return response.data?.data || response.data;
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
   * @param {Object} weightData - Weight data (PUT as per image)
   * @returns {Promise<Object>} Weight update result
   */
  updateWeight: async (id, weightData) => {
    try {
      const response = await apiClient.put(
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
   * @param {Object} batchData - Batch data (PUT as per image)
   * @returns {Promise<Object>} Batch move result
   */
  moveToBatch: async (id, batchData) => {
    try {
      const response = await apiClient.put(
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
   * @param {Object} saleData - Sale data (PUT as per image)
   * @returns {Promise<Object>} Sale result
   */
  markAsSold: async (id, saleData) => {
    try {
      const response = await apiClient.put(
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
   * @param {Object} deathData - Death data (PUT as per image)
   * @returns {Promise<Object>} Death registration result
   */
  markAsDead: async (id, deathData) => {
    try {
      const response = await apiClient.put(
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
    try {
      const response = await apiClient.get(ANIMALS_ENDPOINTS.BREEDS);
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Error fetching breeds:", error);
      return [];
    }
  },

  createBreed: async (data) => {
    try {
      const response = await apiClient.post(ANIMALS_ENDPOINTS.BREEDS, data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error creating breed:", error);
      throw error;
    }
  },

  /**
   * Get available categories
   * @returns {Promise<Array>} List of categories
   */
  getCategories: async () => {
    try {
      const response = await apiClient.get(ANIMALS_ENDPOINTS.CATEGORIES);
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  createCategory: async (data) => {
    try {
      const response = await apiClient.post(ANIMALS_ENDPOINTS.CATEGORIES, data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  /**
   * Get available paddocks
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Array>} List of paddocks
   */
  getPaddocks: async (filters = {}) => {
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
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Error fetching paddocks:", error);
      return [];
    }
  },

  createPaddock: async (data) => {
    try {
      const response = await apiClient.post(ANIMALS_ENDPOINTS.PADDOCKS, data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error creating paddock:", error);
      throw error;
    }
  },

  /**
   * Get available batches
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Array>} List of batches
   */
  getBatches: async (filters = {}) => {
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
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Error fetching batches:", error);
      return [];
    }
  },

  createBatch: async (data) => {
    try {
      const response = await apiClient.post(ANIMALS_ENDPOINTS.BATCHES, data);
      return response.data?.data || response.data;
    } catch (error) {
      console.error("Error creating batch:", error);
      throw error;
    }
  },

  /**
   * Get movement types
   * @returns {Promise<Array>} List of movement types
   */
  getMovementTypes: async () => {
    try {
      const response = await apiClient.get(ANIMALS_ENDPOINTS.MOVEMENT_TYPES);
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Error fetching movement types:", error);
      return [];
    }
  },
};

export default animalService;
