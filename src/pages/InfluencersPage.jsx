// src/pages/InfluencersPage.jsx
import { MainLayout } from "../components/layout/MainLayout";
import supportImage from "../assets/images/5.svg";
import { useTranslation } from "react-i18next";

export default function InfluencersPage() {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Influencer form submitted");
  };

  return (
    <MainLayout>
      <main className="bg-skySoft">
        <div className="mx-auto max-w-[1640px] px-4 py-10 lg:px-[72px] lg:py-16">
          {/* ХЕДЕР СТРАНИЦЫ */}
          <section className="mb-10 lg:mb-14">
            <div className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F98FA] shadow-sm">
              {t("influencersPage.hero.badge")}
            </div>

            <h1 className="font-display text-[32px] md:text-[40px] font-bold text-[#1F98FA]">
              {t("influencersPage.hero.title")}
            </h1>

            <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[#6D7685]">
              {t("influencersPage.hero.text")}
            </p>
          </section>

          {/* ФОРМАТЫ / ПРЕИМУЩЕСТВА */}
          <section className="mb-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                {t("influencersPage.blocks.why.title")}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                {t("influencersPage.blocks.why.text")}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                {t("influencersPage.blocks.formats.title")}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                {t("influencersPage.blocks.formats.text")}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                {t("influencersPage.blocks.who.title")}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                {t("influencersPage.blocks.who.text")}
              </p>
            </div>
          </section>

          {/* ФОРМА + ПОДДЕРЖКА */}
          <section className="mb-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            {/* Форма */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-[18px] font-display text-[#1F98FA]">
                {t("influencersPage.form.title")}
              </h2>
              <p className="mt-2 text-[13px] text-[#6D7685]">
                {t("influencersPage.form.subtitle")}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    {t("influencersPage.form.fields.name.label")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("influencersPage.form.fields.name.placeholder")}
                    className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                      {t("influencersPage.form.fields.contact.label")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t(
                        "influencersPage.form.fields.contact.placeholder"
                      )}
                      className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                      {t("influencersPage.form.fields.platform.label")}
                    </label>
                    <input
                      type="text"
                      placeholder={t(
                        "influencersPage.form.fields.platform.placeholder"
                      )}
                      className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    {t("influencersPage.form.fields.audienceSize.label")}
                  </label>
                  <input
                    type="text"
                    placeholder={t(
                      "influencersPage.form.fields.audienceSize.placeholder"
                    )}
                    className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    {t("influencersPage.form.fields.idea.label")}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={t(
                      "influencersPage.form.fields.idea.placeholder"
                    )}
                    className="w-full resize-none rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] hover:bg-[#0f84e2] transition"
                >
                  {t("influencersPage.form.submit")}
                </button>
              </form>
            </div>

            {/* Блок поддержки */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl bg-[#071A34] p-6 text-white">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex flex-col justify-between">
                  <h2 className="font-heading text-[18px] font-semibold">
                    {t("influencersPage.support.title")}
                  </h2>
                  <p className="mt-2 text-[13px] text-[#E2ECFF]">
                    {t("influencersPage.support.text")}
                  </p>
                  <img
                    src={supportImage}
                    alt={t("influencersPage.support.imageAlt")}
                    className="max-h-[300px] w-[400px]"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#1F98FA] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#3AA9FF] transition"
                  onClick={() => {
                    window.open("https://example.com/donate", "_blank");
                  }}
                >
                  {t("influencersPage.support.button")}
                </button>

                <p className="text-[11px] text-[#A9B8D8]">
                  {t("influencersPage.support.footerText")}
                </p>
              </div>
            </div>
          </section>

          {/* Нижний блок */}
          <section className="mt-6 rounded-2xl border border-[#D7E0ED] bg-white/80 p-5 text-[12px] text-[#6D7685]">
            <p>{t("influencersPage.bottomNote")}</p>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
