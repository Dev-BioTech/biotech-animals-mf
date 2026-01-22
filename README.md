# Animals Module - BioTech Project

## 📋 Overview

The Animals module is a microfrontend responsible for managing livestock animals in the BioTech platform. It provides comprehensive CRUD operations, health tracking, movement registration, and batch management.

## 🏗️ Architecture

### Project Structure

```
src/
├── features/              # Feature-based modules
│   ├── animals-list/     # Animal listing feature
│   ├── animal-detail/    # Animal detail view
│   └── animal-form/      # Animal creation/editing
├── shared/               # Shared resources
│   ├── components/       # Reusable UI components
│   │   └── ui/          # Base UI components
│   ├── constants/        # Constants and configurations
│   │   └── apiEndpoints.js  # API endpoint definitions
│   ├── services/         # API services
│   │   └── animalService.js # Animal API service
│   ├── store/           # State management (Zustand)
│   ├── utils/           # Utility functions
│   └── mocks/           # Mock data for development
└── App.jsx              # Main application component
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Use mock data (true) or real API (false)
VITE_USE_MOCK_API=true

# API Gateway URL
VITE_API_GATEWAY_URL=https://api-gateway-bio-tech.up.railway.app/api
```

### API Endpoints

All API endpoints are centralized in `src/shared/constants/apiEndpoints.js`:

```javascript
import ANIMALS_ENDPOINTS from "@shared/constants/apiEndpoints";

// Example usage
const url = ANIMALS_ENDPOINTS.BY_ID(animalId);
```

## 🎨 UI Components

The module includes a comprehensive set of reusable UI components:

### Card Components

```javascript
import { Card, CardHeader, CardBody, CardFooter } from "@shared/components/ui";

<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>;
```

### Form Controls

```javascript
import { Input, Select, Textarea } from "@shared/components/ui";

<Input label="Animal Name" error={errors.name} icon={TagIcon} />;
```

### Buttons

```javascript
import { Button, IconButton } from "@shared/components/ui";

<Button variant="primary" icon={PlusIcon}>
  Add Animal
</Button>;
```

### Status Components

```javascript
import { Badge, StatusBadge } from "@shared/components/ui";

<StatusBadge status="Activo" />;
```

### Loading States

```javascript
import { LoadingState, EmptyState, ErrorState } from "@shared/components/ui";

{
  loading && <LoadingState message="Loading animals..." />;
}
{
  !data.length && <EmptyState title="No animals found" />;
}
{
  error && <ErrorState message={error} onRetry={refetch} />;
}
```

## 📡 Services

### Animal Service

The `animalService` provides all animal-related API operations:

```javascript
import { animalService } from "@shared/services/animalService";

// Get all animals
const animals = await animalService.getAnimals({ farmId: 1 });

// Get animal by ID
const animal = await animalService.getAnimalById(id);

// Create animal
const newAnimal = await animalService.createAnimal(data);

// Update animal
const updated = await animalService.updateAnimal(id, data);

// Delete animal
await animalService.deleteAnimal(id);

// Register movement
await animalService.registerMovement(id, movementData);

// Update weight
await animalService.updateWeight(id, weightData);

// Get catalogs
const breeds = await animalService.getBreeds();
const categories = await animalService.getCategories();
const paddocks = await animalService.getPaddocks();
```

## 🎯 Best Practices

### 1. Use Path Aliases

Always use configured path aliases instead of relative imports:

```javascript
// ✅ Good
import { animalService } from "@shared/services/animalService";
import { Button } from "@shared/components/ui";

// ❌ Bad
import { animalService } from "../../../shared/services/animalService";
```

### 2. Component Composition

Build complex UIs by composing smaller components:

```javascript
<Card>
  <CardHeader>
    <h2>Animal Details</h2>
  </CardHeader>
  <CardBody>
    <StatusBadge status={animal.status} />
    <p>{animal.name}</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary">Edit</Button>
  </CardFooter>
</Card>
```

### 3. Error Handling

Always handle errors gracefully:

```javascript
try {
  const data = await animalService.getAnimals();
  setAnimals(data);
} catch (error) {
  console.error("Error fetching animals:", error);
  alertService.error("Failed to load animals");
}
```

### 4. Loading States

Provide feedback during async operations:

```javascript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await animalService.getAnimals();
    setAnimals(data);
  } finally {
    setLoading(false);
  }
};

return loading ? <LoadingState /> : <AnimalsList animals={animals} />;
```

## 🚀 Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Mock vs Real API

Toggle between mock and real API by setting `VITE_USE_MOCK_API`:

- `true`: Uses local mock data (no backend required)
- `false`: Connects to real API gateway

## 📝 Code Style

- Use functional components with hooks
- Follow React best practices
- Use JSDoc comments for functions
- Keep components small and focused
- Extract reusable logic into custom hooks

## 🔗 Related Modules

- **biotech-shell**: Main shell application
- **biotech-auth-mf**: Authentication module
- **biotech-health-mf**: Health records module
- **biotech-reproduction-mf**: Reproduction tracking module

## 📄 License

Private - BioTech Project
