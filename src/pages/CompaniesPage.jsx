import { MainLayout } from "../components/layout/MainLayout";

export default function CompaniesPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // сюда потом воткнёте отправку на бэкенд / CRM
    console.log("Company request submitted");
  };

  const segments = [
    {
      title: "Психолог для IT-компании",
      desc: "Помогаем специалистам справляться с выгоранием, перегрузками и постоянными дедлайнами, поддерживая продуктивность и вовлечённость.",
    },
    {
      title: "Психолог для офиса",
      desc: "Снижение конфликтов, поддержка здорового климата и помощь сотрудникам в сложных личных ситуациях.",
    },
    {
      title: "Психолог для центра / учебного заведения",
      desc: "Поддержка преподавателей, студентов и сотрудников, работа с эмоциональной нагрузкой и стрессом.",
    },
    {
      title: "Психолог для киберспорта",
      desc: "Подготовка к турнирам, работа с волнением, концентрацией и командной динамикой.",
    },
    {
      title: "Психолог для продуктивности",
      desc: "Индивидуальные и групповые сессии, направленные на улучшение фокуса, планирования и эффективности работы.",
    },
    {
      title: "Индивидуальные решения",
      desc: "Поможем подобрать формат под специфику вашей компании и текущие задачи HR / руководства.",
    },
  ];

  return (
    <MainLayout>
      <main className="bg-skySoft">
        <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-[72px] lg:py-16">
          {/* Хедер блока */}
          <section className="mb-10 lg:mb-14">
            <div className="inline-flex items-center rounded-full bg-[#1F98FA] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#FFF] shadow-sm">
              Решения для бизнеса
            </div>

            <h1 className="mt-4 text-[26px] font-display text-[#1F98FA] leading-tight lg:text-[34px]">
              Корпоративный психолог для вашей компании
            </h1>

            <p className="mt-3 max-w-[720px] text-[14px] leading-relaxed text-[#6D7685]">
              Yordam помогает компаниям разных сфер — от IT до офлайн-центров —
              внедрять психологическую поддержку сотрудников. Это снижает
              выгорание, уменьшает текучку и повышает продуктивность команды.
            </p>
          </section>

          {/* Блок про условия для компаний */}
          <section className="mb-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                Сервис под компании
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                Мы заточены под задачи бизнеса: гибкие форматы сессий, единая
                отчётность, персональный менеджер и удобный подбор специалистов
                под вашу отрасль.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                Приведите своих психологов
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                Если у вас уже есть проверенные психологи, мы можем
                интегрировать их в платформу Yordam и дать вашей команде
                единое удобное пространство для записи и проведения сессий.
                Для компаний с собственным пулом специалистов действуют
                отдельные условия и скидки.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="text-[16px] font-display text-[#1F98FA]">
                Скидки при объёме
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6D7685]">
                Для компаний, которые берут от <strong>12 и более сессий в месяц</strong>,
                мы предлагаем пониженные тарифы и специальные корпоративные
                пакеты: индивидуальные, командные и групповые встречи.
              </p>
            </div>
          </section>

          {/* Карточки направлений */}
          <section className="mb-10">
            <h2 className="mb-4 text-[24px] font-display text-[#1F98FA]">
              Форматы корпоративного психолога
            </h2>
            <p className="mb-6 max-w-[720px] text-[1px] text-[#6D7685]">
              Подбираем специалистов с опытом работы именно в вашей сфере
              и выстраиваем понятный формат: индивидуальные консультации,
              регулярные дни «корпоративного психолога», онлайн-поддержка
              для удалённых команд.
            </p>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {segments.map((item) => (
                <div
                  key={item.title}
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
                Оставьте заявку на корпоративное сотрудничество
              </h2>
              <p className="mt-2 text-[13px] text-[#6D7685]">
                Расскажите коротко о компании и запросе — мы подготовим
                предложение и свяжемся с вами.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    Название компании
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ООО «Пример», IT-компания, сеть центров и т.д."
                    className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                      Контактное лицо
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Имя, роль (HR, руководитель и т.д.)"
                      className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                      Контакт для связи
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="E-mail или телефон / Telegram"
                      className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    Ориентировочное количество сессий в месяц
                  </label>
                  <input
                    type="text"
                    placeholder="Например: 12–20 индивидуальных + 2 групповые"
                    className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[13px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-display text-[#1F98FA]">
                    Запрос компании
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Кратко опишите задачи: поддержка команды, снижение выгорания, формат «коллективный психолог» и т.п."
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

            <div className="flex flex-col justify-between gap-4 rounded-2xl bg-[#071A34] p-6 text-white">
              <div>
                <h2 className="text-[18px] font-semibold">
                  Коллективный психолог для команды
                </h2>
                <p className="mt-2 text-[13px] text-[#E2ECFF]">
                  Мы помогаем компаниям выстраивать системную поддержку:
                  регулярные приёмы для сотрудников, дни открытых консультаций,
                  анонимные обращения и сопровождение HR-команды.
                </p>
              </div>

              <p className="text-[11px] text-[#A9B8D8]">
                Для крупных компаний и объёмов от 12 сессий в месяц действуют
                специальные корпоративные тарифы. Детали вы получите после
                обработки заявки.
              </p>
            </div>
          </section>
        </div>
      </main>
    </MainLayout>
  );
}
