// src/shared/seo/useSeo.js
import { useEffect } from "react";

const DEFAULT_TITLE = "365psy";
const DEFAULT_DESCRIPTION =
  "365psy — сервис подбора психолога онлайн: каталог специалистов, подходы, опыт и цены. Запишитесь на консультацию и начните лучше себя понимать.";

function upsertMetaByName(name, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLinkRel(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function normalizeDescription(text) {
  const t = (text || "").toString().trim().replace(/\s+/g, " ");
  if (!t) return DEFAULT_DESCRIPTION;
  // держим около 160 символов
  return t.length > 160 ? t.slice(0, 157).trimEnd() + "…" : t;
}

export function useSeo({
  description,
  canonicalUrl,
  lang,
  robots = "index,follow",
  ogType = "website",
} = {}) {
  useEffect(() => {
    // ✅ title всегда фиксированный
    document.title = DEFAULT_TITLE;

    if (lang) {
      document.documentElement.setAttribute("lang", lang);
    }

    const finalDescription = normalizeDescription(description);

    upsertMetaByName("description", finalDescription);
    upsertMetaByName("robots", robots);

    // canonical
    upsertLinkRel("canonical", canonicalUrl);

    // OpenGraph
    upsertMetaByProperty("og:title", DEFAULT_TITLE);
    upsertMetaByProperty("og:description", finalDescription);
    upsertMetaByProperty("og:type", ogType);
    upsertMetaByProperty("og:url", canonicalUrl);
  }, [description, canonicalUrl, lang, robots, ogType]);
}
