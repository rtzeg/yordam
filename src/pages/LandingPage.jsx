// src/pages/LandingPage.jsx

import { MainLayout } from "../components/layout/MainLayout";
import { FAQSection } from "/src/components/FAQSection.jsx";

import heroMan from "../assets/images/psy.svg";
import heroWoman from "../assets/images/woman.svg";

import m1 from "../assets/images/m1.svg";
import m2 from "../assets/images/m2.svg";
import m3 from "../assets/images/m3.svg";
import m4 from "../assets/images/m4.svg";
import roundFaq from "../assets/images/roundfaq.png";
import face from "../assets/images/face.svg";

import {
    ClipboardList,
    Users,
    CalendarDays,
    MessageCircle,
} from "lucide-react";

import { useTranslation } from "react-i18next";

export function LandingPage() {
    const { t } = useTranslation();

    // пока везде один и тот же аватар, потом поменяешь
    const experts = Array(6).fill(face);

    return (
        <MainLayout>
            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden bg-[#F7FBFF]">
                <div className="mx-auto max-w-[1440px] px-4 lg:px-[72px]">
                    <div className="relative flex min-h-[420px] items-center justify-center py-10 md:py-14 lg:py-20">
                        {/* Левый персонаж */}
                        <img
                            src={heroMan}
                            alt="Психолог"
                            className="
                pointer-events-none select-none
                absolute bottom-0 left-[-40px]
                h-[280px] md:h-[360px] lg:h-[420px]
              "
                        />

                        {/* Правый персонаж */}
                        <img
                            src={heroWoman}
                            alt="Клиент"
                            className="
                pointer-events-none select-none
                absolute bottom-0 right-[-60px]
                h-[280px] md:h-[400px] lg:h-[460px]
              "
                        />

                        {/* Центральный контент */}
                        <div className="relative z-[1] max-w-[640px] text-center">
                            <h1 className="font-display text-[32px] md:text-[40px] lg:text-[34px] leading-tight text-[#000000]">
                                {t("landing.hero.titleMain")}
                                <span className="block text-[#1F98FA]">
                                    {t("landing.hero.titleAccent")}
                                </span>
                            </h1>

                            <p className="mt-4 text-[16px] md:text-[18px] text-[#000000]">
                                {t("landing.hero.subtitle")}
                            </p>

                            <div className="mt-8 flex justify-center">
                                <a href="psychologists">   <button
                                    type="button"
                                    className="
                    relative inline-flex items-center justify-center
                    rounded-full bg-[#1F98FA]
                    px-10 py-3.5
                    text-[15px] font-semibold text-white
                    shadow-[0_18px_40px_rgba(31,152,250,0.55)]
                    hover:bg-[#0f84e2] transition
                  "
                                >
                                    {t("landing.hero.button")}
                                    {/* Таблетка с ценой поверх кнопки */}
                                    <span
                                        className="
                      pointer-events-none
                      absolute -top-4 right-6
                      rounded-full bg-white
                      px-4 py-1
                      text-[11px] font-semibold text-[#1F98FA]
                      shadow-[0_10px_26px_rgba(31,152,250,0.4)]
                    "
                                    >
                                        {t("landing.hero.priceLabel")}
                                    </span>
                                </button></a>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== ЧЕМ МЫ ВАМ ПОМОЖЕМ ===== */}
            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-[1440px] px-4 lg:px-[72px]">
                    {/* Заголовок */}
                    <div className="mb-8 md:mb-10 text-center">
                        <div className="relative inline-block">
                            <h2 className="font-heading text-[26px] font-display text-[#1F98FA] md:text-[32px]">
                                {t("landing.help.titleMain")}{" "}
                                <span className="text-[#000000]">
                                    {t("landing.help.titleAccent")}
                                </span>
                            </h2>

                            {/* круг справа от текста */}
                            <img
                                src={roundFaq}
                                alt=""
                                aria-hidden="true"
                                className="
                  pointer-events-none
                  absolute left-[207px] top-1/2
                  ml-4 h-10 w-auto -translate-y-1/2
                  md:ml-6 md:h-12
                "
                            />
                        </div>

                        <p className="mt-3 max-w-[520px] mx-auto text-[18px] text-[#000000]">
                            {t("landing.help.text")}
                        </p>
                    </div>

                    {/* Сетка карточек 2x2 */}
                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Карточка 1 */}
                        <div className="relative overflow-hidden rounded-[32px] bg-white px-5 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.08)] md:px-7 md:py-7">
                            <div className="relative z-[1] max-w-[260px]">
                                <h3 className="font-heading text-[18px] font-display text-[#1F98FA]">
                                    {t("landing.help.cards.anxiety.title")}
                                </h3>
                                <p className="mt-3 text-[13px] leading-relaxed text-[#000000]">
                                    {t("landing.help.cards.anxiety.text")}
                                </p>
                            </div>
                            <img
                                src={m1}
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none absolute right-[-40px] top-1/2 h-[260px] -translate-y-1/2 opacity-70"
                            />
                        </div>

                        {/* Карточка 2 */}
                        <div className="relative overflow-hidden rounded-[32px] bg-white px-5 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.08)] md:px-7 md:py-7">
                            <div className="relative z-[1] max-w-[260px]">
                                <h3 className="font-heading text-[18px] font-display text-[#1F98FA]">
                                    {t("landing.help.cards.kids.title")}
                                </h3>
                                <p className="mt-3 text-[13px] leading-relaxed text-[#000000]">
                                    {t("landing.help.cards.kids.text")}
                                </p>
                            </div>
                            <img
                                src={m2}
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none absolute right-[-40px] top-1/2 h-[200px] -translate-y-1/2 opacity-70"
                            />
                        </div>

                        {/* Карточка 3 */}
                        <div className="relative overflow-hidden rounded-[32px] bg-white px-5 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.08)] md:px-7 md:py-7">
                            <div className="relative z-[1] max-w-[280px]">
                                <h3 className="font-heading text-[18px] font-display text-[#1F98FA]">
                                    {t("landing.help.cards.relationships.title")}
                                </h3>
                                <p className="mt-3 text-[13px] leading-relaxed text-[#000000]">
                                    {t("landing.help.cards.relationships.text")}
                                </p>
                            </div>
                            <img
                                src={m3}
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none absolute right-[-60px] top-1/2 h-[250px] -translate-y-1/2 opacity-70"
                            />
                        </div>

                        {/* Карточка 4 */}
                        <div className="relative overflow-hidden rounded-[32px] bg-white px-5 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.08)] md:px-7 md:py-7">
                            <div className="relative z-[1] max-w-[260px]">
                                <h3 className="font-heading text-[18px] font-display text-[#1F98FA]">
                                    {t("landing.help.cards.loss.title")}
                                </h3>
                                <p className="mt-3 text-[13px] leading-relaxed text-[#000000]">
                                    {t("landing.help.cards.loss.text")}
                                </p>
                            </div>
                            <img
                                src={m4}
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none absolute right-[-20px] top-1/2 h-[260px] -translate-y-1/2 opacity-70"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== КАК ЭТО РАБОТАЕТ ===== */}
            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-[1440px] px-4 lg:px-[72px] text-center">
                    <h2 className="text-[26px] md:text-[32px] font-display  text-[#1F98FA]">
                        {t("landing.howItWorks.title")}
                    </h2>
                    <p className="mt-3 max-w-[640px] mx-auto text-[18px] text-[#000000]">
                        {t("landing.howItWorks.subtitle")}
                    </p>

                    {/* карточки шагов */}
                    <div className="mt-8 grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {/* Шаг 1 */}
                        <div className="rounded-[28px] bg-white px-5 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.06)] border border-[#D9E2F2]">
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F4FF]">
                                <ClipboardList className="h-5 w-5 text-[#1F98FA]" />
                            </div>
                            <h3 className="mb-2 font-display text-[16px] text-[#1F98FA]">
                                {t("landing.howItWorks.steps.step1.title")}
                            </h3>
                            <p className="text-[14px] leading-relaxed text-[#000000]">
                                {t("landing.howItWorks.steps.step1.text")}
                            </p>
                        </div>

                        {/* Шаг 2 */}
                        <div className="rounded-[28px] bg-white px-5 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.06)] border border-[#D9E2F2]">
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F9F2]">
                                <Users className="h-5 w-5 text-[#1F98FA]" />
                            </div>
                            <h3 className="mb-2 font-display text-[16px] text-[#1F98FA]">
                                {t("landing.howItWorks.steps.step2.title")}
                            </h3>
                            <p className="text-[14px] leading-relaxed text-[#000000]">
                                {t("landing.howItWorks.steps.step2.text")}
                            </p>
                        </div>

                        {/* Шаг 3 */}
                        <div className="rounded-[28px] bg-white px-5 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.06)] border border-[#D9E2F2]">
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFEAF5]">
                                <CalendarDays className="h-5 w-5 text-[#1F98FA]" />
                            </div>
                            <h3 className="mb-2 font-display text-[16px] text-[#1F98FA]">
                                {t("landing.howItWorks.steps.step3.title")}
                            </h3>
                            <p className="text-[14px] leading-relaxed text-[#000000]">
                                {t("landing.howItWorks.steps.step3.text")}
                            </p>
                        </div>

                        {/* Шаг 4 */}
                        <div className="rounded-[28px] bg-white px-5 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.06)] border border-[#D9E2F2]">
                            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4E6]">
                                <MessageCircle className="h-5 w-5 text-[#1F98FA]" />
                            </div>
                            <h3 className="mb-2 font-display text-[16px] text-[#1F98FA]">
                                {t("landing.howItWorks.steps.step4.title")}
                            </h3>
                            <p className="text-[14px] leading-relaxed text-[#000000]">
                                {t("landing.howItWorks.steps.step4.text")}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <a
                            href="/psychologists"
                            className="inline-flex items-center justify-center rounded-full bg-[#1F98FA] px-8 py-3 text-[14px] font-semibold text-white shadow-[0_14px_30px_rgba(31,152,250,0.55)] hover:bg-[#0f84e2] transition"
                        >
                            {t("landing.howItWorks.cta")}
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== ТОЛЬКО ПРОВЕРЕННЫЕ ===== */}
            <section className="py-12 md:py-16">
                <div className="mx-auto max-w-[1440px] px-4 lg:px-[72px]">
                    <div className="mb-8 md:mb-10 text-center md:text-left">
                        <h2 className="font-heading text-[26px] md:text-[32px] font-display text-[#1F98FA] leading-tight">
                            {t("landing.verified.title")}
                        </h2>

                        <p className="mt-3 max-w-[520px] text-[18px] text-[#000000] mx-auto md:mx-0">
                            {t("landing.verified.text")}
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <div className="flex items-center">
                            {experts.map((avatar, index) => (
                                <div
                                    key={index}
                                    className={`relative h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-white bg-[#F3F7FF] shadow-[0_16px_32px_rgba(15,23,42,0.35)] overflow-hidden ${index !== 0 ? "-ml-6 md:-ml-8" : ""
                                        }`}
                                >
                                    <img
                                        src={avatar}
                                        alt="Психолог Yordam"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}

                            <div className="-ml-6 md:-ml-8 flex h-28 w-28 md:h-32 md:w-32 items-center justify-center rounded-full border-4 border-white bg-[#E1F5FF] text-[16px] md:text-[18px] font-semibold text-[#1F98FA] shadow-[0_16px_32px_rgba(15,23,42,0.35)]">
                                99+
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <a
                            href="/psychologists"
                            className="inline-flex items-center justify-center rounded-full bg-[#1F98FA] px-8 py-3 text-[14px] font-semibold text-white shadow-[0_14px_30px_rgba(31,152,250,0.55)] hover:bg-[#0f84e2] transition"
                        >
                            {t("landing.verified.button")}
                        </a>
                    </div>
                </div>
            </section>

            <FAQSection />
        </MainLayout>
    );
}

export default LandingPage;
