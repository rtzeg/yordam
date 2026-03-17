import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/layout/MainLayout";
import { useAuth } from "../auth/AuthContext";

export function ChangePasswordPage() {
  const { t } = useTranslation();
  const { changePassword } = useAuth();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError(
        t("changePassword.errors.fillAll", "Заполните все поля")
      );
      return;
    }

    if (form.newPassword.length < 8) {
      setError(
        t(
          "changePassword.errors.tooShort",
          "Новый пароль должен быть не короче 8 символов"
        )
      );
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError(
        t(
          "changePassword.errors.mismatch",
          "Новые пароли не совпадают"
        )
      );
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        oldPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setSuccess(true);
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("CHANGE PASSWORD PAGE ERROR:", err);
      setError(
        err?.message ||
          t("changePassword.errors.default", "Не удалось изменить пароль")
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
              {t("changePassword.title", "Изменение пароля")}
            </h1>

            <p className="mt-1 text-[13px] text-[#6D7685]">
              {t(
                "changePassword.subtitle",
                "Введите текущий пароль и задайте новый"
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
                  "changePassword.success",
                  "Пароль успешно обновлён"
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("changePassword.fields.currentPassword", "Текущий пароль")}
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("changePassword.fields.newPassword", "Новый пароль")}
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  {t("changePassword.fields.confirmPassword", "Повторите новый пароль")}
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] transition hover:bg-[#0f84e2] disabled:opacity-60"
              >
                {loading
                  ? t("changePassword.buttons.loading", "Сохранение...")
                  : t("changePassword.buttons.submit", "Обновить пароль")}
              </button>
            </form>

            <div className="mt-5 text-center text-[12px] text-[#6D7685]">
              <Link
                to="/profile/settings"
                className="text-[#1F98FA] hover:underline"
              >
                {t("changePassword.backToSettings", "Назад в настройки")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default ChangePasswordPage;