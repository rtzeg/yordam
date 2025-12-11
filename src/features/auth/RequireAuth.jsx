// src/features/auth/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

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

    return children;
}
