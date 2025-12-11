import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "psyuz_auth_user";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      console.error("Auth parse error", e);
    }
  }, []);

  const saveUser = (u) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Auth save error", e);
    }
  };

  const login = async ({ email, password, role }) => {
    if (!email || !password) throw new Error("Введите email и пароль");

    const fakeUser = {
      id: "local-" + Date.now(),
      fullName: email.split("@")[0] || "Пользователь",
      email,
      role, 
      // profile можно будет потом дополнить настройками
    };

    saveUser(fakeUser);
  };

  const register = async ({ fullName, email, password, role }) => {
    if (!fullName || !email || !password) {
      throw new Error("Заполните все поля");
    }

    const fakeUser = {
      id: "local-" + Date.now(),
      fullName,
      email,
      role,
    };

    saveUser(fakeUser);
  };

  const logout = () => saveUser(null);

  // 🔥 НОВОЕ: обновление профиля пользователя (анкета из личного кабинета)
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

      // сразу сохраняем в localStorage
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
        isAuthenticated: !!user,
        login,
        register,
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
