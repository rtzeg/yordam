import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/layout/MainLayout";
import { requestPasswordReset } from "../../shared/api/auth";

export function ForgotPasswordPage() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      setLoading(true);

      await requestPasswordReset({
        email: email.trim(),
      });

      setSuccess(true);
    } catch (err) {
      console.error("FORGOT PASSWORD ERROR:", err);
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          t(
            "auth.forgotPassword.errors.default",
            "Не удалось отправить код восстановления"
          )
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
              {t("auth.forgotPassword.title", "Восстановление пароля")}
            </h1>

            <p className="mt-1 text-[13px] text-[#6D7685]">
              {t(
                "auth.forgotPassword.subtitle",
                "Введите email, и мы отправим код для смены пароля"
              )}
            </p>

            {error && (
              <div className="mb-4 mt-4 rounded-xl bg-[#FFECEC] px-3 py-2 text-[13px] text-[#D12C2C]">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 mt-4 rounded-xl bg-[#ECFFF1] px-3 py-2 text-[13px] text-[#1C8C4C]">
                {t(
                  "auth.forgotPassword.success",
                  "Код отправлен. Теперь введите его на следующей странице."
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.forgotPassword.fields.email.label", "Email")}
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t(
                    "auth.forgotPassword.fields.email.placeholder",
                    "Введите email"
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] transition hover:bg-[#0f84e2] disabled:opacity-60"
              >
                {loading
                  ? t("auth.forgotPassword.buttons.submitLoading", "Отправка...")
                  : t("auth.forgotPassword.buttons.submit", "Отправить код")}
              </button>
            </form>

            <div className="mt-5 flex flex-col gap-2 text-center text-[12px] text-[#6D7685]">
              <Link
                to="/auth/reset-password-confirm"
                className="text-[#1F98FA] hover:underline"
              >
                {t(
                  "auth.forgotPassword.toConfirm",
                  "У меня уже есть код восстановления"
                )}
              </Link>

              <Link
                to="/auth/login"
                className="text-[#1F98FA] hover:underline"
              >
                {t("auth.forgotPassword.backToLogin", "Назад ко входу")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default ForgotPasswordPage;