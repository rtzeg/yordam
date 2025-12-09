// src/shared/api/api.js
import { api } from "./http";
import { getApiPrefix } from "../i18n/apiLang"; // вот это ты добавлял для /ru /uz /en

// посчитать возраст по дате рождения "1993-11-05"
function calcAge(dateStr) {
  if (!dateStr) return null;

  const dob = new Date(dateStr);
  if (Number.isNaN(dob.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

// выбрать основную цену из массива prices
function pickMainPrice(prices = []) {
  if (!Array.isArray(prices) || prices.length === 0) return null;

  const active = prices.filter((p) => p.is_active !== false);
  const list = active.length ? active : prices;

  list.sort((a, b) => {
    const ra = a.rank ?? 0;
    const rb = b.rank ?? 0;
    return ra - rb;
  });

  return list[0] || null;
}

export async function getPsychologistsFromApi() {
  const prefix = getApiPrefix(); // "/ru/api/v1" | "/uz/api/v1" | "/en/api/v1"

  const response = await api.get(`${prefix}/yordam/psychologists/`);
  const data = response.data;

  const list = Array.isArray(data) ? data : data.results || [];

  return list.map((item) => {
    const mainPrice = pickMainPrice(item.prices || []);
    const pricePerHour = mainPrice ? Number(mainPrice.amount) : null;

    const currencyMap = { UZS: "сум" };
    const currency =
      (mainPrice && currencyMap[mainPrice.currency]) ||
      mainPrice?.currency ||
      "сум";

    return {
      id: item.id,
      name: item.full_name,

      about: item.biography || "",
      dateOfBirth: item.date_of_birth || null,
      age: calcAge(item.date_of_birth),

      experienceYears: item.experience_years ?? 0,

      therapyType: item.modalities?.[0]?.name || null,
      approach: item.approaches?.[0]?.name || null,

      topics: [],
      tags: [],

      pricePerHour,
      currency,
      priceLabel: pricePerHour != null ? `${currency}/час` : null,

      verified: item.status === "published",

      photoUrl:
        item.picture?.medium ||
        item.picture?.large ||
        item.picture?.thumbnail ||
        null,

      education: (item.educations || []).map((e) => ({
        id: e.id,
        institution: e.institution,
        degree: e.degree,
        startYear: e.start_year,
        endYear: e.end_year,
        years:
          e.start_year && e.end_year
            ? `${e.start_year} — ${e.end_year}`
            : null,
        documentUrl: e.document || null,
      })),

      certificates: (item.certificates || []).map((c) => ({
        id: c.id,
        name: c.name,
        issuer: c.issuer,
        issueDate: c.issue_date,
        expiryDate: c.expiry_date,
        documentUrl: c.document || null,
      })),
    };
  });
}

export const getPsychologistsList = getPsychologistsFromApi;
