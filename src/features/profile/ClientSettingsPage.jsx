// src/features/profile/ClientSettingsPage.jsx
import { useState } from "react";
// если в AuthContext есть user — можно его использовать
import { useAuth } from "../auth/AuthContext";

export function ClientSettingsPage() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email] = useState(user?.email || "");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.profile?.avatarUrl || ""
  );
  const [avatarFile, setAvatarFile] = useState(null);

  const [isNotificationsEmail, setIsNotificationsEmail] = useState(true);
  const [isNotificationsPush, setIsNotificationsPush] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus(null);

    try {
      // тут потом вставишь реальный запрос на бэкенд / updateProfile
      console.log("Сохраняем настройки:", {
        fullName,
        avatarFile,
        isNotificationsEmail,
        isNotificationsPush,
      });

      await new Promise((res) => setTimeout(res, 600)); // просто имитация

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white px-6 py-6 shadow-[0_24px_60px_rgba(2,45,98,0.08)] md:px-8 md:py-8">
      <h2 className="mb-4 text-2xl font-display text-[#071A34]">
        Настройки аккаунта
      </h2>
      <p className="mb-6 text-sm text-slate-600">
        Здесь вы можете обновить фото профиля, имя и настроить уведомления.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 md:grid-cols-[260px,1fr]"
      >
        {/* Левая колонка: аватар */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative h-32 w-32 overflow-hidden rounded-full bg-[#E5F2FF]">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Аватар"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-[#6D7685]">
                Нет фото
              </div>
            )}
          </div>

          <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-full border border-[#C7D2E2] px-4 py-2 text-xs font-medium text-[#071A34] hover:border-[#1F98FA] hover:text-[#1F98FA]">
            <span>Изменить фото</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>

          <p className="mt-2 text-[11px] text-slate-400">
            JPG, PNG до 5 МБ. Картинка будет обрезана по кругу.
          </p>
        </div>

        {/* Правая колонка: данные + уведомления */}
        <div className="space-y-8">
          {/* Основные данные */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#9BA6B5]">
              Личные данные
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#071A34]">
                  Имя и фамилия
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Как к вам обращаться"
                  className="w-full rounded-2xl border border-[#D4DFEE] px-4 py-2.5 text-sm text-[#071A34] outline-none focus:border-[#1F98FA] focus:ring-1 focus:ring-[#1F98FA]/40"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[#071A34]">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full rounded-2xl border border-[#E1E7F2] bg-slate-50 px-4 py-2.5 text-sm text-[#6D7685] outline-none"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  Email используется для входа и уведомлений. Смена почты будет
                  доступна позже.
                </p>
              </div>
            </div>
          </div>

          {/* Уведомления */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#9BA6B5]">
              Уведомления
            </h3>

            <div className="space-y-3 text-sm text-[#071A34]">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#C7D2E2] text-[#1F98FA] focus:ring-[#1F98FA]"
                  checked={isNotificationsEmail}
                  onChange={(e) => setIsNotificationsEmail(e.target.checked)}
                />
                <span>Получать письма о новых сессиях и напоминаниях</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#C7D2E2] text-[#1F98FA] focus:ring-[#1F98FA]"
                  checked={isNotificationsPush}
                  onChange={(e) => setIsNotificationsPush(e.target.checked)}
                />
                <span>Пуш-уведомления о предстоящих встречах</span>
              </label>
            </div>
          </div>

          {/* Кнопка + статус */}
          <div className="flex flex-col gap-3 border-t border-[#E7EDF5] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center rounded-full bg-[#1F98FA] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.55)] hover:bg-[#0f84e2] disabled:cursor-not-allowed disabled:bg-[#9ACBFB]"
            >
              {isSaving ? "Сохранение..." : "Сохранить изменения"}
            </button>

            {status === "success" && (
              <span className="text-xs text-emerald-600">
                Изменения сохранены.
              </span>
            )}
            {status === "error" && (
              <span className="text-xs text-red-500">
                Не удалось сохранить. Попробуйте ещё раз.
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ClientSettingsPage;
