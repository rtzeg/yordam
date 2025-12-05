// src/features/profile/ClientSettingsPage.jsx

import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export function ClientSettingsPage() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyPush, setNotifyPush] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePasswordFieldChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordError("");
    setPasswordSuccess(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Заполните все поля для смены пароля.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Новый пароль должен быть не короче 8 символов.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Пароли не совпадают.");
      return;
    }

    // TODO: здесь потом дергаешь бекенд для смены пароля
    // await api.changePassword({ currentPassword, newPassword });

    console.log("Payload для смены пароля:", { currentPassword, newPassword });

    setPasswordSuccess(true);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // TODO: тут запрос на обновление профиля (имя, уведомления, аватар и т.д.)
    console.log("Сохранение профиля", {
      fullName,
      email,
      notifyEmail,
      notifyPush,
    });
  };

  return (
    <div className="rounded-3xl bg-white px-8 py-8 shadow-[0_24px_60px_rgba(2,45,98,0.08)]">
      <h2 className="mb-1 text-2xl font-display text-[#071A34]">
        Настройки аккаунта
      </h2>
      <p className="mb-8 text-sm text-[#6F7A89]">
        Здесь вы можете обновить фото профиля, имя и настроить уведомления.
      </p>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Аватар слева */}
        <div className="flex w-full max-w-[260px] flex-col items-center lg:items-start">
          <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-[#F3F7FF] text-sm text-[#9BA6B5]">
            Нет фото
          </div>

          <button
            type="button"
            className="rounded-full border border-[#D6DEE9] px-4 py-2 text-[13px] font-medium text-[#071A34] hover:border-[#1F98FA]"
          >
            Изменить фото
          </button>

          <p className="mt-2 text-[11px] text-[#9BA6B5]">
            JPG, PNG до 5 МБ. Картинка будет обрезана по кругу.
          </p>
        </div>

        {/* Основная форма настроек */}
        <div className="flex-1">
          <form
            onSubmit={handleProfileSubmit}
            className="space-y-6 md:max-w-[520px]"
          >
            {/* Личные данные */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#071A34]">
                Личные данные
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                    Имя и фамилия
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border border-[#E1E7F0] bg-[#F7FAFF] px-4 py-3 text-sm text-[#071A34] outline-none focus:border-[#1F98FA]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    className="w-full cursor-not-allowed rounded-2xl border border-[#E1E7F0] bg-[#F7FAFF] px-4 py-3 text-sm text-[#071A34] opacity-80"
                  />
                  <p className="mt-1 text-[11px] text-[#9BA6B5]">
                    Email используется для входа и уведомлений. Смена почты
                    будет доступна позже.
                  </p>
                </div>
              </div>
            </div>

            {/* Уведомления */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#071A34]">
                Уведомления
              </h3>

              <div className="space-y-2 text-sm text-[#071A34]">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#1F98FA]"
                    checked={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.checked)}
                  />
                  <span>Получать письма о новых сессиях и напоминаниях</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#1F98FA]"
                    checked={notifyPush}
                    onChange={(e) => setNotifyPush(e.target.checked)}
                  />
                  <span>Пуш-уведомления о предстоящих встречах</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#1F98FA] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_14px_30px_rgba(31,152,250,0.55)] hover:bg-[#0f84e2] transition"
            >
              Сохранить изменения
            </button>
          </form>

          {/* Разделитель */}
          <div className="my-8 h-px w-full bg-[#EDF1F7]" />

          {/* Смена пароля */}
          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-4 md:max-w-[420px]"
          >
            <h3 className="text-sm font-semibold text-[#071A34]">
              Смена пароля
            </h3>
            <p className="text-[11px] text-[#6F7A89]">
              Укажите текущий пароль и придумайте новый. После сохранения
              вам нужно будет входить с новым паролем.
            </p>

            <div>
              <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                Текущий пароль
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordFieldChange}
                className="w-full rounded-2xl border border-[#E1E7F0] bg-[#F7FAFF] px-4 py-3 text-sm text-[#071A34] outline-none focus:border-[#1F98FA]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                  Новый пароль
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordFieldChange}
                  className="w-full rounded-2xl border border-[#E1E7F0] bg-[#F7FAFF] px-4 py-3 text-sm text-[#071A34] outline-none focus:border-[#1F98FA]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                  Повторите новый пароль
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordFieldChange}
                  className="w-full rounded-2xl border border-[#E1E7F0] bg-[#F7FAFF] px-4 py-3 text-sm text-[#071A34] outline-none focus:border-[#1F98FA]"
                />
              </div>
            </div>

            {passwordError && (
              <p className="text-[11px] text-[#FF4D3D]">{passwordError}</p>
            )}
            {passwordSuccess && (
              <p className="text-[11px] text-[#16A34A]">
                Пароль обновлён (пока только на фронте). Подключи бекенд для
                реальной смены.
              </p>
            )}

            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center rounded-full bg-[#071A34] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#0b254d] transition"
            >
              Обновить пароль
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientSettingsPage;
