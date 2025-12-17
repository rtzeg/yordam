import axios from "axios";

// Публичный префикс, который будет в браузере: /api/...
// В dev Vite проксирует /api -> target, в prod это должен уметь твой nginx/гейтвей.
const API_BASE_RAW = import.meta.env.VITE_API_BASE || "/api";

// убираем лишний слэш на конце, чтобы не было /api//ru/...
const API_BASE = API_BASE_RAW.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
