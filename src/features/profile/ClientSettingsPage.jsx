// src/features/profile/ClientSettingsPage.jsx

import { useState, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";

export function ClientSettingsPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

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

  // Аватар
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const fileInputRef = useRef(null);

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
      setPasswordError(
        t("clientSettingsPage.password.errors.fillAll")
      );
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        t("clientSettingsPage.password.errors.tooShort")
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        t("clientSettingsPage.password.errors.mismatch")
      );
      return;
    }

    // TODO: запрос на смену пароля
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

    console.log("Сохранение профиля", {
      fullName,
      email,
      notifyEmail,
      notifyPush,
      avatarFile,
    });
  };

  const handleAvatarButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    setAvatarError("");

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setAvatarError(
        t("clientSettingsPage.avatar.errorType")
      );
      return;
    }

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setAvatarError(
        t("clientSettingsPage.avatar.errorSize", { max: maxSizeMB })
      );
      return;
    }

    setAvatarFile(file);
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  return (
    <div className="rounded-3xl bg-white px-8 py-8 shadow-[0_24px_60px_rgba(2,45,98,0.08)]">
      <h2 className="mb-1 text-2xl font-display text-[#071A34]">
        {t("clientSettingsPage.title")}
      </h2>
      <p className="mb-8 text-sm text-[#6F7A89]">
        {t("clientSettingsPage.subtitle")}
      </p>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Аватар слева */}
        <div className="flex w-full max-w-[260px] flex-col items-center lg:items-start">
          <div className="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-[#F3F7FF] text-sm text-[#9BA6B5]">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt={t("clientSettingsPage.avatar.noPhoto")}
                className="h-full w-full object-cover"
              />
            ) : (
              t("clientSettingsPage.avatar.noPhoto")
            )}
          </div>

          <button
            type="button"
            onClick={handleAvatarButtonClick}
            className="rounded-full border border-[#D6DEE9] px-4 py-2 text-[13px] font-medium text-[#071A34] hover:border-[#1F98FA]"
          >
            {t("clientSettingsPage.avatar.changePhoto")}
          </button>

          {/* Скрытый инпут файла */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleAvatarChange}
          />

          <p className="mt-2 text-[11px] text-[#9BA6B5]">
            {t("clientSettingsPage.avatar.hint")}
          </p>

          {avatarError && (
            <p className="mt-1 text-[11px] text-[#FF4D3D]">
              {avatarError}
            </p>
          )}
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
                {t("clientSettingsPage.profile.sectionTitle")}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                    {t("clientSettingsPage.profile.fullNameLabel")}
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
                    {t("clientSettingsPage.profile.emailLabel")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    className="w-full cursor-not-allowed rounded-2xl border border-[#E1E7F0] bg-[#F7FAFF] px-4 py-3 text-sm text-[#071A34] opacity-80"
                  />
                  <p className="mt-1 text-[11px] text-[#9BA6B5]">
                    {t("clientSettingsPage.profile.emailHint")}
                  </p>
                </div>
              </div>
            </div>

            {/* Уведомления */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#071A34]">
                {t("clientSettingsPage.notifications.sectionTitle")}
              </h3>

              <div className="space-y-2 text-sm text-[#071A34]">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#1F98FA]"
                    checked={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.checked)}
                  />
                  <span>
                    {t("clientSettingsPage.notifications.emailLabel")}
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#1F98FA]"
                    checked={notifyPush}
                    onChange={(e) => setNotifyPush(e.target.checked)}
                  />
                  <span>
                    {t("clientSettingsPage.notifications.pushLabel")}
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#1F98FA] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_14px_30px_rgba(31,152,250,0.55)] hover:bg-[#0f84e2] transition"
            >
              {t("clientSettingsPage.saveProfileButton")}
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
              {t("clientSettingsPage.password.sectionTitle")}
            </h3>
            <p className="text-[11px] text-[#6F7A89]">
              {t("clientSettingsPage.password.description")}
            </p>

            <div>
              <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                {t("clientSettingsPage.password.currentLabel")}
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
                  {t("clientSettingsPage.password.newLabel")}
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
                  {t("clientSettingsPage.password.confirmLabel")}
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
              <p className="text-[11px] text-[#FF4D3D]">
                {passwordError}
              </p>
            )}
            {passwordSuccess && (
              <p className="text-[11px] text-[#16A34A]">
                {t("clientSettingsPage.password.success")}
              </p>
            )}

            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center rounded-full bg-[#071A34] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#0b254d] transition"
            >
              {t("clientSettingsPage.password.submitButton")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientSettingsPage;
