// src/features/auth/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ← вот этого импорта не хватало

/**
 * Обёртка для роутов, которые требуют авторизации.
 * Если передать проп role, то дополнительно проверяем роль пользователя.
 *
 * <RequireAuth role="psychologist">
 *   <PsyLayout />
 * </RequireAuth>
 */
export function RequireAuth({ children, role }) {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    // Не залогинен — отправляем на логин и запоминаем, откуда пришёл
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/auth/login"
                replace
                state={{ from: location.pathname + location.search }}
            />
        );
    }

    // Если ограничение по роли есть и оно не совпало — шлём на /forbidden
    if (role && user?.role !== role) {
        return <Navigate to="/forbidden" replace />;
    }

    // Всё норм — рендерим детей
    return children;
}
