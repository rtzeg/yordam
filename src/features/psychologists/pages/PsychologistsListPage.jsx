// src/features/psychologists/pages/PsychologistsListPage.jsx

import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { PsychologistCard } from "../components/PsychologistCard.jsx";
import { MainLayout } from "../../../components/layout/MainLayout.jsx";

// ВАЖНО: та функция, которая реально есть в api.js
import { getPsychologistsFromApi } from "../../../shared/api/api";

const filterConfig = [
  {
    key: "therapyType",
    label: "Вид терапии",
    options: ["Любой", "Индивидуальная", "Групповая"],
  },
  {
    key: "approach",
    label: "Психологический подход",
    options: [
      "Любой",
      "Гештальт-терапия",
      "Психодрама",
      "Когнитивно-поведенческая",
    ],
  },
  {
    key: "experience",
    label: "Опыт практики",
    options: ["Любой", "От 1 года", "От 3 лет", "От 5 лет"],
  },
  {
    key: "time",
    label: "Удобное время сессии",
    options: ["Любое", "Днём", "Вечером"],
  },
  {
    key: "language",
    label: "Язык консультирования",
    options: ["Любой", "Русский", "Узбекский", "Английский"],
  },
];

const sortOptions = [
  { key: "popular", label: "Самые просматриваемые" },
  { key: "verified", label: "Проверенные" },
  { key: "new", label: "Новички" },
];

export function PsychologistsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(() =>
    filterConfig.reduce(
      (acc, f) => ({
        ...acc,
        [f.key]: f.options[0],
      }),
      {}
    )
  );
  const [openFilterSections, setOpenFilterSections] = useState(() => {
    const obj = {};
    filterConfig.forEach((f) => (obj[f.key] = true));
    return obj;
  });
  const [sortMode, setSortMode] = useState("popular");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // новые стейты для API
  const [remoteList, setRemoteList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // грузим психологов из API один раз при монтировании
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const list = await getPsychologistsFromApi();
        if (!cancelled) {
          setRemoteList(list);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setError(e.message || "Ошибка загрузки данных");
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
  }, []);

  const toggleSection = (key) => {
    setOpenFilterSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFilterChange = (key, option) => {
    setFilters((prev) => ({ ...prev, [key]: option }));
    setVisibleCount(6);
  };

  const handleResetFilters = () => {
    setFilters(
      filterConfig.reduce(
        (acc, f) => ({
          ...acc,
          [f.key]: f.options[0],
        }),
        {}
      )
    );
    setVisibleCount(6);
  };

  const filteredAndSorted = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // вместо psychologistsMock теперь используем remoteList
    let list = remoteList.filter((p) => {
      // Поиск по имени, подходу, языку, тегам, темам, возрасту и опыту
      if (query) {
        const haystack = [
          p.name,
          p.therapyType,
          p.approach,
          p.language,
          (p.tags || []).join(" "),
          (p.topics || []).join(" "),
          String(p.experienceYears ?? ""),
          String(p.age ?? ""),
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(query)) return false;
      }

      // Фильтры
      if (
        filters.therapyType &&
        filters.therapyType !== "Любой" &&
        p.therapyType !== filters.therapyType
      ) {
        return false;
      }

      if (
        filters.approach &&
        filters.approach !== "Любой" &&
        p.approach !== filters.approach
      ) {
        return false;
      }

      if (filters.time && filters.time !== "Любое" && p.time !== filters.time) {
        return false;
      }

      if (
        filters.language &&
        filters.language !== "Любой" &&
        p.language !== filters.language
      ) {
        return false;
      }

      if (filters.experience && filters.experience !== "Любой") {
        let minYears = 0;
        if (filters.experience.includes("1")) minYears = 1;
        if (filters.experience.includes("3")) minYears = 3;
        if (filters.experience.includes("5")) minYears = 5;

        if ((p.experienceYears || 0) < minYears) return false;
      }

      return true;
    });

    // Сортировка
    if (sortMode === "popular") {
      list = [...list].sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (sortMode === "verified") {
      list = [...list].sort((a, b) => {
        if (a.verified === b.verified) return (b.views || 0) - (a.views || 0);
        return a.verified ? -1 : 1;
      });
    } else if (sortMode === "new") {
      list = [...list].sort(
        (a, b) => (a.experienceYears || 0) - (b.experienceYears || 0)
      );
    }

    return list;
  }, [searchQuery, filters, sortMode, remoteList]);

  const totalFound = filteredAndSorted.length;
  const visiblePsychologists = filteredAndSorted.slice(0, visibleCount);

  const currentSortLabel =
    sortOptions.find((o) => o.key === sortMode)?.label ||
    "Самые просматриваемые";

  return (
    <MainLayout>
      <div className="w-full px-4 lg:px-12 xl:px-[72px] py-10">
        <h1 className="font-display text-[32px] md:text-[40px] font-bold text-[#1F98FA]">
          Поиск специалиста
        </h1>

        <div className="mt-4 border-b border-[#46A9FF] pb-5">
          <div className="mb-3 flex items-center gap-1 text-[13px] text-[#9BA6B5]">
            <Link to="/" className="hover:text-[#1F98FA] transition-colors">
              Главная страница
            </Link>
            <span>›</span>
            <span className="text-[#071A34]">Выбор специалиста</span>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9BA6B5]">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(6);
                  }}
                  placeholder="Джон Дой, Нутрициолог, тревога..."
                  className="w-full rounded-full border border-[#D6DEE9] bg-white px-10 py-3 text-[14px] text-[#071A34] outline-none placeholder:text-[#B2BDCC] focus:border-[#1F98FA]"
                />
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between md:mt-0 md:ml-6 md:w-auto">
              <div className="flex items-center gap-1 text-[13px] text-[#B2BDCC]">
                <span>Найдено</span>
                <span className="font-medium text-[#071A34]">
                  {totalFound}
                </span>
                <span>специалистов</span>
              </div>

              <div className="mx-4 hidden h-8 w-px bg-[#E0E6F0] md:block" />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1F98FA] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(31,152,250,0.45)] hover:bg-[#0f84e2] transition-colors"
                >
                  {currentSortLabel}
                  <ChevronDown className="h-4 w-4" />
                </button>

                {sortMenuOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-[220px] overflow-hidden rounded-2xl border border-[#D6DEE9] bg-white shadow-lg">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => {
                          setSortMode(opt.key);
                          setSortMenuOpen(false);
                          setVisibleCount(6);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-3 text-[13px] text-left ${sortMode === opt.key
                            ? "bg-[#ECF7FF] text-[#1F98FA]"
                            : "hover:bg-[#F5F7FA]"
                          }`}
                      >
                        <span>{opt.label}</span>
                        {sortMode === opt.key && (
                          <span className="text-[16px]">•</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <aside className="w-full max-w-[260px] rounded-[32px] bg-white/70 px-6 py-6 shadow-[0_18px_38px_rgba(67,142,229,0.12)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[20px] font-semibold text-[#071A34]">
                Фильтры
              </h2>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[12px] text-[#9BA6B5] hover:text-[#1F98FA]"
              >
                Сбросить
              </button>
            </div>

            <div className="space-y-5">
              {filterConfig.map((group) => {
                const isOpen = openFilterSections[group.key];

                return (
                  <div key={group.key} className="border-b border-[#EDF1F7] pb-4">
                    <button
                      type="button"
                      onClick={() => toggleSection(group.key)}
                      className="flex w-full items-center justify-between text-left"
                    >
                      <span className="text-[13px] font-semibold text-[#071A34]">
                        {group.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-[#9BA6B5] transition-transform ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="mt-3 space-y-2">
                        {group.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              handleFilterChange(group.key, opt)
                            }
                            className={`flex w-full items-center justify-between text-[13px] ${filters[group.key] === opt
                                ? "text-[#071A34] font-medium"
                                : "text-[#6F7A89]"
                              }`}
                          >
                            <span>{opt}</span>
                            {filters[group.key] === opt && (
                              <span className="text-[#1F98FA]">•</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="flex-1">
            {loading && (
              <div className="rounded-[24px] bg-white/80 p-8 text-center text-[14px] text-[#6F7A89] shadow-sm">
                Загружаем список специалистов...
              </div>
            )}

            {!loading && error && (
              <div className="rounded-[24px] bg-white/80 p-8 text-center text-[14px] text-[#DC2626] shadow-sm">
                Ошибка: {error}
              </div>
            )}

            {!loading && !error && visiblePsychologists.length === 0 && (
              <div className="rounded-[24px] bg-white/80 p-8 text-center text-[14px] text-[#6F7A89] shadow-sm">
                По вашему запросу пока ничего не найдено. Попробуйте изменить
                фильтры или запрос.
              </div>
            )}

            {!loading && !error && visiblePsychologists.length > 0 && (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center xl:justify-items-start">
                  {visiblePsychologists.map((p) => (
                    <PsychologistCard key={p.id} psychologist={p} />
                  ))}
                </div>

                {visibleCount < totalFound && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount((prev) => prev + 6)
                      }
                      className="rounded-full border border-[#D6DEE9] bg-white px-8 py-3 text-[14px] text-[#6F7A89] hover:bg-[#F5F7FA]"
                    >
                      Загрузить ещё
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default PsychologistsListPage;
