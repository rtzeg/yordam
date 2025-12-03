// src/features/psychologists/components/PsychologistCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, HelpCircle, Heart } from "lucide-react";

export function PsychologistCard({ psychologist }) {
  const [isFav, setIsFav] = useState(false);

  if (!psychologist) return null;

  const {
    id,
    name,
    age,
    experienceYears,
    pricePerHour,
    price,
    verified,
    tags,
    approach,
    therapyType,
  } = psychologist;

  // Цена
  const priceValue =
    typeof price === "number"
      ? price
      : typeof pricePerHour === "number"
      ? pricePerHour
      : null;

  const formattedPrice = priceValue
    ? priceValue.toLocaleString("ru-RU")
    : "По запросу";

  // Плашки-направления
  const pills =
    (Array.isArray(tags) && tags.length
      ? tags
      : [therapyType, approach].filter(Boolean)
    ).slice(0, 5);

  const initials = name?.trim()?.[0]?.toUpperCase() || "П";

  const experienceText = experienceYears
    ? `Опыт ${experienceYears} ${
        experienceYears === 1 ? "год" : experienceYears < 5 ? "года" : "лет"
      }`
    : null;

  const ageText = age ? `${age} лет` : null;

  const subline =
    ageText && experienceText
      ? `${ageText} • ${experienceText}`
      : ageText || experienceText || "";

  return (
    <div className="relative flex h-[320px] w-[306px] flex-col rounded-[24px] bg-white px-5 pt-5 pb-4 shadow-[0_18px_38px_rgba(67,142,229,0.12)]">
      {/* Кнопка избранного (локальное состояние) */}
      <button
        type="button"
        onClick={() => setIsFav((v) => !v)}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_rgba(67,142,229,0.20)]"
      >
        <Heart
          className={`h-5 w-5 ${
            isFav ? "fill-[#FF4D6A] text-[#FF4D6A]" : "text-[#1F98FA]"
          }`}
        />
      </button>

      {/* Верхняя часть: аватар-заглушка + текст */}
      <div className="flex gap-3">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-[#1F98FA] text-[32px] font-semibold text-white">
          {initials}
        </div>

        <div className="flex-1">
          {verified && (
            <div className="flex items-center gap-1 text-[11px] text-[#6F7A89]">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#1F98FA]" />
              <span>Проверен Yordam</span>
            </div>
          )}

          <div className="mt-1 text-[16px] font-semibold leading-snug text-[#071A34]">
            {name || "Психолог"}
          </div>

          {subline && (
            <div className="mt-1 text-[12px] text-[#6F7A89]">{subline}</div>
          )}

          <div className="mt-1 flex items-center gap-1 text-[11px] text-[#9BA6B5]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Соответствует вашему запросу</span>
          </div>
        </div>
      </div>

      {/* Теги / направления */}
      {pills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full bg-[#F2F4F8] px-4 py-1 text-[12px] text-[#071A34]"
            >
              {pill}
            </span>
          ))}
        </div>
      )}

      {/* Низ: кнопка + цена */}
      <div className="mt-auto flex items-center justify-between pt-4">
        <Link
          to={`/psychologists/${id}`}
          className="rounded-full bg-[#1F98FA] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(31,152,250,0.45)] transition-colors hover:bg-[#0f84e2]"
        >
          Подробнее
        </Link>

        <div className="text-right leading-tight">
          <div className="text-[18px] font-bold text-[#1F98FA]">
            {formattedPrice}
          </div>
          <div className="mt-1 text-[11px] text-[#6F7A89]">
            {priceValue ? "сум/час" : "без отзывов"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PsychologistCard;
