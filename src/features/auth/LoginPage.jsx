// src/features/auth/LoginPage.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";
import { MainLayout } from "../../components/layout/MainLayout";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const role = "client";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await login({
        role,
        email,
        password,
      });

      const from =
        location.state?.from?.pathname &&
          location.state.from.pathname !== "/auth/login"
          ? location.state.from.pathname
          : "/";

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err?.message || "Не удалось войти. Проверьте данные и попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    // сюда потом прилетит реальная ссылка / SDK от бэкенда
    // пример: window.location.href = "/api/auth/google";
    console.log("Google login clicked");
  };

  return (
    <MainLayout>
      <main className="bg-skySoft min-h-[calc(100vh-80px)]">
        <div className="mx-auto flex max-w-[1200px] justify-center px-4 py-10 lg:px-[72px] lg:py-16">
          <div className="w-full max-w-[420px] rounded-[32px] bg-white p-6 shadow-[0_18px_52px_rgba(67,142,229,0.18)] lg:p-8">
            <h1 className="text-[22px] font-bold text-[#071A34] lg:text-[24px]">
              Вход в аккаунт
            </h1>
            <p className="mt-1 text-[13px] text-[#6D7685]">
              Введите email и пароль, чтобы продолжить.
            </p>

            {/* Плашка “Я клиент сервиса” вместо переключателя ролей */}

            {error && (
              <div className="mb-4 rounded-xl bg-[#FFECEC] px-3 py-2 text-[13px] text-[#D12C2C]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  Пароль
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder="Ваш пароль"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] hover:bg-[#0f84e2] transition disabled:opacity-60"
              >
                {loading ? "Входим..." : "Войти"}
              </button>
            </form>

            {/* Разделитель */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E1E8F0]" />
              <span className="text-[11px] text-[#9BA6B5]">или</span>
              <div className="h-px flex-1 bg-[#E1E8F0]" />
            </div>

            {/* Google-кнопка */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D7E0ED] bg-white px-6 py-2.5 text-[13px] font-medium text-[#071A34] hover:border-[#1F98FA] hover:bg-[#F5F8FF] transition"
            >
              <span>Продолжить через Google</span>
            </button>

            <div className="mt-5 text-center text-[12px] text-[#6D7685]">
              Еще нет аккаунта?{" "}
              <Link to="/auth/register" className="text-[#1F98FA] hover:underline">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
