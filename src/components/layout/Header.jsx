// src/components/layout/Header.jsx

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

// i18n
import i18n from "../../shared/i18n";
import { useTranslation } from "react-i18next";

export function Header() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const { favoriteIds } = useFavorites();
    const { t } = useTranslation();

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
        { to: "/psychologists", label: t("header.nav.catalog") },
        { to: "/companies", label: t("header.nav.companies") },
        { to: "/psy", label: t("header.nav.psychologists") },
        { to: "/influencers", label: t("header.nav.influencers") },
        { to: "/contacts", label: t("header.nav.contacts") },
    ];

    const isActive = (to) =>
        to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

    const initials = user?.fullName?.trim()?.[0]?.toUpperCase() || "Ю";

    // язык RU / UZ
    const currentLang = i18n.language && i18n.language.startsWith("uz") ? "uz" : "ru";

    const toggleLanguage = () => {
        const next = currentLang === "ru" ? "uz" : "ru";
        i18n.changeLanguage(next);
    };

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

                            {/* ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА RU / UZ */}
                            <button
                                type="button"
                                onClick={toggleLanguage}
                                className="flex items-center gap-1 rounded-full border border-transparent px-2 py-1 text-[13px] text-[#6D7685] hover:border-[#1F98FA] hover:text-[#1F98FA] transition-colors"
                            >
                                <span className="font-semibold">
                                    {currentLang === "ru" ? "RU" : "UZ"}
                                </span>
                                <span className="text-[9px]">▼</span>
                            </button>

                            {/* ИЗБРАННОЕ */}
                            {user && (
                                <Link
                                    to="/favorites"
                                    className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#1F98FA] hover:bg-[#E8F4FF]"
                                    title={t("header.favorites.title")}
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
                                    {t("header.auth.login")}
                                </Link>
                                <Link
                                    to="/auth/register"
                                    className="inline-flex items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-5 py-2 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.55)] hover:bg-[#0f84e2]"
                                >
                                    {t("header.auth.register")}
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
                                                ? t("header.role.psychologist")
                                                : t("header.role.client")}
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
                                            {t("header.account.title")}
                                        </div>

                                        <div className="space-y-1 text-[14px] text-[#071A34]">
                                            <Link
                                                to="/client"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#F5F8FF]"
                                            >
                                                <MessageCircle className="h-4 w-4 text-[#1F98FA]" />
                                                <span>{t("header.account.personalQuestions")}</span>
                                            </Link>

                                            <Link
                                                to="/psychologists"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#F5F8FF]"
                                            >
                                                <UserCircle2 className="h-4 w-4 text-[#1F98FA]" />
                                                <span>{t("header.account.choosePsychologist")}</span>
                                            </Link>

                                            <Link
                                                to="/client/settings"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#F5F8FF]"
                                            >
                                                <Settings className="h-4 w-4 text-[#1F98FA]" />
                                                <span>{t("header.account.settings")}</span>
                                            </Link>

                                            <Link
                                                to="/client/billing"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#F5F8FF]"
                                            >
                                                <CreditCard className="h-4 w-4 text-[#1F98FA]" />
                                                <span>{t("header.account.billing")}</span>
                                            </Link>

                                            <Link
                                                to="/client/videochat"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#F5F8FF]"
                                            >
                                                <Video className="h-4 w-4 text-[#1F98FA]" />
                                                <span>{t("header.account.videochat")}</span>
                                            </Link>

                                            <Link
                                                to="/client/support"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-[#F5F8FF]"
                                            >
                                                <LifeBuoy className="h-4 w-4 text-[#1F98FA]" />
                                                <span>{t("header.account.support")}</span>
                                            </Link>

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
                                                <span>{t("header.account.logout")}</span>
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
