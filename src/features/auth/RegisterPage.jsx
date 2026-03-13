import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loadGoogleScript } from "../../shared/lib/google";
import { useAuth } from "./AuthContext";
import { MainLayout } from "../../components/layout/MainLayout";

const PENDING_REGISTRATION_KEY = "yordam_pending_registration";
const VERIFICATION_TIMER_SECONDS = 60;

export function RegisterPage() {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    return "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !password || !passwordRepeat) {
      setError("Заполните все поля");
      return;
    }

    if (password !== passwordRepeat) {
      setError(t("auth.register.errors.passwordMismatch"));
      return;
    }

    try {
      setLoading(true);

      const result = await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        passwordRepeat,
      });

      console.log("REGISTER START RESPONSE:", result);

      sessionStorage.setItem(
        PENDING_REGISTRATION_KEY,
        JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
          redirectTo: resolveRedirectPath(),
          timerStartedAt: Date.now(),
          timerSeconds: VERIFICATION_TIMER_SECONDS,
        })
      );

      navigate("/auth/register/confirm", { replace: true });
    } catch (err) {
      console.error("REGISTER PAGE ERROR:", err);
      setError(err?.message || t("auth.register.errors.default"));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError("");

      const google = await loadGoogleScript();
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      if (!clientId) {
        throw new Error("Не задан VITE_GOOGLE_CLIENT_ID");
      }

      google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          try {
            if (!response?.credential) {
              throw new Error("Google credential не получен");
            }

            await googleLogin(response.credential);
            navigate(resolveRedirectPath(), { replace: true });
          } catch (err) {
            console.error(err);
            setError(err?.message || "Ошибка входа через Google");
          } finally {
            setLoading(false);
          }
        },
      });

      google.accounts.id.prompt((notification) => {
        const notDisplayed = notification?.isNotDisplayed?.();
        const skipped = notification?.isSkippedMoment?.();
        const dismissed = notification?.isDismissedMoment?.();

        if (notDisplayed || skipped || dismissed) {
          setLoading(false);
        }
      });
    } catch (err) {
      console.error(err);
      setError(err?.message || "Не удалось запустить Google авторизацию");
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <main className="bg-skySoft min-h-[calc(100vh-80px)]">
        <div className="mx-auto flex max-w-[1200px] justify-center px-4 py-10 lg:px-[72px] lg:py-16">
          <div className="w-full max-w-[520px] rounded-[32px] bg-white p-6 shadow-[0_18px_52px_rgba(67,142,229,0.18)] lg:p-8">
            <h1 className="text-[22px] font-bold text-[#071A34] lg:text-[24px]">
              {t("auth.register.title")}
            </h1>
            <p className="mt-1 text-[13px] text-[#6D7685]">
              {t("auth.register.subtitle")}
            </p>

            {error && (
              <div className="mb-4 rounded-xl bg-[#FFECEC] px-3 py-2 text-[13px] text-[#D12C2C]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.register.fields.fullName.label")}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t("auth.register.fields.fullName.placeholder")}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.register.fields.email.label")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t("auth.register.fields.email.placeholder")}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.register.fields.password.label")}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t("auth.register.fields.password.placeholder")}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.register.fields.passwordRepeat.label")}
                </label>
                <input
                  type="password"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t("auth.register.fields.passwordRepeat.placeholder")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] transition hover:bg-[#0f84e2] disabled:opacity-60"
              >
                {loading
                  ? t("auth.register.buttons.submitLoading")
                  : t("auth.register.buttons.submit")}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E1E8F0]" />
              <span className="text-[11px] text-[#9BA6B5]">
                {t("auth.register.or")}
              </span>
              <div className="h-px flex-1 bg-[#E1E8F0]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D7E0ED] bg-white px-6 py-2.5 text-[13px] font-medium text-[#071A34] transition hover:border-[#1F98FA] hover:bg-[#F5F8FF] disabled:opacity-60"
            >
              <span>{t("auth.register.google")}</span>
            </button>

            <div className="mt-5 text-center text-[12px] text-[#6D7685]">
              {t("auth.register.alreadyHave.prefix")}{" "}
              <Link
                to="/auth/login"
                className="text-[#1F98FA] hover:underline"
              >
                {t("auth.register.alreadyHave.link")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default RegisterPage;