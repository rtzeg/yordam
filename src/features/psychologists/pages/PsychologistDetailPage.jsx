// src/features/psychologists/pages/PsychologistDetailPage.jsx

import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import psychologistsMock from "../mockPsychologists";
import { MainLayout } from "../../../components/layout/MainLayout";
import { CheckCircle2, Heart, HelpCircle } from "lucide-react";

export function PsychologistDetailPage() {
  const { id } = useParams();
  const [isFav, setIsFav] = useState(false);

  const psychologist = psychologistsMock.find(
    (p) => String(p.id) === String(id)
  );

  if (!psychologist) {
    return (
      <MainLayout>
        <div className="w-full px-4 py-10 lg:px-12 xl:px-[72px]">
          <div className="mb-4 text-sm text-slate-500">
            Специалист не найден.
          </div>
          <Link
            to="/psychologists"
            className="rounded-full border border-[#1F98FA] px-6 py-2 text-sm text-[#1F98FA] hover:bg-[#ECF7FF]"
          >
            Вернуться к списку специалистов
          </Link>
        </div>
      </MainLayout>
    );
  }

  const {
    name,
    age,
    experienceYears,
    pricePerHour,
    verified,
    tags,
    approach,
    therapyType,
  } = psychologist;

  const initials = name?.trim()?.[0]?.toUpperCase() || "П";

  const experienceText = experienceYears
    ? `Опыт ${experienceYears} ${experienceYears === 1 ? "год" : experienceYears < 5 ? "года" : "лет"
    }`
    : null;

  const ageText = age ? `${age} лет` : null;

  const topLine =
    ageText && experienceText
      ? `${ageText} • ${experienceText}`
      : ageText || experienceText || "";

  const priceText = pricePerHour
    ? `${pricePerHour.toLocaleString("ru-RU")} сум/час`
    : "По запросу";

  const pills =
    (Array.isArray(tags) && tags.length
      ? tags
      : [therapyType, approach].filter(Boolean)
    ).slice(0, 5);

  return (
    <MainLayout>
      <div className="w-full px-4 py-10 lg:px-12 xl:px-[72px]">
        {/* Хлебные крошки */}
        <div className="mb-3 flex items-center gap-1 text-[13px] text-[#9BA6B5]">
          <Link to="/" className="hover:text-[#1F98FA]">
            Главная страница
          </Link>
          <span>›</span>
          <Link
            to="/psychologists"
            className="hover:text-[#1F98FA] text-[#071A34]"
          >
            Выбор специалиста
          </Link>
          <span>›</span>
          <span className="text-[#071A34]">{name}</span>
        </div>

        {/* Заголовок страницы */}
        <h1 className="mb-6 font-display text-[32px] font-bold text-[#1F98FA] md:text-[40px]">
          Страница специалиста
        </h1>

        {/* Основной белый блок */}
        <div className="rounded-[32px] bg-white px-6 pt-6 pb-10 shadow-[0_24px_60px_rgba(67,142,229,0.25)] lg:px-10 lg:pt-8">
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Левая колонка: аватар + кнопки */}
            <div className="flex w-full max-w-[320px] flex-col items-center">
              <div className="flex h-[300px] w-full items-center justify-center rounded-[32px] bg-[#F5F8FF]">
                <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full bg-[#1F98FA] text-[64px] font-semibold text-white">
                  {initials}
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-full bg-[#1F98FA] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_14px_28px_rgba(31,152,250,0.55)] hover:bg-[#0f84e2]"
              >
                Забронировать время
              </button>

              <button
                type="button"
                onClick={() => setIsFav((v) => !v)}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-[14px] ${isFav
                    ? "border-[#FF4D6A] text-[#FF4D6A]"
                    : "border-[#1F98FA] text-[#1F98FA]"
                  } bg-white`}
              >
                <Heart
                  className={`h-4 w-4 ${isFav ? "fill-[#FF4D6A]" : "fill-transparent"
                    }`}
                />
                <span>{isFav ? "В избранном" : "Добавить в избранное"}</span>
              </button>
            </div>

            {/* Правая колонка: информация */}
            <div className="flex-1">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  {verified && (
                    <div className="mb-1 flex items-center gap-1 text-[12px] text-[#6F7A89]">
                      <CheckCircle2 className="h-4 w-4 text-[#1F98FA]" />
                      <span>Проверен Yordam</span>
                    </div>
                  )}
                  <div className="text-[22px] font-semibold text-[#071A34] md:text-[24px]">
                    {name}
                  </div>
                  {topLine && (
                    <div className="mt-1 text-[13px] text-[#6F7A89]">
                      {topLine}
                    </div>
                  )}
                  <div className="mt-2 flex items-center gap-1 text-[12px] text-[#9BA6B5]">
                    <HelpCircle className="h-4 w-4" />
                    <span>Соответствует вашему запросу</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[18px] font-bold text-[#1F98FA] md:text-[20px]">
                    {priceText}
                  </div>
                  <div className="mt-1 text-[12px] text-[#6F7A89]">
                    {pricePerHour ? "Стоимость сессии" : "Стоимость по запросу"}
                  </div>
                </div>
              </div>

              {pills.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
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

              {/* Примеры блоков "Образование" / "Сертификаты" / "Обо мне" ты сможешь добить сам по тому же принципу */}
              <section className="mb-8">
                <h3 className="mb-3 text-[14px] font-semibold text-[#071A34]">
                  Образование
                </h3>
                <div className="grid gap-4 md:grid-cols-2 text-[13px] text-[#4A5568]">
                  <div>
                    <p>ФГБОУ ВО Амурская ГМА • 2019</p>
                    <p>Лечебное дело, очная форма</p>
                    <button className="mt-1 text-[12px] text-[#1F98FA] underline underline-offset-4">
                      Ссылка на документ →
                    </button>
                  </div>
                  <div>
                    <p>АНО ДПО “ПК Профи” • 2019</p>
                    <p>Психиатрия, очная форма</p>
                    <button className="mt-1 text-[12px] text-[#1F98FA] underline underline-offset-4">
                      Ссылка на документ →
                    </button>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-[14px] font-semibold text-[#071A34]">
                  Сертификаты
                </h3>
                <div className="grid gap-4 md:grid-cols-2 text-[13px] text-[#4A5568]">
                  <div>
                    <p>ФГБОУ ВО Амурская ГМА • 2019</p>
                    <p>Психотерапия</p>
                    <button className="mt-1 text-[12px] text-[#1F98FA] underline underline-offset-4">
                      Ссылка на документ →
                    </button>
                  </div>
                  <div>
                    <p>АНО ДПО “ПК Профи” • 2019</p>
                    <p>Когнитивно-поведенческая терапия</p>
                    <button className="mt-1 text-[12px] text-[#1F98FA] underline underline-offset-4">
                      Ссылка на документ →
                    </button>
                  </div>
                </div>
              </section>
              <section className="mt-16">
                <h2 className="mb-6 text-[28px] font-display text-[#071A34]">
                  Отзывы
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <article
                      key={i}
                      className="rounded-[24px] bg-white p-6 shadow-[0_18px_50px_rgba(67,142,229,0.18)]"
                    >
                      <div className="mb-2 text-[#FFC94A] text-[18px] leading-none">
                        ★★★★★
                      </div>
                      <p className="mb-4 text-[13px] text-[#4A5568]">
                        “Очень помог(ла) разобраться в себе, стало спокойнее и
                        понятнее, что делать дальше. Чувствую поддержку и
                        прогресс после сессий.”
                      </p>
                      <div className="mt-4 text-[13px] font-medium text-[#071A34]">
                        Клиент {i}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default PsychologistDetailPage;
