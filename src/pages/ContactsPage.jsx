import { MainLayout } from "../components/layout/MainLayout";
import contactsImage from "../assets/images/6.svg"; 
import { useTranslation } from "react-i18next";

export default function ContactsPage() {
    const { t } = useTranslation();

    return (
        <MainLayout>
            <main className="bg-skySoft">
                <div className="mx-auto max-w-[1920px] px-4 py-10 lg:px-[72px] lg:py-16">
                    {/* ХЕДЕР СТРАНИЦЫ */}
                    <section className="mb-10 lg:mb-14">
                        <div className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F98FA] shadow-sm">
                            {t("contactsPage.hero.badge")}
                        </div>

                        <h1 className="font-display text-[32px] md:text-[40px] font-bold text-[#1F98FA]">
                            {t("contactsPage.hero.title")}
                        </h1>

                        <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[#6D7685]">
                            {t("contactsPage.hero.text")}
                        </p>
                    </section>

                    {/* ОСНОВНОЙ БЛОК: КОНТАКТЫ + КАРТИНКА */}
                    <section className="mb-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
                        {/* ЛЕВАЯ КОЛОНКА: КОНТАКТЫ */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="text-[18px] font-display text-[#1F98FA]">
                                {t("contactsPage.main.title")}
                            </h2>

                            <div className="mt-4 space-y-5 text-[14px] text-[#071A34]">
                                {/* Телефон */}
                                <div>
                                    <div className="text-[12px] uppercase tracking-wide text-[#9BA6B5]">
                                        {t("contactsPage.main.phone.label")}
                                    </div>
                                    <div className="mt-1">
                                        <a
                                            href="tel:+998900000000"
                                            className="text-[#1F98FA] hover:underline"
                                        >
                                            {t("contactsPage.main.phone.number")}
                                        </a>
                                    </div>
                                    <div className="mt-1 text-[12px] text-[#6D7685]">
                                        {t("contactsPage.main.phone.note")}
                                    </div>
                                </div>

                                {/* Поддержка */}
                                <div>
                                    <div className="text-[12px] uppercase tracking-wide text-[#9BA6B5]">
                                        {t("contactsPage.main.support.label")}
                                    </div>
                                    <div className="mt-1">
                                        <a
                                            href="mailto:support@yordam.uz"
                                            className="text-[#1F98FA] hover:underline"
                                        >
                                            support@yordam.uz
                                        </a>
                                    </div>
                                    <div className="mt-1 text-[12px] text-[#6D7685]">
                                        {t("contactsPage.main.support.note")}
                                    </div>
                                </div>

                                {/* Партнёры */}
                                <div>
                                    <div className="text-[12px] uppercase tracking-wide text-[#9BA6B5]">
                                        {t("contactsPage.main.partners.label")}
                                    </div>
                                    <div className="mt-1">
                                        <a
                                            href="mailto:partner@yordam.uz"
                                            className="text-[#1F98FA] hover:underline"
                                        >
                                            partner@yordam.uz
                                        </a>
                                    </div>
                                    <div className="mt-1 text-[12px] text-[#6D7685]">
                                        {t("contactsPage.main.partners.note")}
                                    </div>
                                </div>

                                {/* Мессенджеры */}
                                <div>
                                    <div className="text-[12px] uppercase tracking-wide text-[#9BA6B5]">
                                        {t("contactsPage.main.messengers.label")}
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-3">
                                        <a
                                            href="https://t.me/yordam"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#1F98FA] hover:underline"
                                        >
                                            Telegram
                                        </a>
                                        <span className="text-[#D0D7E2]">•</span>
                                        <a
                                            href="https://wa.me/998900000000"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#1F98FA] hover:underline"
                                        >
                                            WhatsApp
                                        </a>
                                    </div>
                                    <div className="mt-1 text-[12px] text-[#6D7685]">
                                        {t("contactsPage.main.messengers.note")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ПРАВАЯ КОЛОНКА: КАРТИНКА */}
                        <div className="flex flex-col justify-between gap-4 rounded-2xl bg-[#071A34] p-6 text-white">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="flex flex-col justify-between">
                                    <h2 className="font-heading text-[18px] font-semibold">
                                        {t("contactsPage.sideCard.title")}
                                    </h2>
                                    <p className="mt-2 text-[13px] text-[#E2ECFF]">
                                        {t("contactsPage.sideCard.text")}
                                    </p>
                                    <img
                                        src={contactsImage}
                                        alt={t("contactsPage.sideCard.imageAlt")}
                                        className="max-h-[300px] w-[400px] mx-auto"
                                    />
                                </div>
                            </div>

                            <p className="mt-4 text-[11px] text-[#A9B8D8]">
                                {t("contactsPage.sideCard.bottomNote")}
                            </p>
                        </div>
                    </section>

                    {/* КАРТА */}
                    <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
                        <h2 className="text-[16px] font-display text-[#1F98FA]">
                            {t("contactsPage.map.title")}
                        </h2>
                        <p className="mt-1 text-[13px] text-[#6D7685]">
                            {t("contactsPage.map.subtitle")}
                        </p>

                        <div className="mt-4 h-[340px] w-full overflow-hidden rounded-2xl border border-[#D7E0ED]">
                            <iframe
                                title="Yordam location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.614390177048!2d66.944996!3d39.654140!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDM5JzE1LjAiTiA2NsKwNTYnNDIuMCJF!5e0!3m2!1sru!2suz!4v1700000000000"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="h-full w-full border-0"
                            />
                        </div>
                    </section>
                </div>
            </main>
        </MainLayout>
    );
}
