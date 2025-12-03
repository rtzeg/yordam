// src/features/psychologists/pages/FavoritePsychologistsPage.jsx
import { Link } from "react-router-dom";
import { MainLayout } from "../../../components/layout/MainLayout";
import psychologistsMock from "../mockPsychologists";
import { useFavorites } from "../../favorites/FavoritesContext";
import { PsychologistCard } from "../components/PsychologistCard";

export default function FavoritePsychologistsPage() {
    const { favoriteIds } = useFavorites();

    const favorites = psychologistsMock.filter((p) =>
        favoriteIds.includes(String(p.id))
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

                {favorites.length === 0 ? (
                    <div className="rounded-[24px] bg-white/90 p-8 text-[14px] text-[#6F7A89] shadow-sm">
                        У вас пока нет избранных специалистов. Добавьте психолога на
                        странице поиска или профиля.
                    </div>
                ) : (
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
