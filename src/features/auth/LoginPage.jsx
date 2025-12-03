import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "../../components/layout/MainLayout";
import { useAuth } from "./AuthContext";

export function LoginPage() {
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password, role });
      if (from) navigate(from, { replace: true });
      else if (role === "psychologist") navigate("/psy", { replace: true });
      else navigate("/psychologists", { replace: true });
    } catch (e) {
      setError(e.message || "Ошибка входа");
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto flex max-w-md flex-1 items-center py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-3xl bg-white p-6 shadow-sm"
        >
          <h1 className="text-lg font-semibold text-sky-950">
            Вход в аккаунт
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Выберите роль и введите данные.
          </p>

          <div className="mt-4 flex gap-2 rounded-2xl bg-sky-50 p-1 text-xs">
            <button
              type="button"
              onClick={() => setRole("client")}
              className={`flex-1 rounded-xl px-3 py-2 font-semibold ${
                role === "client"
                  ? "bg-white text-sky-800 shadow-sm"
                  : "text-sky-700"
              }`}
            >
              Я клиент
            </button>
            <button
              type="button"
              onClick={() => setRole("psychologist")}
              className={`flex-1 rounded-xl px-3 py-2 font-semibold ${
                role === "psychologist"
                  ? "bg-white text-sky-800 shadow-sm"
                  : "text-sky-700"
              }`}
            >
              Я психолог
            </button>
          </div>

          <label className="mt-4 block text-xs font-medium text-slate-600">
            Email
            <input
              type="email"
              required
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-sky-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="mt-3 block text-xs font-medium text-slate-600">
            Пароль
            <input
              type="password"
              required
              className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-sky-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && (
            <p className="mt-2 text-[11px] text-rose-600">{error}</p>
          )}

          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-sky-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-600"
          >
            Войти
          </button>

          <p className="mt-3 text-center text-[11px] text-slate-500">
            Нет аккаунта?{" "}
            <Link
              to="/auth/register"
              className="font-semibold text-sky-700 hover:underline"
            >
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </MainLayout>
  );
}
