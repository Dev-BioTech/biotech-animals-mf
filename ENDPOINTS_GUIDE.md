# 📡 Guía de Endpoints y Conexión con Backend

## 🎯 Archivos Clave para Configuración de API

### 1. **Configuración de Endpoints**

📁 `src/shared/constants/apiEndpoints.js`

Este es el archivo donde defines **TODOS los endpoints** de tu API. Aquí es donde debes agregar o modificar las rutas cuando conectes con el backend real.

```javascript
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
  DEATH: (id) => `${API_VERSION}/animals/${id}/death`,

  // Catalog endpoints
  BREEDS: `${API_VERSION}/breeds`,
  CATEGORIES: `${API_VERSION}/categories`,
  PADDOCKS: `${API_VERSION}/paddocks`,
  BATCHES: `${API_VERSION}/batches`,
  MOVEMENT_TYPES: `${API_VERSION}/movement-types`,
};
```

**✏️ Cómo modificar:**

- Si tu backend usa una versión diferente (ej: `/api/v2`), cambia `API_VERSION`
- Si los endpoints tienen nombres diferentes, actualiza las rutas aquí
- Si necesitas agregar nuevos endpoints, agrégalos en este objeto

---

### 2. **Cliente HTTP (Axios)**

📁 `src/shared/utils/apiClient.js`

Este archivo configura el cliente HTTP que hace las peticiones al backend. Aquí se configuran:

- La URL base del API
- Los headers por defecto
- Los interceptores para autenticación
- El manejo de errores

```javascript
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";
const API_URL =
  import.meta.env.VITE_API_GATEWAY_URL ||
  "https://api-gateway-bio-tech.up.railway.app/api";

const apiClient = axios.create({
  baseURL: USE_MOCK_API ? "http://localhost:9999/mock-api" : API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

**✏️ Cómo modificar:**

- Normalmente NO necesitas modificar este archivo
- Si necesitas cambiar el timeout, headers globales, o lógica de autenticación, hazlo aquí
- Los interceptores ya están configurados para agregar el token JWT automáticamente

---

### 3. **Variables de Entorno**

📁 `.env`

Aquí configuras las variables de entorno para cambiar entre modo mock y backend real:

```env
# API Configuration
VITE_USE_MOCK_API=true                                    # Cambiar a 'false' para usar backend real
VITE_API_GATEWAY_URL=http://localhost:8000/api           # URL de tu backend

# Application Configuration
VITE_APP_NAME=BioTech Animals
VITE_APP_VERSION=1.0.0
```

**✏️ Cómo modificar:**

- Para **desarrollo local con mocks**: `VITE_USE_MOCK_API=true`
- Para **conectar con backend local**:
  ```env
  VITE_USE_MOCK_API=false
  VITE_API_GATEWAY_URL=http://localhost:8000/api
  ```
- Para **conectar con backend en producción**:
  ```env
  VITE_USE_MOCK_API=false
  VITE_API_GATEWAY_URL=https://api-gateway-bio-tech.up.railway.app/api
  ```

---

### 4. **Servicio de Animales**

📁 `src/shared/services/animalService.js`

Este archivo contiene toda la lógica de llamadas a la API. **NO necesitas modificar este archivo** cuando conectes con el backend, ya que:

- Usa los endpoints definidos en `apiEndpoints.js`
- Usa el cliente configurado en `apiClient.js`
- Ya tiene fallback a mocks si falla la API

```javascript
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
```

---

## 🔄 Flujo de Conexión con Backend

### Paso 1: Verificar que el Backend esté Corriendo

```bash
# Verifica que tu backend responda en la URL configurada
curl http://localhost:8000/api/v1/animals
```

### Paso 2: Actualizar Variables de Entorno

```env
# .env
VITE_USE_MOCK_API=false
VITE_API_GATEWAY_URL=http://localhost:8000/api
```

### Paso 3: Reiniciar el Servidor de Desarrollo

```bash
npm run dev
```

### Paso 4: Verificar en la Consola del Navegador

- Abre las DevTools (F12)
- Ve a la pestaña "Network"
- Deberías ver las peticiones a `http://localhost:8000/api/v1/animals`

---

## 🛠️ Solución de Problemas Comunes

### ❌ Error: CORS

**Problema:** El backend rechaza las peticiones por CORS
**Solución:** Configura CORS en tu backend para permitir `http://localhost:5173`

### ❌ Error: 404 Not Found

**Problema:** Los endpoints no coinciden
**Solución:** Verifica que las rutas en `apiEndpoints.js` coincidan con las del backend

### ❌ Error: 401 Unauthorized

**Problema:** El token no se está enviando correctamente
**Solución:** Verifica que el token esté guardado en `localStorage` con la clave `auth-storage`

### ❌ Error: Network Error

**Problema:** El backend no está corriendo o la URL es incorrecta
**Solución:** Verifica que `VITE_API_GATEWAY_URL` sea correcta y el backend esté corriendo

---

## 📝 Checklist para Conectar con Backend

- [ ] Backend está corriendo y responde en la URL configurada
- [ ] Actualizar `VITE_USE_MOCK_API=false` en `.env`
- [ ] Actualizar `VITE_API_GATEWAY_URL` con la URL correcta del backend
- [ ] Verificar que los endpoints en `apiEndpoints.js` coincidan con el backend
- [ ] Reiniciar el servidor de desarrollo (`npm run dev`)
- [ ] Verificar en Network DevTools que las peticiones se hagan correctamente
- [ ] Verificar que el token JWT se envíe en los headers

---

## 🎨 Estructura de Respuesta del Backend

El servicio espera respuestas en este formato:

```javascript
// Respuesta exitosa
{
  "data": [...],      // Array de animales o datos
  "success": true,
  "message": "OK"
}

// O simplemente un array directo
[...]
```

Si tu backend devuelve un formato diferente, puedes ajustar el manejo en `animalService.js`.

---

## 🔐 Autenticación

El token JWT se envía automáticamente en cada petición:

```javascript
headers: {
  Authorization: `Bearer ${token}`;
}
```

El token se obtiene de `localStorage` con la clave `auth-storage` y debe tener esta estructura:

```javascript
{
  state: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
  }
}
```

---

## 📚 Recursos Adicionales

- **Documentación de Axios:** https://axios-http.com/
- **Vite Environment Variables:** https://vitejs.dev/guide/env-and-mode.html
- **API Gateway URL:** Consulta con el equipo de backend la URL correcta
