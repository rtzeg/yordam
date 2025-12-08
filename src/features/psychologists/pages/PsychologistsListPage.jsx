// src/features/psychologists/pages/PsychologistsListPage.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { PsychologistCard } from "../components/PsychologistCard.jsx";
import { MainLayout } from "../../../components/layout/MainLayout.jsx";
import { getPsychologistsList } from "../../../shared/api/api";
import { useTranslation } from "react-i18next";

const ANY_VALUE = "__any"; // внутреннее значение "любой / har qanday"

export function PsychologistsListPage() {
  const { t } = useTranslation();

  // данные с API
  const [allPsychologists, setAllPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI-состояния
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [openFilterSections, setOpenFilterSections] = useState({});
  const [sortMode, setSortMode] = useState("popular");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // 1. Загружаем психологов с бэкенда
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const list = await getPsychologistsList();
        if (!cancelled) {
          setAllPsychologists(list);
        }
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setError(e?.message || t("psychologistsList.messages.loadError"));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Конфиг сортировки (подписи завязаны на i18n)
  const sortOptions = [
    { key: "popular", label: t("psychologistsList.sort.popular") },
    { key: "verified", label: t("psychologistsList.sort.verified") },
    { key: "new", label: t("psychologistsList.sort.new") },
  ];

  // 3. Строим опции фильтров из реальных данных
  const filterConfig = useMemo(() => {
    // уникальные значения из массива
    const unique = (arr) =>
      Array.from(new Set(arr.filter(Boolean))).sort((a, b) =>
        String(a).localeCompare(String(b), "ru")
      );

    const therapyTypes = unique(allPsychologists.map((p) => p.therapyType));
    const approaches = unique(allPsychologists.map((p) => p.approach));
    const languages = unique(allPsychologists.map((p) => p.language));
    const times = unique(allPsychologists.map((p) => p.time));

    return [
      {
        key: "therapyType",
        label: t("psychologistsList.filters.therapyType.label"),
        options: [
          {
            value: ANY_VALUE,
            label: t("psychologistsList.filters.common.any"),
          },
          ...therapyTypes.map((val) => ({
            value: val,
            label: val,
          })),
        ],
      },
      {
        key: "approach",
        label: t("psychologistsList.filters.approach.label"),
        options: [
          {
            value: ANY_VALUE,
            label: t("psychologistsList.filters.common.any"),
          },
          ...approaches.map((val) => ({
            value: val,
            label: val,
          })),
        ],
      },
      {
        key: "experience",
        label: t("psychologistsList.filters.experience.label"),
        options: [
          {
            value: ANY_VALUE,
            label: t("psychologistsList.filters.common.any"),
          },
          {
            value: "from1",
            label: t("psychologistsList.filters.experience.from1"),
          },
          {
            value: "from3",
            label: t("psychologistsList.filters.experience.from3"),
          },
          {
            value: "from5",
            label: t("psychologistsList.filters.experience.from5"),
          },
        ],
      },
      {
        key: "time",
        label: t("psychologistsList.filters.time.label"),
        options: [
          {
            value: ANY_VALUE,
            label: t("psychologistsList.filters.time.anyTime"),
          },
          ...times.map((val) => ({
            value: val,
            label: val,
          })),
        ],
      },
      {
        key: "language",
        label: t("psychologistsList.filters.language.label"),
        options: [
          {
            value: ANY_VALUE,
            label: t("psychologistsList.filters.common.any"),
          },
          ...languages.map((val) => ({
            value: val,
            label: val,
          })),
        ],
      },
    ];
  }, [allPsychologists, t]);

  // 4. Инициализируем filters и открытые секции, когда готова конфигурация
  useEffect(() => {
    if (!filterConfig.length) return;

    const initialFilters = {};
    const openSections = {};

    filterConfig.forEach((f) => {
      initialFilters[f.key] = f.options[0]?.value ?? ANY_VALUE;
      openSections[f.key] = true;
    });

    setFilters(initialFilters);
    setOpenFilterSections(openSections);
    setVisibleCount(6);
  }, [filterConfig]);

  const toggleSection = (key) => {
    setOpenFilterSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setVisibleCount(6);
  };

  const handleResetFilters = () => {
    const reset = {};
    filterConfig.forEach((f) => {
      reset[f.key] = f.options[0]?.value ?? ANY_VALUE;
    });
    setFilters(reset);
    setVisibleCount(6);
  };

  // 5. Фильтрация + сортировка
  const filteredAndSorted = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let list = allPsychologists.filter((p) => {
      // Поиск по имени, подходу, языку, тегам, темам, возрасту и опыту
      if (query) {
        const haystack = [
          p.name,
          p.therapyType,
          p.approach,
          p.language,
          (p.tags || []).join(" "),
          (p.topics || []).join(" "),
          String(p.experienceYears),
          String(p.age),
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(query)) return false;
      }

      // Фильтр вид терапии
      if (
        filters.therapyType &&
        filters.therapyType !== ANY_VALUE &&
        p.therapyType !== filters.therapyType
      ) {
        return false;
      }

      // Фильтр подхода
      if (
        filters.approach &&
        filters.approach !== ANY_VALUE &&
        p.approach !== filters.approach
      ) {
        return false;
      }

      // Фильтр языка
      if (
        filters.language &&
        filters.language !== ANY_VALUE &&
        p.language !== filters.language
      ) {
        return false;
      }

      // Фильтр времени (если у тебя есть поле time в маппинге)
      if (
        filters.time &&
        filters.time !== ANY_VALUE &&
        p.time !== filters.time
      ) {
        return false;
      }

      // Фильтр опыта
      if (filters.experience && filters.experience !== ANY_VALUE) {
        let minYears = 0;
        if (filters.experience === "from1") minYears = 1;
        if (filters.experience === "from3") minYears = 3;
        if (filters.experience === "from5") minYears = 5;

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
  }, [allPsychologists, searchQuery, filters, sortMode]);

  const totalFound = filteredAndSorted.length;
  const visiblePsychologists = filteredAndSorted.slice(0, visibleCount);

  const currentSortLabel =
    sortOptions.find((o) => o.key === sortMode)?.label ||
    t("psychologistsList.sort.popular");

  return (
    <MainLayout>
      <div className="w-full px-4 lg:px-12 xl:px-[72px] py-10">
        {/* Заголовок */}
        <h1 className="font-display text-[32px] md:text-[40px] font-bold text-[#1F98FA]">
          {t("psychologistsList.title")}
        </h1>

        {/* Верх: хлебные крошки, поиск, сортировка */}
        <div className="mt-4 border-b border-[#46A9FF] pb-5">
          <div className="mb-3 flex items-center gap-1 text-[13px] text-[#9BA6B5]">
            <Link
              to="/"
              className="hover:text-[#1F98FA] transition-colors"
            >
              {t("psychologistsList.breadcrumbs.home")}
            </Link>
            <span>›</span>
            <span className="text-[#071A34]">
              {t("psychologistsList.breadcrumbs.current")}
            </span>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Поиск */}
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
                  placeholder={t("psychologistsList.search.placeholder")}
                  className="w-full rounded-full border border-[#D6DEE9] bg-white px-10 py-3 text-[14px] text-[#071A34] outline-none placeholder:text-[#B2BDCC] focus:border-[#1F98FA]"
                />
              </div>
            </div>

            {/* Найдено + сортировка */}
            <div className="mt-2 flex items-center justify-between md:mt-0 md:ml-6 md:w-auto">
              <div className="flex items-center gap-1 text-[13px] text-[#B2BDCC]">
                <span>{t("psychologistsList.found.prefix")}</span>
                <span className="font-medium text-[#071A34]">
                  {totalFound}
                </span>
                <span>{t("psychologistsList.found.suffix")}</span>
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

        {/* Контент */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Левая колонка: фильтры */}
          <aside className="w-full max-w-[260px] rounded-[32px] bg-white/70 px-6 py-6 shadow-[0_18px_38px_rgba(67,142,229,0.12)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[20px] font-semibold text-[#071A34]">
                {t("psychologistsList.filters.title")}
              </h2>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[12px] text-[#9BA6B5] hover:text-[#1F98FA]"
              >
                {t("psychologistsList.filters.reset")}
              </button>
            </div>

            {loading && (
              <div className="py-4 text-[13px] text-[#6F7A89]">
                {t("psychologistsList.messages.loadingFilters")}
              </div>
            )}

            {!loading && (
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
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                handleFilterChange(group.key, opt.value)
                              }
                              className={`flex w-full items-center justify-between text-[13px] ${filters[group.key] === opt.value
                                  ? "text-[#071A34] font-medium"
                                  : "text-[#6F7A89]"
                                }`}
                            >
                              <span>{opt.label}</span>
                              {filters[group.key] === opt.value && (
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
            )}
          </aside>

          {/* Правая колонка: карточки */}
          <section className="flex-1">
            {loading && (
              <div className="rounded-[24px] bg-white/80 p-8 text-center text-[14px] text-[#6F7A89] shadow-sm">
                {t("psychologistsList.messages.loadingList")}
              </div>
            )}

            {error && !loading && (
              <div className="rounded-[24px] bg-white/80 p-8 text-center text-[14px] text-red-500 shadow-sm">
                {t("psychologistsList.messages.errorPrefix")} {error}
              </div>
            )}

            {!loading && !error && visiblePsychologists.length === 0 && (
              <div className="rounded-[24px] bg-white/80 p-8 text-center text-[14px] text-[#6F7A89] shadow-sm">
                {t("psychologistsList.messages.empty")}
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
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="rounded-full border border-[#D6DEE9] bg-white px-8 py-3 text-[14px] text-[#6F7A89] hover:bg-[#F5F7FA]"
                    >
                      {t("psychologistsList.loadMore")}
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
