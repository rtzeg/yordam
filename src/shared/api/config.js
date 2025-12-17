export const API_BASE = import.meta.env.VITE_API_BASE || "/api";

// аккуратно склеиваем, чтобы не было // в середине
export function apiUrl(path) {
  const base = API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
