// src/shared/i18n/apiLang.js
import i18n from "./index";

export function getBaseLang() {
  const lng = i18n.language || "ru";

  if (lng.startsWith("uz")) return "uz";
  if (lng.startsWith("en")) return "en";
  if (lng.startsWith("ru")) return "ru";

  return "ru";
}

export function getApiPrefix() {
  const lang = getBaseLang();
  // /ru/api/v1  /uz/api/v1  /en/api/v1
  return `/${lang}/api/v1`;
}
