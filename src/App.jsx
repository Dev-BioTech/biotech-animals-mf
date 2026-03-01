import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AnimalsList from "./features/animals-list/components/AnimalsList";
import AnimalDetail from "./features/animal-detail/components/AnimalDetail";
import AnimalForm from "./features/animal-form/components/AnimalForm";
import CatalogsManager from "./features/catalogs/components/CatalogsManager";
import { Layout } from "./layout/components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/animals" />} />
          <Route path="/animals" element={<AnimalsList />} />
          <Route path="/animals/create" element={<AnimalForm />} />
          <Route path="/animals/:id" element={<AnimalDetail />} />
          <Route path="/animals/edit/:id" element={<AnimalForm />} />
          <Route path="/catalogs" element={<CatalogsManager />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
