import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    ChevronDown,
    ChevronUp,
    MessageCircle,
    UserCircle2,
    Settings,
    CreditCard,
    Video,
    LifeBuoy,
    LogOut,
    Heart,
} from "lucide-react";

import logo from "../../assets/images/logo.png";
import { useAuth } from "../../features/auth/AuthContext";
import { useFavorites } from "../../features/favorites/FavoritesContext";

export function Header() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const { favoriteIds } = useFavorites();

    const hasFavorites = favoriteIds.length > 0;

    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const navLinks = [
        { to: "/psychologists", label: "Каталог специалистов" },
        { to: "/companies", label: "Компаниям" },
        { to: "/psy", label: "Психологам" },
        { to: "/influencers", label: "Инфлюенсерам" },
        { to: "/contacts", label: "Контакты" },
    ];

    const isActive = (to) =>
        to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

    const initials = user?.fullName?.trim()?.[0]?.toUpperCase() || "Ю";

    return (
        <header className="bg-white">
            <div className="mx-auto flex max-w-[1440px] items-center justify-center px-4 py-3 lg:px-[72px] lg:py-[22px]">
                <div className="flex w-full max-w-[1250px] items-center justify-between">
                    {/* ЛОГО */}
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="Yordam"
                            className="h-[32px] w-auto object-contain"
                        />
                        <span className="text-[13px] font-medium text-[#1F98FA] underline underline-offset-4">
                            Сервис
                        </span>
                    </Link>

                    {/* НАВИГАЦИЯ */}
                    <nav className="ml-6 flex flex-1 items-center justify-between gap-6">
                        <div className="hidden items-center gap-6 text-[13px] text-[#6D7685] lg:flex">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`nav-link ${isActive(link.to) ? "text-[#071A34]" : ""
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* язык */}
                            <button className="flex items-center gap-1 text-[13px] text-[#6D7685] hover:text-[#1F98FA]">
                                <span>RU</span>
                                <span className="text-[9px]">▼</span>
                            </button>

                            {/* ИЗБРАННОЕ */}
                            {user && (
                                <Link
                                    to="/favorites"
                                    className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#1F98FA] hover:bg-[#E8F4FF]"
                                    title="Избранные психологи"
                                >
                                    <Heart
                                        className={`h-4 w-4 ${hasFavorites ? "fill-[#1F98FA]" : ""
                                            }`}
                                    />
                                    {hasFavorites && (
                                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF4D3D] text-[10px] text-white">
                                            {favoriteIds.length}
                                        </span>
                                    )}
                                </Link>
                            )}
                        </div>

                        {/* ПРАВАЯ ЧАСТЬ */}
                        {!user ? (
                            <div className="ml-auto flex items-center gap-3 text-[13px]">
                                <Link
                                    to="/auth/login"
                                    className="inline-flex items-center justify-center rounded-full border border-[#C7D2E2] px-4 py-2 text-[#071A34] hover:border-[#1F98FA]"
                                >
                                    Войти
                                </Link>
                                <Link
                                    to="/auth/register"
                                    className="inline-flex items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-5 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.55)] hover:bg-[#0f84e2]"
                                >
                                    Зарегистрироваться
                                </Link>
                            </div>
                        ) : (
                            <div
                                ref={dropdownRef}
                                className="relative ml-auto flex items-center gap-2"
                            >
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen((v) => !v)}
                                    className="flex items-center gap-3 rounded-full border border-[#C7D2E2] bg-white px-2.5 py-1.5 hover:border-[#1F98FA] transition-colors"
                                >
                                    {user.profile?.avatarUrl ? (
                                        <img
                                            src={user.profile.avatarUrl}
                                            alt={user.fullName}
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F98FA] text-[14px] font-semibold text-white">
                                            {initials}
                                        </div>
                                    )}

                                    <div className="hidden flex-col items-start leading-tight sm:flex">
                                        <span className="text-[13px] font-semibold text-[#071A34]">
                                            {user.fullName}
                                        </span>
                                        <span className="text-[11px] text-[#9BA6B5]">
                                            {user.role === "psychologist"
                                                ? "Психолог"
                                                : "Клиент сервиса"}
                                        </span>
                                    </div>

                                    {menuOpen ? (
                                        <ChevronUp className="h-4 w-4 text-[#9BA6B5]" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-[#9BA6B5]" />
                                    )}
                                </button>

                                {/* ДРОПДАУН АККАУНТА */}
                                {menuOpen && (
                                    <div className="absolute right-0 top-[110%] z-30 w-[260px] rounded-2xl border border-[#E1E8F0] bg-white p-3 shadow-[0_18px_42px_rgba(67,142,229,0.25)]">
                                        <div className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-[#9BA6B5]">
                                            Аккаунт
                                        </div>

                                        <div className="space-y-1 text-[14px] text-[#071A34]">
                                            <Link
                                                to="/cabinet"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#F5F8FF]"
                                            >
                                                <MessageCircle className="h-4 w-4 text-[#1F98FA]" />
                                                <span>Личные вопросы</span>
                                            </Link>

                                            <Link
                                                to="/psychologists"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#F5F8FF]"
                                            >
                                                <UserCircle2 className="h-4 w-4 text-[#1F98FA]" />
                                                <span>Выбор психолога</span>
                                            </Link>

                                            <button
                                                type="button"
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-[#F5F8FF]"
                                            >
                                                <Settings className="h-4 w-4 text-[#1F98FA]" />
                                                <span>Настройки</span>
                                            </button>

                                            <button
                                                type="button"
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-[#F5F8FF]"
                                            >
                                                <CreditCard className="h-4 w-4 text-[#1F98FA]" />
                                                <span>Оплата</span>
                                            </button>

                                            <button
                                                type="button"
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-[#F5F8FF]"
                                            >
                                                <Video className="h-4 w-4 text-[#1F98FA]" />
                                                <span>Видеочат</span>
                                            </button>

                                            <button
                                                type="button"
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-[#F5F8FF]"
                                            >
                                                <LifeBuoy className="h-4 w-4 text-[#1F98FA]" />
                                                <span>Поддержка</span>
                                            </button>

                                            <div className="my-1 border-t border-[#E7EDF5]" />

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setMenuOpen(false);
                                                    logout();
                                                }}
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[#FF4D3D] hover:bg-[#FFF4F2]"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Выйти из аккаунта</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
