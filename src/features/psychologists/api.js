// src/features/psychologists/api.js
import { api } from "../../shared/http";
import mockPsychologists from "./mockPsychologists";

// можно выключать/включать моки одной строчкой
const USE_MOCK = false;

function mapApiPsychologist(p) {
    return {
        id: p.id,
        name: p.full_name,
        age: p.age ?? null,
        experienceYears: p.experience_years,
        // массив строк для твоих чипов
        topics: (p.modalities || []).map(m => m.name),
        tags: (p.approaches || []).map(a => a.name),
        pricePerHour: p.prices?.[0]?.price ?? null,
        currency: "сум",
        verified: p.status === "published",
        // добавляешь что ещё нужно
    };
}

export async function getPsychologistsList(params = {}) {
    if (USE_MOCK) {
        // поведение как раньше
        return mockPsychologists;
    }

    const { data } = await api.get("/ru/api/v1/yordam/psychologists/", {
        params,
    });

    return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results.map(mapApiPsychologist),
    };
}

export async function getPsychologistById(id) {
    if (USE_MOCK) {
        const item = mockPsychologists.find(p => p.id === Number(id));
        if (!item) throw new Error("Not found in mock");
        return item;
    }

    const { data } = await api.get(`/ru/api/v1/yordam/psychologists/${id}/`);
    return mapApiPsychologist(data);
}
