import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../../components/layout/MainLayout";
import { useAuth } from "../auth/AuthContext";

export function DeleteAccountPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { deleteAccountRequest, deleteAccountConfirm } = useAuth();

  const [step, setStep] = useState("request");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [confirmForm, setConfirmForm] = useState({
    code: "",
    password: "",
  });

  const handleRequestDelete = async () => {
    setError("");
    setSuccessMessage("");

    try {
      setLoading(true);

      await deleteAccountRequest({});

      setStep("confirm");
      setSuccessMessage(
        t(
          "deleteAccount.requestSuccess",
          "Код подтверждения отправлен. Введите его ниже."
        )
      );
    } catch (err) {
      console.error("DELETE ACCOUNT REQUEST PAGE ERROR:", err);
      setError(
        err?.message ||
          t(
            "deleteAccount.requestError",
            "Не удалось запросить удаление аккаунта"
          )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmChange = (e) => {
    const { name, value } = e.target;
    setConfirmForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!confirmForm.code.trim()) {
      setError(
        t("deleteAccount.errors.codeRequired", "Введите код подтверждения")
      );
      return;
    }

    try {
      setLoading(true);

      await deleteAccountConfirm({
        code: confirmForm.code.trim(),
        password: confirmForm.password,
      });

      setSuccessMessage(
        t(
          "deleteAccount.confirmSuccess",
          "Аккаунт удалён"
        )
      );

      setTimeout(() => {
        navigate("/auth/login", { replace: true });
      }, 1200);
    } catch (err) {
      console.error("DELETE ACCOUNT CONFIRM PAGE ERROR:", err);
      setError(
        err?.message ||
          t(
            "deleteAccount.confirmError",
            "Не удалось подтвердить удаление аккаунта"
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
          <div className="w-full max-w-[560px] rounded-[32px] bg-white p-6 shadow-[0_18px_52px_rgba(67,142,229,0.18)] lg:p-8">
            <h1 className="text-[22px] font-bold text-[#071A34] lg:text-[24px]">
              {t("deleteAccount.title", "Удаление аккаунта")}
            </h1>

            <p className="mt-1 text-[13px] text-[#6D7685]">
              {t(
                "deleteAccount.subtitle",
                "Это действие необратимо. Сначала запросите удаление, затем подтвердите его кодом."
              )}
            </p>

            <div className="mt-4 rounded-2xl border border-[#FEE4E2] bg-[#FFF5F4] px-4 py-3 text-[13px] text-[#B42318]">
              {t(
                "deleteAccount.warning",
                "После удаления аккаунта доступ к профилю, данным и истории может быть потерян без возможности восстановления."
              )}
            </div>

            {error && (
              <div className="mb-4 mt-4 rounded-xl bg-[#FFECEC] px-3 py-2 text-[13px] text-[#D12C2C]">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 mt-4 rounded-xl bg-[#ECFFF1] px-3 py-2 text-[13px] text-[#1C8C4C]">
                {successMessage}
              </div>
            )}

            {step === "request" && (
              <div className="mt-6 space-y-4">
                <button
                  type="button"
                  onClick={handleRequestDelete}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#F04438] bg-[#F04438] px-6 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#D92D20] disabled:opacity-60"
                >
                  {loading
                    ? t("deleteAccount.requestLoading", "Отправка...")
                    : t("deleteAccount.requestButton", "Запросить удаление аккаунта")}
                </button>
              </div>
            )}

            {step === "confirm" && (
              <form onSubmit={handleConfirmDelete} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                    {t("deleteAccount.fields.code", "Код подтверждения")}
                  </label>

                  <input
                    type="text"
                    name="code"
                    value={confirmForm.code}
                    onChange={handleConfirmChange}
                    required
                    className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#F04438] focus:bg-white"
                    placeholder={t(
                      "deleteAccount.fields.codePlaceholder",
                      "Введите код"
                    )}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                    {t("deleteAccount.fields.password", "Пароль")}
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={confirmForm.password}
                    onChange={handleConfirmChange}
                    className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#F04438] focus:bg-white"
                    placeholder={t(
                      "deleteAccount.fields.passwordPlaceholder",
                      "Введите пароль, если требуется"
                    )}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#F04438] bg-[#F04438] px-6 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#D92D20] disabled:opacity-60"
                >
                  {loading
                    ? t("deleteAccount.confirmLoading", "Удаление...")
                    : t("deleteAccount.confirmButton", "Подтвердить удаление")}
                </button>
              </form>
            )}

            <div className="mt-5 flex flex-col gap-2 text-center text-[12px] text-[#6D7685]">
              {step === "confirm" && (
                <button
                  type="button"
                  onClick={() => {
                    setStep("request");
                    setError("");
                    setSuccessMessage("");
                  }}
                  className="text-[#1F98FA] hover:underline"
                >
                  {t("deleteAccount.backToRequest", "Вернуться назад")}
                </button>
              )}

              <Link
                to="/profile/settings"
                className="text-[#1F98FA] hover:underline"
              >
                {t("deleteAccount.backToSettings", "Назад в настройки")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default DeleteAccountPage;