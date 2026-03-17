import { useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";

function resolvePictureUrl(picture) {
  if (!picture) return "";

  if (typeof picture === "string") {
    return picture;
  }

  if (typeof picture === "object") {
    return (
      picture.large ||
      picture.medium ||
      picture.original ||
      picture.small ||
      picture.thumbnail ||
      ""
    );
  }

  return "";
}

export function ClientSettingsPage() {
  const { user, saveProfileSettings, changePassword } = useAuth();
  const { t } = useTranslation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyPush, setNotifyPush] = useState(false);

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarError, setAvatarError] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) {
      setFullName("");
      setEmail("");
      setDateOfBirth("");
      setGender("");
      setAvatarPreview("");
      setAvatarFile(null);
      localStorage.removeItem("testroma");
      return;
    }

    const profile = user?.profile || {};

    const resolvedFullName =
      profile?.name ||
      profile?.full_name ||
      user?.fullName ||
      user?.name ||
      "";

    const resolvedEmail =
      profile?.email ||
      user?.email ||
      profile?.username ||
      user?.username ||
      "";

    const rawDate =
      profile?.date_of_birth ||
      profile?.dateOfBirth ||
      user?.date_of_birth ||
      "";

    const resolvedDate =
      typeof rawDate === "string" && rawDate.includes("T")
        ? rawDate.split("T")[0]
        : rawDate || "";

    const rawGender = profile?.gender || user?.gender || "";

    const resolvedGender =
      rawGender === "male" || rawGender === "Male"
        ? "M"
        : rawGender === "female" || rawGender === "Female"
          ? "F"
          : rawGender || "";

    const resolvedPicture = resolvePictureUrl(
      profile?.picture || profile?.avatar || user?.picture || ""
    );

    setFullName(resolvedFullName);
    setEmail(resolvedEmail);
    setDateOfBirth(resolvedDate);
    setGender(resolvedGender);
    setAvatarPreview(resolvedPicture);
    setAvatarFile(null);

    const testRomaPayload = {
      id: user?.id || null,
      fullName: user?.fullName || profile?.name || null,
      email: user?.email || profile?.email || null,
      username: user?.username || profile?.username || null,
      role: user?.role || null,
      name: profile?.name || null,
      date_of_birth: profile?.date_of_birth || null,
      gender: profile?.gender || null,
      picture: profile?.picture || null,
      rawUser: user,
    };

    localStorage.setItem("testroma", JSON.stringify(testRomaPayload, null, 2));
  }, [user]);

  useEffect(() => {
    return () => {
      if (
        typeof avatarPreview === "string" &&
        avatarPreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handlePasswordFieldChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setPasswordError("");
    setPasswordSuccess(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError(
        t("clientSettingsPage.password.errors.fillAll", "Заполните все поля")
      );
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        t(
          "clientSettingsPage.password.errors.tooShort",
          "Новый пароль должен быть не короче 8 символов"
        )
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        t(
          "clientSettingsPage.password.errors.mismatch",
          "Новые пароли не совпадают"
        )
      );
      return;
    }

    try {
      setPasswordLoading(true);

      await changePassword({
        oldPassword: currentPassword,
        newPassword,
      });

      setPasswordSuccess(true);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("PASSWORD CHANGE ERROR:", err);
      setPasswordError(
        err?.message ||
        t(
          "clientSettingsPage.password.errors.default",
          "Ошибка смены пароля"
        )
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    setProfileError("");
    setProfileSuccess(false);

    try {
      setProfileLoading(true);

      await saveProfileSettings({
        name: fullName,
        dateOfBirth,
        gender,
        pictureFile: avatarFile,
      });

      setProfileSuccess(true);
      setAvatarFile(null);
    } catch (err) {
      console.error("PROFILE SAVE ERROR:", err);
      console.error("PROFILE SAVE RESPONSE:", err?.response);
      console.error("PROFILE SAVE DATA:", err?.response?.data);

      const responseData = err?.response?.data;

      const message =
        responseData?.detail ||
        responseData?.message ||
        responseData?.error ||
        responseData?.picture?.[0] ||
        responseData?.name?.[0] ||
        responseData?.date_of_birth?.[0] ||
        responseData?.gender?.[0] ||
        err?.message ||
        t(
          "clientSettingsPage.saveProfileError",
          "Не удалось сохранить профиль"
        );

      setProfileError(message);
    } finally {
      setProfileLoading(false);
    }
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

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setAvatarError(
        t(
          "clientSettingsPage.avatar.errorType",
          "Разрешены только JPG, PNG и WEBP"
        )
      );
      return;
    }

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setAvatarError(
        t("clientSettingsPage.avatar.errorSize", {
          max: maxSizeMB,
          defaultValue: `Файл не должен быть больше ${maxSizeMB} МБ`,
        })
      );
      return;
    }

    setAvatarFile(file);

    if (
      typeof avatarPreview === "string" &&
      avatarPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(avatarPreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  return (
    <div className="rounded-3xl bg-white px-8 py-8 shadow-[0_24px_60px_rgba(2,45,98,0.08)]">
      <h2 className="mb-1 text-2xl font-display text-[#071A34]">
        {t("clientSettingsPage.title", "Настройки аккаунта")}
      </h2>

      <p className="mb-8 text-sm text-[#6F7A89]">
        {t(
          "clientSettingsPage.subtitle",
          "Здесь вы можете обновить фото профиля, имя и настроить уведомления."
        )}
      </p>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex w-full max-w-[260px] flex-col items-center lg:items-start">
          <div className="mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-[#F3F7FF] text-sm text-[#9BA6B5]">
            {typeof avatarPreview === "string" && avatarPreview ? (
              <img
                src={avatarPreview}
                alt={t("clientSettingsPage.avatar.noPhoto", "Нет фото")}
                className="h-full w-full object-cover"
              />
            ) : (
              t("clientSettingsPage.avatar.noPhoto", "Нет фото")
            )}
          </div>

          <button
            type="button"
            onClick={handleAvatarButtonClick}
            className="rounded-full border border-[#D6DEE9] px-4 py-2 text-[13px] font-medium text-[#071A34] hover:border-[#1F98FA]"
          >
            {t("clientSettingsPage.avatar.changePhoto", "Изменить фото")}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleAvatarChange}
          />

          <p className="mt-2 text-[11px] text-[#9BA6B5]">
            {t(
              "clientSettingsPage.avatar.uploadHint",
              "Фото загружается как файл через multipart/form-data."
            )}
          </p>

          {avatarFile && (
            <p className="mt-1 text-[11px] text-[#6F7A89]">
              {avatarFile.name}
            </p>
          )}

          {avatarError && (
            <p className="mt-1 text-[11px] text-[#FF4D3D]">{avatarError}</p>
          )}
        </div>

        <div className="flex-1">
          <form
            onSubmit={handleProfileSubmit}
            className="space-y-6 md:max-w-[520px]"
          >
            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#071A34]">
                {t("clientSettingsPage.profile.sectionTitle", "Личные данные")}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                    {t(
                      "clientSettingsPage.profile.fullNameLabel",
                      "Имя и фамилия"
                    )}
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
                    {t("clientSettingsPage.profile.emailLabel", "Email")}
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    className="w-full cursor-not-allowed rounded-2xl border border-[#E1E7F0] bg-[#F7FAFF] px-4 py-3 text-sm text-[#071A34] opacity-80"
                  />

                  <p className="mt-1 text-[11px] text-[#9BA6B5]">
                    {t(
                      "clientSettingsPage.profile.emailHint",
                      "Email используется для входа и уведомлений. Смена почты будет доступна позже."
                    )}
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                    {t(
                      "clientSettingsPage.profile.birthDateLabel",
                      "Дата рождения"
                    )}
                  </label>

                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full rounded-2xl border border-[#E1E7F0] bg-[#F7FAFF] px-4 py-3 text-sm text-[#071A34] outline-none focus:border-[#1F98FA]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                    {t("clientSettingsPage.profile.genderLabel", "Пол")}
                  </label>

                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full rounded-2xl border border-[#E1E7F0] bg-[#F7FAFF] px-4 py-3 text-sm text-[#071A34] outline-none focus:border-[#1F98FA]"
                  >
                    <option value="">
                      {t(
                        "clientSettingsPage.profile.genderPlaceholder",
                        "Выберите пол"
                      )}
                    </option>
                    <option value="M">
                      {t("clientSettingsPage.profile.genderMale", "Мужской")}
                    </option>
                    <option value="F">
                      {t("clientSettingsPage.profile.genderFemale", "Женский")}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-[#071A34]">
                {t(
                  "clientSettingsPage.notifications.sectionTitle",
                  "Уведомления"
                )}
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
                    {t(
                      "clientSettingsPage.notifications.emailLabel",
                      "Получать письма о новых сессиях и напоминаниях"
                    )}
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
                    {t(
                      "clientSettingsPage.notifications.pushLabel",
                      "Пуш-уведомления о предстоящих встречах"
                    )}
                  </span>
                </label>
              </div>
            </div>

            {profileError && (
              <p className="text-[11px] text-[#FF4D3D]">{profileError}</p>
            )}

            {profileSuccess && (
              <p className="text-[11px] text-[#16A34A]">
                {t(
                  "clientSettingsPage.saveProfileSuccess",
                  "Изменения профиля сохранены"
                )}
              </p>
            )}

            <button
              type="submit"
              disabled={profileLoading}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#1F98FA] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_14px_30px_rgba(31,152,250,0.55)] transition hover:bg-[#0f84e2] disabled:opacity-60"
            >
              {profileLoading
                ? t("clientSettingsPage.saveProfileLoading", "Сохранение...")
                : t(
                  "clientSettingsPage.saveProfileButton",
                  "Сохранить изменения"
                )}
            </button>
          </form>

          <div className="my-8 h-px w-full bg-[#EDF1F7]" />

          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-4 md:max-w-[420px]"
          >
            <h3 className="text-sm font-semibold text-[#071A34]">
              {t("clientSettingsPage.password.sectionTitle", "Смена пароля")}
            </h3>

            <p className="text-[11px] text-[#6F7A89]">
              {t(
                "clientSettingsPage.password.description",
                "Укажите текущий пароль и придумайте новый. После сохранения вам нужно будет входить с новым паролем."
              )}
            </p>

            <div>
              <label className="mb-1 block text-xs font-medium text-[#6F7A89]">
                {t(
                  "clientSettingsPage.password.currentLabel",
                  "Текущий пароль"
                )}
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
                  {t("clientSettingsPage.password.newLabel", "Новый пароль")}
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
                  {t(
                    "clientSettingsPage.password.confirmLabel",
                    "Повторите новый пароль"
                  )}
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
                {t(
                  "clientSettingsPage.password.success",
                  "Пароль успешно обновлён"
                )}
              </p>
            )}

            <button
              type="submit"
              disabled={passwordLoading}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-[#071A34] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#0b254d] disabled:opacity-60"
            >
              {passwordLoading
                ? t("clientSettingsPage.password.loading", "Обновление...")
                : t(
                  "clientSettingsPage.password.submitButton",
                  "Обновить пароль"
                )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientSettingsPage;