import { createContext, useContext, useEffect, useState } from "react";
import {
  startRegisterRequest,
  confirmRegisterRequest,
  loginRequest,
  googleAuth,
} from "../../shared/api/auth";

const STORAGE_KEY = "psyuz_auth_user";
const TOKENS_KEY = "psyuz_auth_tokens";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const rawUser = localStorage.getItem(STORAGE_KEY);
      return rawUser ? JSON.parse(rawUser) : null;
    } catch (e) {
      console.error("Auth parse error", e);
      return null;
    }
  });
  const [tokens, setTokens] = useState(() => {
    try {
      const rawTokens = localStorage.getItem(TOKENS_KEY);
      return rawTokens ? JSON.parse(rawTokens) : null;
    } catch (e) {
      console.error("Auth parse error", e);
      return null;
    }
  });

  const saveAuth = ({ user, tokens }) => {
    setUser(user || null);
    setTokens(tokens || null);

    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);

      if (tokens) localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
      else localStorage.removeItem(TOKENS_KEY);
    } catch (e) {
      console.error("Auth save error", e);
    }
  };

  const login = async ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Введите email и пароль");
    }

    try {
      const data = await loginRequest({
        email,
        password,
      });

      const normalizedUser = {
        id: data?.uid || data?.id || email,
        fullName: data?.name || data?.full_name || "Пользователь",
        email: data?.email || email,
        username: data?.username || email,
        role: data?.role || "client",
        profile: data,
      };

      saveAuth({
        user: normalizedUser,
        tokens: null,
      });

      return data;
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      console.error("LOGIN RESPONSE:", error?.response);
      console.error("LOGIN DATA:", error?.response?.data);

      const responseData = error?.response?.data;

      const message =
        responseData?.detail ||
        responseData?.message ||
        responseData?.error ||
        responseData?.non_field_errors?.[0] ||
        responseData?.username?.[0] ||
        responseData?.password?.[0] ||
        `Ошибка входа (status: ${error?.response?.status || "unknown"})`;

      throw new Error(message);
    }
  };
  /**
   * register = старт регистрации
   * Отправляет данные на бэк, чтобы тот выдал/отправил verification code.
   */
  const register = async ({ fullName, email, password, passwordRepeat }) => {
    if (!fullName || !email || !password || !passwordRepeat) {
      throw new Error("Заполните все поля");
    }

    if (password !== passwordRepeat) {
      throw new Error("Пароли не совпадают");
    }

    try {
      const data = await startRegisterRequest({
        fullName,
        email,
        password,
      });

      return data;
    } catch (error) {
      console.error("REGISTER START ERROR:", error);
      console.error("REGISTER START RESPONSE:", error?.response);
      console.error("REGISTER START DATA:", error?.response?.data);

      const responseData = error?.response?.data;

      const message =
        responseData?.detail ||
        responseData?.message ||
        responseData?.error ||
        responseData?.non_field_errors?.[0] ||
        responseData?.code?.[0] ||
        responseData?.username?.[0] ||
        `Ошибка подтверждения (status: ${error?.response?.status || "unknown"})`;

      throw new Error(message);
    }
  };

  /**
   * confirmRegisterCode = подтверждение кода.
   * Только после него считаем регистрацию завершённой.
   */
  const confirmRegisterCode = async ({ email, code }) => {
    if (!email || !code) {
      throw new Error("Email и код обязательны");
    }

    try {
      const data = await confirmRegisterRequest({
        email,
        code,
      });

      return data;
    } catch (error) {
      console.error("REGISTER CONFIRM ERROR:", error);
      console.error("REGISTER CONFIRM RESPONSE:", error?.response);
      console.error("REGISTER CONFIRM DATA:", error?.response?.data);

      const responseData = error?.response?.data;

      const message =
        responseData?.detail ||
        responseData?.message ||
        responseData?.error ||
        responseData?.non_field_errors?.[0] ||
        responseData?.code?.[0] ||
        responseData?.email?.[0] ||
        `Ошибка подтверждения (status: ${error?.response?.status || "unknown"})`;

      throw new Error(message);
    }
  };

  const googleLogin = async (idToken) => {
    if (!idToken) {
      throw new Error("Google token не получен");
    }

    try {
      const data = await googleAuth(idToken);

      const access =
        data?.access ||
        data?.access_token ||
        data?.tokens?.access ||
        null;

      const refresh =
        data?.refresh ||
        data?.refresh_token ||
        data?.tokens?.refresh ||
        null;

      const backendUser =
        data?.user ||
        data?.profile ||
        data?.me ||
        null;

      const normalizedUser = backendUser
        ? {
          id: backendUser.id,
          fullName:
            backendUser.full_name ||
            backendUser.fullName ||
            backendUser.name ||
            "Пользователь",
          email: backendUser.email || "",
          role: backendUser.role || "client",
          profile: backendUser,
        }
        : {
          id: "google-" + Date.now(),
          fullName: "Пользователь",
          email: "",
          role: "client",
        };

      saveAuth({
        user: normalizedUser,
        tokens: access || refresh ? { access, refresh } : null,
      });

      return data;
    } catch (error) {
      const responseData = error?.response?.data;

      const message =
        responseData?.detail ||
        responseData?.message ||
        responseData?.non_field_errors?.[0] ||
        error?.message ||
        "Ошибка входа через Google";

      throw new Error(message);
    }
  };

  const logout = () => {
    saveAuth({ user: null, tokens: null });
  };

  const updateProfile = (profilePatch) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updated = {
        ...prev,
        profile: {
          ...(prev.profile || {}),
          ...profilePatch,
        },
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Auth save error", e);
      }

      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated: !!user,
        login,
        register,
        confirmRegisterCode,
        googleLogin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}