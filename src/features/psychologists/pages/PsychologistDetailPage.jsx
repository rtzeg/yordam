// src/features/psychologists/pages/PsychologistDetailPage.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";

import { MainLayout } from "../../../components/layout/MainLayout.jsx";
import { useFavorites } from "../../favorites/FavoritesContext.jsx";
import { getPsychologistsList } from "../../../shared/api/api";

function getYearsLabel(years = 0) {
  if (years % 10 === 1 && years % 100 !== 11) return `${years} год`;
  if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) {
    return `${years} года`;
  }
  return `${years} лет`;
}

const mockReviews = [
  {
    id: 1,
    name: "Leslie Alexander",
    role: "Клиент сервиса Yordam",
    text: "Сервис помог найти своего специалиста. Сайт удобный, записаться на сессию пару кликов.",
  },
  {
    id: 2,
    name: "Jenny Wilson",
    role: "Клиентка сервиса Yordam",
    text: "Не верилось, что онлайн-терапия зайдёт. Но с вашим психологом получилось выстроить доверие.",
  },
  {
    id: 3,
    name: "Michael Smith",
    role: "Клиент сервиса Yordam",
    text: "Нравится, что напоминания о сессиях приходят вовремя, а оплату и документы удобно хранить в одном месте.",
  },
  {
    id: 4,
    name: "Emily Jones",
    role: "Клиентка сервиса Yordam",
    text: "Нашла специалиста, который понимает именно мой запрос. Формат и интерфейс очень комфортные.",
  },
];

export function PsychologistDetailPage() {
  const { id } = useParams();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const reviewsRef = useRef(null);

  const [psychologist, setPsychologist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const list = await getPsychologistsList();
        const found = list.find((p) => String(p.id) === String(id));

        if (!cancelled) {
          setPsychologist(found || null);
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setError(e?.message || "Ошибка загрузки данных");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="w-full px-4 lg:px-12 xl:px-[72px] py-10">
          <p className="text-[#071A34] text-[16px]">Загружаем специалиста...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="w-full px-4 lg:px-12 xl:px-[72px] py-10">
          <p className="text-[16px] text-red-500 mb-3">Ошибка: {error}</p>
          <Link to="/psychologists" className="text-[#1F98FA] underline">
            Вернуться к списку
          </Link>
        </div>
      </MainLayout>
    );
  }

  if (!psychologist) {
    return (
      <MainLayout>
        <div className="w-full px-4 lg:px-12 xl:px-[72px] py-10">
          <p className="text-[#071A34] text-[16px]">
            Специалист не найден.{" "}
            <Link to="/psychologists" className="text-[#1F98FA] underline">
              Вернуться к списку
            </Link>
          </p>
        </div>
      </MainLayout>
    );
  }

  const {
    name,
    age,
    experienceYears,
    about,
    approach,
    therapyType,
    topics = [],
    tags = [],
    pricePerHour,
    currency = "сум",
    verified,
    education = [],
    certificates = [],
    photoUrl,
  } = psychologist;

  const isFavorite =
    favoriteIds.includes(String(psychologist.id)) ||
    favoriteIds.includes(psychologist.id);

  const initials = name
    ?.trim()
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const priceText =
    pricePerHour != null
      ? `${pricePerHour.toLocaleString("ru-RU")} ${currency}/час`
      : "Цена уточняется";

  const handleScrollLeft = () => {
    if (!reviewsRef.current) return;
    reviewsRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    if (!reviewsRef.current) return;
    reviewsRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <MainLayout>
      <div className="w-full px-4 lg:px-10 xl:px-12 py-12">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-5 flex flex-wrap items-center gap-1 text-[13px] text-[#9BA6B5]">
            <Link to="/" className="hover:text-[#1F98FA] transition-colors">
              Главная страница
            </Link>
            <span>›</span>
            <Link
              to="/psychologists"
              className="hover:text-[#1F98FA] transition-colors"
            >
              Выбор специалиста
            </Link>
            <span>›</span>
            <span className="text-[#071A34] truncate max-w-[260px]">
              {name}
            </span>
          </div>

          <h1 className="mb-8 font-display text-[32px] md:text-[38px] text-[#1F98FA] leading-tight">
            Страница специалиста
          </h1>

          <section className="rounded-[40px] bg-white px-7 py-8 md:px-10 md:py-10 shadow-[0_26px_70px_rgba(67,142,229,0.16)] flex flex-col lg:flex-row gap-10 lg:gap-14">
            <div className="w-full max-w-[280px] flex flex-col items-center lg:items-start gap-4">
              <div className="flex h-[240px] w-[240px] items-center justify-center rounded-[40px] bg-[#F3F7FF] overflow-hidden">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name}
                    className="h-[240px] w-[240px] object-cover"
                  />
                ) : (
                  <div className="flex h-[190px] w-[190px] items-center justify-center rounded-full bg-[#1F98FA] text-[60px] font-semibold text-white">
                    {initials || "П"}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="mt-2 w-full rounded-full bg-[#1F98FA] py-3.5 text-[14px] font-semibold text-white shadow-[0_16px_32px_rgba(31,152,250,0.55)] hover:bg-[#0f84e2] transition-colors"
              >
                Забронировать время
              </button>

              <button
                type="button"
                onClick={() => toggleFavorite(psychologist.id)}
                className={`mt-1 flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-[13px] transition ${
                  isFavorite
                    ? "border-[#1F98FA] bg-[#E8F4FF] text-[#1F98FA]"
                    : "border-[#D6DEE9] bg-white text-[#071A34] hover:bg-[#F5F7FA]"
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite
                      ? "fill-[#1F98FA] text-[#1F98FA]"
                      : "text-[#1F98FA]"
                  }`}
                />
                <span>
                  {isFavorite ? "В избранном" : "Добавить в избранное"}
                </span>
              </button>
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-[640px]">
                  <p className="flex items-center gap-2 text-[12px] text-[#9BA6B5]">
                    {verified && (
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#1F98FA]" />
                    )}
                    {verified ? "Проверен Yordam" : "Специалист Yordam"}
                  </p>
                  <h2 className="mt-1 text-[24px] md:text-[26px] font-semibold text-[#071A34]">
                    {name}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#6F7A89]">
                    {age ? `${age} лет` : "Возраст не указан"} •{" "}
                    {experienceYears
                      ? `Опыт ${getYearsLabel(experienceYears)}`
                      : "Опыт не указан"}
                  </p>
                </div>

                <div className="text-right pt-1">
                  <div className="text-[20px] md:text-[22px] font-semibold text-[#1F98FA]">
                    {priceText}
                  </div>
                  <p className="text-[11px] text-[#9BA6B5] mt-1">
                    Стоимость сессии
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-[14px] font-semibold text-[#071A34]">
                  Обо мне
                </h3>
                <p className="text-[13px] leading-relaxed text-[#4B5563] max-w-[760px]">
                  {about ||
                    "Описание специалиста будет добавлено позже. Здесь можно рассказать о своём подходе, опыте и темах, с которыми вы работаете."}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-[14px] font-semibold text-[#071A34]">
                  Психологический подход к работе
                </h3>

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
                  {[...topics, ...tags].slice(0, 6).map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-[#F5F7FA] px-3 py-1 text-[11px] text-[#4B5563]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <section className="mt-8 mb-4">
                <h3 className="mb-3 text-[14px] font-semibold text-[#071A34]">
                  Образование
                </h3>

                {education.length === 0 ? (
                  <p className="text-[13px] text-[#6F7A89]">
                    Информация об образовании будет добавлена позже.
                  </p>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2 text-[13px] text-[#4A5568]">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <p>
                          {edu.institution}
                          {edu.endYear && <> • {edu.endYear}</>}
                        </p>
                        {edu.degree && <p>{edu.degree}</p>}
                        {edu.years && (
                          <p className="text-[12px] text-[#6F7A89]">
                            {edu.years}
                          </p>
                        )}
                        {edu.documentUrl && (
                          <a
                            href={edu.documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-block text-[12px] text-[#1F98FA] underline underline-offset-4"
                          >
                            Ссылка на документ →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="mt-6 mb-4">
                <h3 className="mb-3 text-[14px] font-semibold text-[#071A34]">
                  Сертификаты
                </h3>

                {certificates.length === 0 ? (
                  <p className="text-[13px] text-[#6F7A89]">
                    Информация о сертификатах будет добавлена позже.
                  </p>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2 text-[13px] text-[#4A5568]">
                    {certificates.map((cert) => (
                      <div key={cert.id}>
                        <p>
                          {cert.name}
                          {cert.issuer && <> • {cert.issuer}</>}
                        </p>
                        {cert.issueDate && (
                          <p className="text-[12px] text-[#6F7A89]">
                            Выдан: {cert.issueDate}
                          </p>
                        )}
                        {cert.expiryDate && (
                          <p className="text-[12px] text-[#6F7A89]">
                            Действителен до: {cert.expiryDate}
                          </p>
                        )}
                        {cert.documentUrl && (
                          <a
                            href={cert.documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-block text-[12px] text-[#1F98FA] underline underline-offset-4"
                          >
                            Ссылка на документ →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </section>

          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-[26px] md:text-[30px] text-[#1F98FA]">
                Отзывы
              </h2>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleScrollLeft}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6DEE9] bg-white text-[#071A34] hover:bg-[#F5F7FA] transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleScrollRight}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6DEE9] bg-white text-[#071A34] hover:bg-[#F5F7FA] transition"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              ref={reviewsRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#D6DEE9]"
            >
              {mockReviews.map((review) => (
                <article
                  key={review.id}
                  className="min-w-[280px] max-w-[340px] flex-1 rounded-[32px] bg-white px-7 py-7 shadow-[0_18px_42px_rgba(67,142,229,0.16)]"
                >
                  <div className="mb-3 flex gap-1 text-[#FFC857] text-[14px]">
                    {"★★★★★".split("").map((star, idx) => (
                      <span key={idx}>{star}</span>
                    ))}
                  </div>
                  <p className="text-[13px] leading-relaxed text-[#4B5563]">
                    {review.text}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F7FF] text-[13px] font-semibold text-[#1F98FA]">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#071A34]">
                        {review.name}
                      </p>
                      <p className="text-[11px] text-[#9BA6B5]">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default PsychologistDetailPage;
