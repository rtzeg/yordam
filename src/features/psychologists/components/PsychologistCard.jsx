// src/features/psychologists/components/PsychologistCard.jsx

import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../../favorites/FavoritesContext";

function getYearsLabel(years = 0) {
  if (years % 10 === 1 && years % 100 !== 11) return `${years} год`;
  if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) {
    return `${years} года`;
  }
  return `${years} лет`;
}

export function PsychologistCard({ psychologist }) {
  const {
    id,
    name,
    age,
    experienceYears,
    therapyType,
    approach,
    topics = [],       // например: ["Тревога", "Отношения"]
    tags = [],         // например: ["Гештальт", "Индивидуально"]
    pricePerHour,      // 💰 вот отсюда берём цену
    currency = "сум",
    priceLabel = "сум/час",
    verified,
  } = psychologist;

  const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.includes(id);

  const initials = name
    ?.trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // приводим цену к числу на всякий случай
  const numericPrice =
    typeof pricePerHour === "number"
      ? pricePerHour
      : pricePerHour
      ? Number(String(pricePerHour).replace(/\s/g, ""))
      : null;

  return (
    <article className="flex h-full w-full max-w-[360px] flex-col rounded-[32px] bg-white px-6 py-6 shadow-[0_18px_38px_rgba(67,142,229,0.16)]">
      {/* ШАПКА */}
      <header className="mb-4 flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F98FA] text-[20px] font-semibold text-white">
          {initials || "П"}
        </div>

        <div className="flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-[11px] text-[#9BA6B5]">
                {verified && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#1F98FA]" />
                )}
                {verified ? "Проверен Yordam" : "Специалист Yordam"}
              </p>
              <h3 className="mt-1 truncate text-[16px] font-semibold text-[#071A34]">
                {name}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite(id)}
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-[#1F98FA] transition
                ${
                  isFavorite
                    ? "border-[#1F98FA] bg-[#E8F4FF]"
                    : "border-[#D6DEE9] bg-white hover:bg-[#F5F7FA]"
                }`}
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-[#1F98FA] text-[#1F98FA]" : ""
                }`}
              />
            </button>
          </div>

          <p className="text-[12px] text-[#6F7A89]">
            {age ? `${age} лет` : "Возраст не указан"} •{" "}
            {experienceYears
              ? `Опыт ${getYearsLabel(experienceYears)}`
              : "Опыт не указан"}
          </p>
        </div>
      </header>

      {/* ТЕЛО КАРТОЧКИ */}
      <div className="mb-4 space-y-2 text-[11px] text-[#6F7A89]">
        {/* Формат / подход */}
        <div className="flex flex-wrap gap-2">
          {therapyType && (
            <span className="rounded-full bg-[#F3F7FF] px-3 py-1 text-[11px] text-[#071A34]">
              {therapyType}
            </span>
          )}
          {approach && (
            <span className="rounded-full bg-[#F3F7FF] px-3 py-1 text-[11px] text-[#071A34]">
              {approach}
            </span>
          )}
        </div>

        {/* Темы / запросы */}
        {(topics.length > 0 || tags.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {[...topics, ...tags].slice(0, 6).map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#F5F7FA] px-3 py-1 text-[11px] text-[#4B5563]"
              >
                {item}
              </span>
            ))}
            {topics.length + tags.length > 6 && (
              <span className="px-2 text-[11px] text-[#9BA6B5]">
                + ещё {topics.length + tags.length - 6}
              </span>
            )}
          </div>
        )}
      </div>

      {/* НИЗ КАРТОЧКИ */}
      <div className="mt-auto flex items-end justify-between pt-4">
        <Link
          to={`/psychologists/${id}`}
          className="inline-flex items-center justify-center rounded-full bg-[#1F98FA] px-6 py-2.5 text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(31,152,250,0.45)] hover:bg-[#0f84e2] transition"
        >
          Подробнее
        </Link>

        <div className="text-right">
          {numericPrice !== null && !Number.isNaN(numericPrice) && (
            <div className="text-[16px] font-semibold text-[#071A34]">
              {numericPrice.toLocaleString("ru-RU")} {currency}
            </div>
          )}
          <div className="text-[11px] text-[#9BA6B5]">{priceLabel}</div>
        </div>
      </div>
    </article>
  );
}

export default PsychologistCard;
