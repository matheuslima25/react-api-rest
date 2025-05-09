import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext";

// Lazy Loading das páginas
const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const ProductFormPage = lazy(() => import("../pages/ProductFormPage"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));


function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // Ainda validando, bloqueia tudo!
    return <div>Verificando sessão...</div>;
  }

  if (isAuthenticated === false) {
    // Sessão inválida, redireciona sem renderizar nada
    window.location.href = "/login";
    return null;
  }

  return children;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/new"
          element={
            <PrivateRoute>
              <ProductFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <ProductDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <PrivateRoute>
              <ProductFormPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}