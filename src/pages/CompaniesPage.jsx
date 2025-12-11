import { MainLayout } from "../components/layout/MainLayout";
import supportImage from "../assets/images/4.svg";
import { useTranslation } from "react-i18next";

export default function CompaniesPage() {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // сюда потом воткнёте отправку на бэкенд / CRM
    console.log("Company request submitted");
  };

  const segments = [
    {
      key: "it",
      title: t("companies.segments.it.title"),
      desc: t("companies.segments.it.desc"),
    },
    {
      key: "office",
      title: t("companies.segments.office.title"),
      desc: t("companies.segments.office.desc"),
    },
    {
      key: "education",
      title: t("companies.segments.education.title"),
      desc: t("companies.segments.education.desc"),
    },
    {
      key: "esports",
      title: t("companies.segments.esports.title"),
      desc: t("companies.segments.esports.desc"),
    },
    {
      key: "productivity",
      title: t("companies.segments.productivity.title"),
      desc: t("companies.segments.productivity.desc"),
    },
    {
      key: "custom",
      title: t("companies.segments.custom.title"),
      desc: t("companies.segments.custom.desc"),
    },
  ];

  return (
    <MainLayout>
      <main className="bg-skySoft">
        <div className="mx-auto max-w-[1640px] px-4 py-10 lg:px-[72px] lg:py-16">
          {/* Хедер блока */}
          <section className="mb-10 lg:mb-14">
            <div className="inline-flex items-center rounded-full bg-[#1F98FA] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#FFF] shadow-sm">
              {t("companies.badge")}
            </div>

            <h1 className="mt-4 text-[26px] font-display text-[#1F98FA] leading-tight lg:text-[34px]">
              {t("companies.title")}
            </h1>

            <p className="mt-3 max-w-[720px] text-[14px] leading-relaxed text-[#6D7685]">
              {t("companies.intro")}
            </p>
          </section>

          {/* Блок про условия для компаний */}
          <section className="mb-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                {t("companies.blocks.serviceForCompanies.title")}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                {t("companies.blocks.serviceForCompanies.desc")}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                {t("companies.blocks.ownPsychologists.title")}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                {t("companies.blocks.ownPsychologists.desc")}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                {t("companies.blocks.discounts.title")}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                {t("companies.blocks.discounts.desc")}
              </p>
            </div>
          </section>

          {/* Карточки направлений */}
          <section className="mb-10">
            <h2 className="mb-4 text-[24px] font-display text-[#1F98FA]">
              {t("companies.formatsTitle")}
            </h2>
            <p className="mb-6 max-w-[720px] text-[13px] text-[#6D7685]">
              {t("companies.formatsIntro")}
            </p>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {segments.map((item) => (
                <div
                  key={item.key}
                  className="flex flex-col rounded-2xl bg-white p-5 shadow-sm"
                >
                  <h3 className="text-[15px] font-display text-[#1F98FA]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Форма заявки от компаний */}
          <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-[18px] font-display text-[#1F98FA]">
                {t("companies.form.title")}
              </h2>
              <p className="mt-2 text-[13px] text-[#6D7685]">
                {t("companies.form.subtitle")}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    {t("companies.form.companyNameLabel")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("companies.form.companyNamePlaceholder")}
                    className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                      {t("companies.form.contactPersonLabel")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t(
                        "companies.form.contactPersonPlaceholder"
                      )}
                      className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                      {t("companies.form.contactLabel")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("companies.form.contactPlaceholder")}
                      className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    {t("companies.form.sessionsLabel")}
                  </label>
                  <input
                    type="text"
                    placeholder={t(
                      "companies.form.sessionsPlaceholder"
                    )}
                    className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    {t("companies.form.requestLabel")}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={t(
                      "companies.form.requestPlaceholder"
                    )}
                    className="w-full resize-none rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] hover:bg-[#0f84e2] transition"
                >
                  {t("companies.form.submit")}
                </button>
              </form>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-2xl bg-[#071A34] p-6 text-white">
              <div>
                <h2 className="text-[18px] font-semibold">
                  {t("companies.aside.title")}
                </h2>
                <p className="mt-2 text-[13px] text-[#E2ECFF]">
                  {t("companies.aside.text")}
                </p>
                <img
                  src={supportImage}
                  alt="Поддержка команды"
                  className="max-h-[300px] w-[400px] mx-auto  "
                />
              </div>

              <p className="text-[11px] text-[#A9B8D8]">
                {t("companies.aside.note")}
              </p>
            </div>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
