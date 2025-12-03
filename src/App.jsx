// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./features/auth/AuthContext";
import { RequireAuth } from "./features/auth/RequireAuth";
import { FavoritesProvider } from "./features/favorites/FavoritesContext";

// Общие страницы
import { LandingPage } from "./pages/LandingPage";
import { ForbiddenPage } from "./pages/ForbiddenPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Auth
import { LoginPage } from "./features/auth/LoginPage";
import { RegisterPage } from "./features/auth/RegisterPage";

// Психологи (каталог + профиль + избранное)
import PsychologistsListPage from "./features/psychologists/pages/PsychologistsListPage";
import PsychologistDetailPage from "./features/psychologists/pages/PsychologistDetailPage";
import FavoritePsychologistsPage from "./features/psychologists/pages/FavoritePsychologistsPage";

// Кабинет психолога
import { PsyLayout } from "./features/psy/PsyLayout";
import { PsyDashboardPage } from "./features/psy/pages/PsyDashboardPage";
import { PsyProfilePage } from "./features/psy/pages/PsyProfilePage";
import { PsySchedulePage } from "./features/psy/pages/PsySchedulePage";
import { PsyPricesPage } from "./features/psy/pages/PsyPricesPage";
import { PsyEducationPage } from "./features/psy/pages/PsyEducationPage";
import { PsyPaymentsPage } from "./features/psy/pages/PsyPaymentsPage";
import { PsyFinancePage } from "./features/psy/pages/PsyFinancePage";
import { PsyClientsPage } from "./features/psy/pages/PsyClientsPage";

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            {/* Публичные страницы */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/psychologists" element={<PsychologistsListPage />} />
            <Route
              path="/psychologists/:id"
              element={<PsychologistDetailPage />}
            />

            {/* Страница избранного (для залогиненных) */}
            <Route
              path="/favorites"
              element={
                <RequireAuth>
                  <FavoritePsychologistsPage />
                </RequireAuth>
              }
            />

            {/* Auth */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/forbidden" element={<ForbiddenPage />} />

            {/* Кабинет психолога (только роль psychologist) */}
            <Route
              path="/psy"
              element={
                <RequireAuth role="psychologist">
                  <PsyLayout />
                </RequireAuth>
              }
            >
              <Route index element={<PsyDashboardPage />} />
              <Route path="profile" element={<PsyProfilePage />} />
              <Route path="schedule" element={<PsySchedulePage />} />
              <Route path="prices" element={<PsyPricesPage />} />
              <Route path="education" element={<PsyEducationPage />} />
              <Route path="payments" element={<PsyPaymentsPage />} />
              <Route path="finance" element={<PsyFinancePage />} />
              <Route path="clients" element={<PsyClientsPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
}
