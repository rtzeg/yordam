// src/shared/api/api.js
import { api } from "./http";

// Базовая функция
export async function getPsychologistsFromApi() {
    const response = await api.get("/ru/api/v1/yordam/psychologists/");
    const data = response.data;

    // бэкенд отдаёт либо { results: [...] }, либо просто массив
    const list = Array.isArray(data) ? data : data.results || [];

    return list.map((item) => {
        const mainPrice = item.prices?.[0] || null;

        const pricePerHour = mainPrice ? Number(mainPrice.amount) : null;

        const currencyMap = { UZS: "сум" };
        const currency =
            (mainPrice && currencyMap[mainPrice.currency]) ||
            mainPrice?.currency ||
            "сум";

        return {
            id: item.id,
            name: item.full_name,
            // возраста нет → пусть пока будет null
            age: null,
            experienceYears: item.experience_years ?? 0,

            therapyType: item.modalities?.[0]?.name || null,
            approach: item.approaches?.[0]?.name || null,

            // потом сюда можно подкинуть реальные поля из API
            topics: [],
            tags: [],

            pricePerHour,
            currency,
            priceLabel: `${currency}/час`,

            verified: item.status === "published",

            // мини-фото для списка
            photoUrl:
                item.picture?.thumbnail ||
                item.picture?.small ||
                item.picture?.medium ||
                null,
        };
    });
}

// Алиас, чтобы PsychologistsListPage мог импортировать по своему названию
export const getPsychologistsList = getPsychologistsFromApi;
