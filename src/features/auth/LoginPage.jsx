import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "./AuthContext";
import { MainLayout } from "../../components/layout/MainLayout";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    return "/client";
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
      setError(err?.message || t("auth.login.errors.default"));
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
              {t("auth.login.title")}
            </h1>
            <p className="mt-1 text-[13px] text-[#6D7685]">
              {t("auth.login.subtitle")}
            </p>

            {error && (
              <div className="mb-4 mt-4 rounded-xl bg-[#FFECEC] px-3 py-2 text-[13px] text-[#D12C2C]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.login.fields.email.label")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t("auth.login.fields.email.placeholder")}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.login.fields.password.label")}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t("auth.login.fields.password.placeholder")}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] transition hover:bg-[#0f84e2] disabled:opacity-60"
              >
                {loading
                  ? t("auth.login.buttons.submitLoading")
                  : t("auth.login.buttons.submit")}
              </button>
            </form>

            <div className="mt-5 text-center text-[12px] text-[#6D7685]">
              {t("auth.login.noAccount.prefix")}{" "}
              <Link
                to="/auth/register"
                className="text-[#1F98FA] hover:underline"
              >
                {t("auth.login.noAccount.link")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default LoginPage;