import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./AuthContext";
import { MainLayout } from "../../components/layout/MainLayout";

const GOOGLE_SCRIPT_ID = "google-identity-services";

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.196 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 16.108 19.002 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.348 4.337-17.694 10.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.144 35.091 26.677 36 24 36c-5.176 0-9.624-3.331-11.29-7.946l-6.522 5.025C9.5 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.793 2.237-2.231 4.166-4.084 5.565l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

export function LoginPage() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const resolveRedirectPath = () => {
    if (
      location.state?.from?.pathname &&
      location.state.from.pathname !== "/auth/login"
    ) {
      return location.state.from.pathname;
    }

    if (
      typeof location.state?.from === "string" &&
      location.state.from !== "/auth/login"
    ) {
      return location.state.from;
    }

    return "/client";
  };

  useEffect(() => {
    if (!googleClientId) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not set");
      return;
    }

    const initGoogle = () => {
      if (!window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (response) => {
          try {
            setError("");
            setGoogleLoading(true);

            await googleLogin(response.credential);
            navigate(resolveRedirectPath(), { replace: true });
          } catch (err) {
            console.error("GOOGLE LOGIN ERROR:", err);
            setError(
              err?.message ||
                t("auth.login.errors.googleDefault", "Ошибка входа через Google")
            );
          } finally {
            setGoogleLoading(false);
          }
        },
      });
    };

    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);

    if (existingScript) {
      initGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = GOOGLE_SCRIPT_ID;
    script.onload = initGoogle;

    document.body.appendChild(script);
  }, [googleClientId, googleLogin, navigate]);

  const handleGoogleCustomLogin = () => {
    setError("");

    if (!googleClientId) {
      setError("Google Client ID не настроен");
      return;
    }

    if (!window.google?.accounts?.id) {
      setError("Google Auth ещё не инициализирован");
      return;
    }

    try {
      window.google.accounts.id.prompt();
    } catch (err) {
      console.error("GOOGLE PROMPT ERROR:", err);
      setError(
        t("auth.login.errors.googleDefault", "Ошибка входа через Google")
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const result = await login({
        email: email.trim(),
        password,
      });

      console.log("LOGIN RESPONSE:", result);

      navigate(resolveRedirectPath(), { replace: true });
    } catch (err) {
      console.error("LOGIN PAGE ERROR:", err);
      setError(
        err?.message ||
          t("auth.login.errors.default", "Ошибка входа. Попробуйте снова.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <main className="bg-skySoft min-h-[calc(100vh-80px)]">
        <div className="mx-auto flex max-w-[1200px] justify-center px-4 py-10 lg:px-[72px] lg:py-16">
          <div className="w-full max-w-[520px] rounded-[32px] bg-white p-6 shadow-[0_18px_52px_rgba(67,142,229,0.18)] lg:p-8">
            <h1 className="text-[22px] font-bold text-[#071A34] lg:text-[24px]">
              {t("auth.login.title", "Вход")}
            </h1>

            <p className="mt-1 text-[13px] text-[#6D7685]">
              {t("auth.login.subtitle", "Войдите в свой аккаунт")}
            </p>

            {error && (
              <div className="mb-4 mt-4 rounded-xl bg-[#FFECEC] px-3 py-2 text-[13px] text-[#D12C2C]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.login.fields.email.label", "Email")}
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t(
                    "auth.login.fields.email.placeholder",
                    "Введите email"
                  )}
                />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <label className="block text-[12px] font-semibold text-[#071A34]">
                    {t("auth.login.fields.password.label", "Пароль")}
                  </label>

                  <Link
                    to="/auth/forgot-password"
                    className="text-[12px] text-[#1F98FA] hover:underline"
                  >
                    {t("auth.login.forgotPassword", "Забыли пароль?")}
                  </Link>
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t(
                    "auth.login.fields.password.placeholder",
                    "Введите пароль"
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] transition hover:bg-[#0f84e2] disabled:opacity-60"
              >
                {loading
                  ? t("auth.login.buttons.submitLoading", "Вход...")
                  : t("auth.login.buttons.submit", "Войти")}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E3EAF3]" />
              <span className="text-[12px] text-[#8A94A6]">
                {t("auth.login.or", "или")}
              </span>
              <div className="h-px flex-1 bg-[#E3EAF3]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleCustomLogin}
              disabled={googleLoading}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#D7E0ED] bg-white px-6 py-2.5 text-[13px] font-semibold text-[#071A34] transition hover:border-[#1F98FA] hover:bg-[#F8FBFF] disabled:opacity-60"
            >
              <GoogleIcon />
              <span>
                {googleLoading
                  ? t("auth.login.google.loading", "Подключение Google...")
                  : t("auth.login.google.button", "Вход через Google аккаунт")}
              </span>
            </button>

            <div className="mt-5 text-center text-[12px] text-[#6D7685]">
              {t("auth.login.noAccount.prefix", "Нет аккаунта?")}{" "}
              <Link
                to="/auth/register"
                className="text-[#1F98FA] hover:underline"
              >
                {t("auth.login.noAccount.link", "Зарегистрироваться")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default LoginPage;