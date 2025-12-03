// src/features/psychologists/pages/PsychologistDetailPage.jsx
import { Link, useParams } from "react-router-dom";
import { Heart } from "lucide-react";

import { MainLayout } from "../../../components/layout/MainLayout";
import { mockPsychologists } from "../mockPsychologists";
import { useFavorites } from "../../favorites/FavoritesContext";

export function PsychologistDetailPage() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const psychologist = mockPsychologists.find(
    (p) => String(p.id) === String(id)
  );

  if (!psychologist) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-[1296px] px-4 lg:px-0 py-10">
          <p className="text-sm text-slate-500">Специалист не найден.</p>
        </div>
      </MainLayout>
    );
  }

  const fav = isFavorite(psychologist.id);
  const initials =
    psychologist.fullName?.trim()?.[0]?.toUpperCase() || "П";

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1296px] px-4 lg:px-0 py-10">
        {/* Хлебные крошки */}
        <div className="mb-6 text-[13px] text-[#8A94A6]">
          <Link
            to="/"
            className="hover:text-[#1F98FA] transition-colors"
          >
            Главная страница
          </Link>
          <span className="mx-1">›</span>
          <Link
            to="/psychologists"
            className="hover:text-[#1F98FA] transition-colors"
          >
            Выбор специалиста
          </Link>
          <span className="mx-1">›</span>
          <span className="text-[#071A34]">{psychologist.fullName}</span>
        </div>

        {/* Заголовок страницы */}
        <h1 className="mb-8 text-[40px] leading-tight font-display text-[#1F98FA]">
          Страница специалиста
        </h1>

        {/* Основной блок: аватар + инфа */}
        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Левая колонка – фото + кнопки */}
          <div className="rounded-[32px] bg-white shadow-[0_28px_80px_rgba(67,142,229,0.25)] p-8 flex flex-col items-center">
            {/* Фото / заглушка */}
            <div className="mb-8 flex h-[240px] w-[240px] items-center justify-center rounded-full bg-[#EEF4FB] overflow-hidden">
              {psychologist.avatar ? (
                <img
                  src={psychologist.avatar}
                  alt={psychologist.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-[88px] font-semibold text-[#1F98FA]">
                  {initials}
                </span>
              )}
            </div>

            {/* Кнопка бронирования */}
            <button className="mb-4 flex h-[56px] w-full items-center justify-center rounded-full bg-[#1F98FA] text-[15px] font-semibold text-white shadow-[0_16px_40px_rgba(31,152,250,0.6)] hover:bg-[#0f84e2] transition-colors">
              Забронировать время
            </button>

            {/* Кнопка избранного */}
            <button
              type="button"
              onClick={() => toggleFavorite(psychologist.id)}
              className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-full border text-[15px] transition-colors ${fav
                  ? "border-[#1F98FA] bg-[#E8F3FF] text-[#1F98FA]"
                  : "border-[#C7D2E2] bg-white text-[#071A34] hover:border-[#1F98FA]"
                }`}
            >
              <Heart
                className={`h-4 w-4 ${fav ? "fill-[#1F98FA] text-[#1F98FA]" : "text-[#1F98FA]"
                  }`}
              />
              <span>{fav ? "В избранном" : "Добавить в избранное"}</span>
            </button>
          </div>

          {/* Правая колонка – текстовая инфа */}
          <div className="rounded-[32px] bg-white shadow-[0_24px_70px_rgba(67,142,229,0.18)] p-8 lg:p-10">
            {/* Верхний блок: ФИО, цена */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[12px] text-[#1F98FA]">
                  <span className="h-2 w-2 rounded-full bg-[#1F98FA]" />
                  <span className="font-medium">Проверен Yordam</span>
                </div>

                <h2 className="mb-1 text-[26px] font-semibold text-[#071A34]">
                  {psychologist.fullName}
                </h2>

                <p className="mb-1 text-[14px] text-[#4A5568]">
                  {psychologist.age} лет • Опыт {psychologist.experience} лет
                </p>

                <p className="flex items-center gap-1 text-[13px] text-[#8A94A6]">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#D0D9E8] text-[10px]">
                    ?
                  </span>
                  Соответствует вашему запросу
                </p>
              </div>

              <div className="text-right">
                <div className="text-[22px] font-semibold text-[#1F98FA]">
                  {psychologist.price.toLocaleString("ru-RU")}{" "}
                  <span className="text-[14px] text-[#071A34]">
                    сум/час
                  </span>
                </div>
              </div>
            </div>

            {/* Психологический подход */}
            <section className="mb-8">
              <h3 className="mb-3 text-[14px] font-semibold text-[#071A34]">
                Психологический подход к работе
              </h3>
              <div className="flex flex-wrap gap-3">
                {psychologist.approaches?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#F3F5F9] px-5 py-2 text-[13px] text-[#071A34]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Образование / Сертификаты — просто заглушки с версткой как в макете */}
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
          </div>
        </div>

        {/* Блок "Отзывы" */}
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
    </MainLayout>
  );
}

export default PsychologistDetailPage;
