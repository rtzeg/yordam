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
  return `/${lang}/api/v1`;
}
