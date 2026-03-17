import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/layout/MainLayout";
import { confirmPasswordReset } from "../../shared/api/auth";

export function ResetPasswordConfirmPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError(
        t(
          "auth.resetPassword.errors.tooShort",
          "Новый пароль должен быть не короче 8 символов"
        )
      );
      return;
    }

    if (newPassword !== repeatPassword) {
      setError(
        t(
          "auth.resetPassword.errors.mismatch",
          "Пароли не совпадают"
        )
      );
      return;
    }

    try {
      setLoading(true);

      await confirmPasswordReset({
        email: email.trim(),
        code: code.trim(),
        newPassword,
      });

      navigate("/auth/login", {
        replace: true,
        state: { resetSuccess: true },
      });
    } catch (err) {
      console.error("RESET PASSWORD CONFIRM ERROR:", err);
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          t(
            "auth.resetPassword.errors.default",
            "Не удалось сменить пароль"
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
              {t("auth.resetPassword.title", "Смена пароля")}
            </h1>

            <p className="mt-1 text-[13px] text-[#6D7685]">
              {t(
                "auth.resetPassword.subtitle",
                "Введите email, код восстановления и новый пароль"
              )}
            </p>

            {error && (
              <div className="mb-4 mt-4 rounded-xl bg-[#FFECEC] px-3 py-2 text-[13px] text-[#D12C2C]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.resetPassword.fields.email.label", "Email")}
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t(
                    "auth.resetPassword.fields.email.placeholder",
                    "Введите email"
                  )}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.resetPassword.fields.code.label", "Код")}
                </label>

                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t(
                    "auth.resetPassword.fields.code.placeholder",
                    "Введите код из письма"
                  )}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("auth.resetPassword.fields.newPassword.label", "Новый пароль")}
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t(
                    "auth.resetPassword.fields.newPassword.placeholder",
                    "Введите новый пароль"
                  )}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t(
                    "auth.resetPassword.fields.repeatPassword.label",
                    "Повторите пароль"
                  )}
                </label>

                <input
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  placeholder={t(
                    "auth.resetPassword.fields.repeatPassword.placeholder",
                    "Повторите новый пароль"
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] transition hover:bg-[#0f84e2] disabled:opacity-60"
              >
                {loading
                  ? t("auth.resetPassword.buttons.submitLoading", "Сохранение...")
                  : t("auth.resetPassword.buttons.submit", "Сменить пароль")}
              </button>
            </form>

            <div className="mt-5 text-center text-[12px] text-[#6D7685]">
              <Link
                to="/auth/login"
                className="text-[#1F98FA] hover:underline"
              >
                {t("auth.resetPassword.backToLogin", "Назад ко входу")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default ResetPasswordConfirmPage;