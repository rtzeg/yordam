// src/features/psychologists/pages/FavoritePsychologistsPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { MainLayout } from "../../../components/layout/MainLayout.jsx";
import { useFavorites } from "../../favorites/FavoritesContext.jsx";
import { PsychologistCard } from "../components/PsychologistCard.jsx";
import { getPsychologistsList } from "../../../shared/api/api";

export default function FavoritePsychologistsPage() {
  const { favoriteIds } = useFavorites();

  const [allPsychologists, setAllPsychologists] = useState([]);
  const [loading, setLoading] = useState(favoriteIds.length > 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setAllPsychologists([]);
      setLoading(false);
      setError(null);
      return;
    }

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
          setError(e?.message || "Ошибка загрузки специалистов");
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
  }, [favoriteIds]);

  const favorites = useMemo(
    () =>
      allPsychologists.filter((p) =>
        favoriteIds.includes(String(p.id))
      ),
    [allPsychologists, favoriteIds]
  );

  return (
    <MainLayout>
      <div className="w-full px-4 lg:px-12 xl:px-[72px] py-10">
        <h1 className="font-display text-[32px] md:text-[40px] font-bold text-[#1F98FA]">
          Избранные психологи
        </h1>

        <div className="mt-4 mb-6 flex items-center gap-1 text-[13px] text-[#9BA6B5]">
          <Link to="/" className="hover:text-[#1F98FA]">
            Главная страница
          </Link>
          <span>›</span>
          <span className="text-[#071A34]">Избранные психологи</span>
        </div>

        {loading && (
          <div className="rounded-[24px] bg-white/90 p-8 text-[14px] text-[#6F7A89] shadow-sm">
            Загружаем ваших избранных специалистов...
          </div>
        )}

        {error && !loading && (
          <div className="rounded-[24px] bg-white/90 p-8 text-[14px] text-red-500 shadow-sm">
            Ошибка: {error}
          </div>
        )}

        {!loading && !error && favoriteIds.length === 0 && (
          <div className="rounded-[24px] bg-white/90 p-8 text-[14px] text-[#6F7A89] shadow-sm">
            У вас пока нет избранных специалистов. Добавьте психолога на
            странице поиска или профиля.
          </div>
        )}

        {!loading &&
          !error &&
          favoriteIds.length > 0 &&
          favorites.length === 0 && (
            <div className="rounded-[24px] bg-white/90 p-8 text-[14px] text-[#6F7A89] shadow-sm">
              Вы добавили специалистов в избранное, но они сейчас не найдены
              в списке. Возможно, их статус изменился.
            </div>
          )}

        {!loading && !error && favorites.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 justify-items-center xl:justify-items-start">
            {favorites.map((p) => (
              <PsychologistCard key={p.id} psychologist={p} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
