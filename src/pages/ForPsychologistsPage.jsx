// src/pages/ForPsychologistsPage.jsx
import { useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import psyHero from "../assets/images/psy.png";
import {
    GraduationCap,
    BookOpenCheck,
    BriefcaseBusiness,
    Laptop2,
    ShieldCheck,
    Scale,
} from "lucide-react";

export default function ForPsychologistsPage() {
    // Калькулятор нагрузки
    const [sessionsPerDay, setSessionsPerDay] = useState(3);
    const [daysPerWeek, setDaysPerWeek] = useState(4);

    // Аккордеон "вы занимаетесь психотерапией..."
    const [benefitOpenIndex, setBenefitOpenIndex] = useState(null);

    const pricePerSession = 200000; // примерная цена за сессию, сум

    const weeklyIncome = sessionsPerDay * daysPerWeek * pricePerSession;
    const monthlyIncome = weeklyIncome * 4; // условный месяц
    const yearlyIncome = weeklyIncome * 52; // 52 недели в году

    const formatMoney = (value) => value.toLocaleString("ru-RU") + " сум";

    const stats = [
        {
            label: "Психологов в команде",
            value: "100+",
            note: "присоединились к платформе",
        },
        {
            label: "Удержание специалистов",
            value: "70%",
            note: "остаются с нами дольше года",
        },
        {
            label: "Клиенты находят «своего»",
            value: "9 из 10",
            note: "по отзывам и повторным сессиям",
        },
        {
            label: "Проведённых сессий",
            value: "1 000+",
            note: "на нашей платформе",
        },
        {
            label: "Мы в рынке",
            value: "с 2025 года",
            note: "развиваем доступную психологическую помощь",
        },
    ];

    const benefits = [
        {
            title: "Не думаете о том, где брать клиентов — мы приводим трафик",
            text: "Мы берём на себя маркетинг и поток заявок: платформа помогает клиентам находить именно вас по запросу, опыту и специализации.",
        },
        {
            title:
                "Берём на себя организацию и технику: записи, напоминания, оплата",
            text: "Система записей, напоминаний и онлайн-оплаты работает через Yordam. Вам не нужно держать всё в голове и в блокнотах.",
        },
        {
            title: "Консультируете из любой точки мира в удобном формате",
            text: "Вы сами выбираете формат: видео, аудио или чат. Главное — стабильный интернет и комфортный вам график.",
        },
        {
            title: "Помогаем развивать личный бренд и профиль специалиста",
            text: "Помогаем оформить профиль, собрать отзывы и аккуратно развивать ваш профессиональный бренд без агрессивного маркетинга.",
        },
        {
            title: "Работаете в те дни и часы, которые подходят именно вам",
            text: "Вы сами задаёте расписание и количество сессий. Платформа подстраивается под ваш ресурс, а не наоборот.",
        },
        {
            title:
                "Поддерживаем, чтобы вы меньше выгорали и не оставались одни с нагрузкой",
            text: "Команда сопровождения и коллеги по платформе — это пространство, где можно обсудить рабочие сложности и не тащить всё в одиночку.",
        },
    ];

    const requirements = [
        {
            title: "Образование",
            icon: GraduationCap,
            text: "Высшее психологическое образование (бакалавриат, магистратура, специалитет) или диплом о профессиональной переподготовке по психологии.",
        },
        {
            title: "Дополнительное обучение",
            icon: BookOpenCheck,
            text: "Завершённая программа обучения одному из психологических подходов (например, КПТ, гештальт-терапия, психоанализ и др.).",
        },
        {
            title: "Практический опыт",
            icon: BriefcaseBusiness,
            text: "Опыт проведения психологических консультаций от 2 лет: онлайн или офлайн, в частной практике или в организации.",
        },
        {
            title: "Технические требования",
            icon: Laptop2,
            text: "Компьютер или телефон с рабочей камерой и микрофоном, стабильный интернет для проведения онлайн-сессий.",
        },
        {
            title: "Этические нормы",
            icon: ShieldCheck,
            text: "Строгое соблюдение профессиональной этики, конфиденциальности и уважительного отношения к каждому клиенту.",
        },
        {
            title: "Юридический статус",
            icon: Scale,
            text: "Наличие статуса индивидуального предпринимателя или юридического лица в Республике Узбекистан либо готовность его оформить.",
        },
    ];

    const toggleBenefit = (index) => {
        setBenefitOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <MainLayout>
            <main className="bg-skySoft">
                <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 lg:px-[72px] lg:pt-12">
                    {/* HERO */}
                    <section className="mb-14 flex flex-col items-center gap-10 lg:flex-row lg:items-stretch">
                        <div className="flex-1">
                            <div className="inline-flex items-center rounded-full bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F98FA] shadow-sm">
                                удалённая работа для психологов
                            </div>

                            <h1 className="font-heading mt-4 text-[28px] font-bold leading-tight font-display text-[#1F98FA] lg:text-[38px]">
                                Платформа для
                                <br />
                                практикующих психологов
                            </h1>

                            <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed text-[#6D7685]">
                                Мы берём на себя клиента, организацию и технологии, а вы
                                занимаетесь тем, что умеете лучше всего: поддержкой людей.
                                Прозрачные условия, удобный онлайн-сервис и команда, с которой
                                можно советоваться.
                            </p>

                            <button
                                type="button"
                                className="mt-7 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#1F98FA] to-[#3AA9FF] px-8 py-3 text-[14px] font-semibold text-white shadow-[0_14px_30px_rgba(31,152,250,0.45)] transition hover:brightness-110"
                            >
                                Начать сотрудничество
                            </button>
                        </div>

                        <div className="flex flex-1 items-center justify-center">
                            <div className="relative h-[260px] w-[260px] rounded-[40px] bg-gradient-to-br from-[#C3E6FF] via-[#F5E3FF] to-[#FFE8C6] shadow-[0_24px_60px_rgba(31,152,250,0.25)] lg:h-[320px] lg:w-[320px]">
                                <div className="absolute inset-6 rounded-[32px] bg-white/40 backdrop-blur-sm" />
                                <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-[13px] text-[#4A5B78]">
                                    <div className="flex flex-1 items-center justify-center">
                                        <div className="relative h-[260px] w-[260px] lg:h-[320px] lg:w-[320px]">
                                            <img
                                                src={psyHero}
                                                alt="Психолог с чашкой кофе"
                                                className="h-full w-full object-contain drop-shadow-[0_24px_60px_rgba(31,152,250,0.25)]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* СТАТИСТИКА */}
                    <section className="mb-14 grid gap-4 rounded-[28px] bg-white/80 p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
                        {stats.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl px-3 py-3 transition hover:bg-[#F3F7FF]"
                            >
                                <div className="font-heading text-[16px] font-display text-[#1F98FA]">
                                    {item.value}
                                </div>
                                <div className="mt-1 text-[12px] text-[#071A34]">
                                    {item.label}
                                </div>
                                <div className="mt-1 text-[11px] text-[#9BA6B5]">
                                    {item.note}
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* ВЫ ЗАНИМАЕТЕСЬ ПСИХОТЕРАПИЕЙ, МЫ — ОРГАНИЗАЦИЕЙ (АККОРДЕОН) */}
                    <section className="mb-14 rounded-[32px] bg-[#F4F7FF] px-5 py-8 lg:px-8 lg:py-10">
                        <h2 className="font-heading text-[22px] font-display text-[#1F98FA] lg:text-[26px]">
                            Вы занимаетесь психотерапией, мы — организацией
                        </h2>

                        <p className="mt-3 max-w-[640px] text-[13px] text-[#6D7685]">
                            Помогаем выстроить стабильный поток клиентов и рабочий режим,
                            в котором не приходится выбирать между доходом и своим ресурсом.
                        </p>

                        <div className="mt-7 grid gap-4 lg:grid-cols-2">
                            {benefits.map((item, index) => {
                                const isOpen = benefitOpenIndex === index;

                                return (
                                    <button
                                        key={item.title}
                                        type="button"
                                        onClick={() => toggleBenefit(index)}
                                        className="flex flex-col gap-2 rounded-2xl bg-white px-4 py-3 text-left shadow-sm transition hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-[13px] font-display text-[#1F98FA]">
                                                {item.title}
                                            </span>
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1F98FA] text-[18px] font-semibold text-white">
                                                {isOpen ? "−" : "+"}
                                            </span>
                                        </div>

                                        <div
                                            className={`text-[12px] text-[#6D7685] transition-[max-height,opacity] duration-200 ${isOpen
                                                    ? "max-h-40 opacity-100"
                                                    : "max-h-0 overflow-hidden opacity-0"
                                                }`}
                                        >
                                            {item.text}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            className="mt-7 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#1F98FA] to-[#3AA9FF] px-7 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] transition hover:brightness-110"
                        >
                            Начать сотрудничество
                        </button>
                    </section>
                    {/* КАЛЬКУЛЯТОР ДОХОДА */}
                    <section className="mb-10">
                        <h2 className="font-heading text-[22px] font-display text-[#1F98FA] lg:text-[26px]">
                            Сколько вы можете зарабатывать с Yordam
                        </h2>
                        <p className="mt-2 text-[12px] text-[#9BA6B5]">
                            Примерный расчёт. Реальный доход зависит от количества
                            проведённых сессий и выбранного тарифа.
                        </p>

                        <div className="mt-6 flex flex-col gap-6 rounded-[28px] border border-[#E3ECF7] bg-white p-5 lg:flex-row lg:p-7">
                            {/* Слайдеры */}
                            <div className="flex-1 space-y-6">
                                <div>
                                    <div className="mb-1 text-[13px] font-display text-[#1F98FA]">
                                        Сессий в день
                                    </div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={8}
                                        value={sessionsPerDay}
                                        onChange={(e) =>
                                            setSessionsPerDay(Number(e.target.value))
                                        }
                                        className="w-full accent-[#1F98FA]"
                                    />
                                    <div className="mt-1 text-[12px] text-[#6D7685]">
                                        {sessionsPerDay} сессий
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-1 text-[13px] font-display text-[#1F98FA]">
                                        Дней в неделю
                                    </div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={7}
                                        value={daysPerWeek}
                                        onChange={(e) =>
                                            setDaysPerWeek(Number(e.target.value))
                                        }
                                        className="w-full accent-[#1F98FA]"
                                    />
                                    <div className="mt-1 text-[12px] text-[#6D7685]">
                                        {daysPerWeek} дн. в неделю
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-[#F4F7FF] px-4 py-3 text-[12px] text-[#6D7685]">
                                    В расчёте использована ориентировочная стоимость{" "}
                                    <span className="font-semibold">
                                        {formatMoney(pricePerSession)} за сессию
                                    </span>
                                    . Точные цифры зависят от формата работы и выбранного тарифа.
                                </div>
                            </div>

                            {/* Результат */}
                            <div className="flex w-full flex-col justify-between rounded-[24px] bg-[#1F98FA] px-5 py-5 text-white lg:max-w-[280px]">
                                <div>
                                    <div className="text-[13px] font-display uppercase tracking-wide text-white/80">
                                        Примерный доход
                                    </div>

                                    <div className="mt-3">
                                        <div className="text-[12px] text-white/80">в месяц</div>
                                        <div className="font-heading text-[24px] font-bold">
                                            {formatMoney(monthlyIncome)}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="text-[12px] text-white/80">в год</div>
                                        <div className="font-heading text-[20px] font-semibold">
                                            {formatMoney(yearlyIncome)}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 text-[11px] text-white/80">
                                    Это ориентировочные значения при выбранной нагрузке. Мы
                                    помогаем удерживать стабильный поток клиентов, чтобы вы могли
                                    планировать доход и отдых.
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* ТРЕБОВАНИЯ К СПЕЦИАЛИСТАМ */}
                    <section className="mb-14 rounded-[32px] bg-gradient-to-br from-[#E2F3FF] via-[#F4F7FF] to-[#FFEFF5] px-5 py-8 lg:px-8 lg:py-10">
                        <h2 className="font-heading text-[22px] font-display text-[#071A34] lg:text-[26px]">
                            Требования к специалистам
                        </h2>

                        <p className="mt-3 max-w-[640px] text-[13px] text-[#6D7685]">
                            Мы работаем с практикующими психологами, которые разделяют наши
                            ценности, бережно относятся к клиентам и готовы развиваться в
                            онлайн-формате.
                        </p>

                        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {requirements.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className="flex flex-col rounded-3xl bg-white/90 p-4 shadow-sm backdrop-blur-sm transition hover:-translate-y-[2px] hover:shadow-md"
                                    >
                                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E5F3FF] text-[#1F98FA]">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-[14px] font-semibold text-[#071A34]">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-[12px] leading-relaxed text-[#6D7685]">
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>


                </div>
            </main>
        </MainLayout>
    );
}
