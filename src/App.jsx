// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./features/auth/AuthContext";
import { RequireAuth } from "./features/auth/RequireAuth";
import { FavoritesProvider } from "./features/favorites/FavoritesContext";

// Общие страницы
import { LandingPage } from "./pages/LandingPage";
import { ForbiddenPage } from "./pages/ForbiddenPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import InfluencersPage from "./pages/InfluencersPage";
import CompaniesPage from "./pages/CompaniesPage";
import ForPsychologistsPage from "./pages/ForPsychologistsPage";

// Тест API (страница, где дергаем Swagger-эндпоинт)
import TestApiPage from "./pages/TestApiPage";

// Auth
import { LoginPage } from "./features/auth/LoginPage";
import { RegisterPage } from "./features/auth/RegisterPage";

// Психологи (каталог + профиль + избранное)
import PsychologistsListPage from "./features/psychologists/pages/PsychologistsListPage";
import PsychologistDetailPage from "./features/psychologists/pages/PsychologistDetailPage";
import FavoritePsychologistsPage from "./features/psychologists/pages/FavoritePsychologistsPage";
import ContactsPage from "./pages/ContactsPage";

// Кабинет клиента (client)
import ClientLayout from "./features/profile/ClientLayout";
import ClientProfilePage from "./features/profile/ClientProfilePage";
import ClientPsychologistsPage from "./features/profile/ClientPsychologistsPage";
import ClientSettingsPage from "./features/profile/ClientSettingsPage";
import ClientBillingPage from "./features/profile/ClientBillingPage";
import ClientVideoChatPage from "./features/profile/ClientVideoChatPage";
import ClientSupportPage from "./features/profile/ClientSupportPage";

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            {/* Публичные страницы */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/psychologists" element={<PsychologistsListPage />} />
            <Route path="/influencers" element={<InfluencersPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/psy" element={<ForPsychologistsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            {/* Тестовый экран для проверки подключения к API */}
            <Route path="/test-api" element={<TestApiPage />} />

            {/* Страница конкретного психолога */}
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

            {/* Кабинет клиента (роль client) */}
            <Route
              path="/client"
              element={
                <RequireAuth role="client">
                  <ClientLayout />
                </RequireAuth>
              }
            >
              <Route index element={<ClientProfilePage />} />
              <Route
                path="psychologists"
                element={<ClientPsychologistsPage />}
              />
              <Route path="settings" element={<ClientSettingsPage />} />
              <Route path="billing" element={<ClientBillingPage />} />
              <Route path="videochat" element={<ClientVideoChatPage />} />
              <Route path="support" element={<ClientSupportPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
}
