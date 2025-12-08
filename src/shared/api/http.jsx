// src/shared/http.jsx
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api", // это уйдёт в прокси
  timeout: 15000,
});

export async function fetchPsychologists() {
  // Итоговый URL на фронте:
  //   /api/ru/api/v1/yordam/psychologists
  // Итоговый URL на бэке (после rewrite):
  //   https://api.yordam.glob.uz/ru/api/v1/yordam/psychologists
  const res = await apiClient.get("/ru/api/v1/yordam/psychologists/");
  return res.data;
}
