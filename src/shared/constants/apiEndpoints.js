/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for the Animals module
 */

const API_VERSION = "/v1";

export const ANIMALS_ENDPOINTS = {
  // Animal CRUD operations
  BASE: `${API_VERSION}/animals`,
  BY_ID: (id) => `${API_VERSION}/animals/${id}`,

  // Animal operations
  WEIGHT: (id) => `${API_VERSION}/animals/${id}/weight`,
  MOVEMENT: (id) => `${API_VERSION}/animals/${id}/movements`,
  BATCH: (id) => `${API_VERSION}/animals/${id}/batch`,
  SELL: (id) => `${API_VERSION}/animals/${id}/sell`,
  DEATH: (id) => `${API_VERSION}/animals/${id}/dead`,

  // Catalog endpoints
  BREEDS: `${API_VERSION}/breeds`,
  CATEGORIES: `${API_VERSION}/categories`,
  PADDOCKS: `${API_VERSION}/paddocks`,
  BATCHES: `${API_VERSION}/batches`,
  MOVEMENT_TYPES: `${API_VERSION}/movement-types`,
};

export default ANIMALS_ENDPOINTS;
