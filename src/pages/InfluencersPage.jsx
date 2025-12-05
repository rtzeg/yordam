// src/pages/InfluencersPage.jsx
import { MainLayout } from "../components/layout/MainLayout";
import supportImage from "../assets/images/5.svg";

export default function InfluencersPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Influencer form submitted");
  };

  return (
    <MainLayout>
      <main className="bg-skySoft">
        <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-[72px] lg:py-16">
          {/* ХЕДЕР СТРАНИЦЫ */}
          <section className="mb-10 lg:mb-14">
            <div className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F98FA] shadow-sm">
              Партнёрство с Yordam
            </div>

            <h1 className="font-display text-[32px] md:text-[40px] font-bold text-[#1F98FA]">
              Инфлюенсерам и авторам контента
            </h1>

            <p className="mt-3 max-w-[640px] text-[14px] leading-relaxed text-[#6D7685]">
              Если у вас есть аудитория и вы разделяете ценность психологической
              помощи, мы готовы обсудить партнёрство: спецпроекты, интеграции,
              промокоды для вашей аудитории и многое другое.
            </p>
          </section>

          {/* ФОРМАТЫ / ПРЕИМУЩЕСТВА */}
          <section className="mb-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                Зачем это вам
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                • Дополнительный доход через партнёрскую программу. <br />
                • Ценный и полезный оффер для аудитории. <br />
                • Совместные проекты, эфиры и спецконтент.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                Форматы сотрудничества
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                • Интеграции в видео, сторис и посты. <br />
                • Персональные промокоды. <br />
                • Марафоны, челленджи, спецпроекты.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                Кому подходит
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                • Блогерам и лидерам мнений. <br />
                • Авторам в темах психологии, саморазвития, спорта, обучения,
                лайфстайла. <br />
                • Тем, кто ценит ментальное здоровье.
              </p>
            </div>
          </section>

          {/* ФОРМА + ДОНАТ */}
          <section className="mb-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            {/* Форма */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-[18px] font-display text-[#1F98FA]">
                Оставьте заявку на сотрудничество
              </h2>
              <p className="mt-2 text-[13px] text-[#6D7685]">
                Расскажите о себе и своей аудитории — мы свяжемся с вами и
                предложим формат работы.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    Как к вам обращаться
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Имя или псевдоним"
                    className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                      Контакт для связи
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="E-mail, Telegram или Instagram"
                      className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                      Площадка
                    </label>
                    <input
                      type="text"
                      placeholder="YouTube, Instagram, TikTok и т.д."
                      className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    Примерный размер аудитории
                  </label>
                  <input
                    type="text"
                    placeholder="Например: 50 000 подписчиков"
                    className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    Идея или формат сотрудничества
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Опишите ваши ожидания и формат интеграции."
                    className="w-full resize-none rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] hover:bg-[#0f84e2] transition"
                >
                  Отправить заявку
                </button>
              </form>
            </div>

            {/* Донат / поддержка */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl bg-[#071A34] p-6 text-white">
              {/* КАРТИНКА */}
              <div className="flex flex-col items-center text-center gap-4">


                <div className="flex flex-col justify-between">
                  <h2 className="font-heading text-[18px] font-semibold">
                    Поддержать развитие сервиса
                  </h2>
                  <p className="mt-2 text-[13px] text-[#E2ECFF]">
                    Если вам близка идея заботы о ментальном здоровье,
                    вы можете поддержать развитие Yordam. Ваша помощь
                    помогает нам развивать платформу и создавать новые
                    форматы поддержки.
                  </p>
                  <img
                    src={supportImage}
                    alt="Тёплая поддерживающая иллюстрация"
                    className="max-h-[300px] w-[400px]"
                  />
                </div>
              </div>

              {/* КНОПКА + МЕЛКИЙ ТЕКСТ */}
              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#1F98FA] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#3AA9FF] transition"
                  onClick={() => {
                    window.open("https://example.com/donate", "_blank");
                  }}
                >
                  Поддержать сервис
                </button>

                <p className="text-[11px] text-[#A9B8D8]">
                  По вопросам партнёрства можно написать на{" "}
                  <span className="font-semibold">partner@yordam.uz</span> или в Telegram.
                </p>
              </div>
            </div>
          </section>

          {/* Нижний блок */}
          <section className="mt-6 rounded-2xl border border-[#D7E0ED] bg-white/80 p-5 text-[12px] text-[#6D7685]">
            <p>
              Мы аккуратно подбираем партнёров и форматы интеграций. Важнее
              всего — сохранить доверие пользователей и качество сервиса.
            </p>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
