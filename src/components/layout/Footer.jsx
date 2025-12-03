import cloud from "../../assets/images/cloud.png";
import chatBubble from "../../assets/images/chat_bubble.png";
import telegramIcon from "../../assets/images/telegram.svg";
import whatsappIcon from "../../assets/images/whatsup.svg";
import footerLogo from "../../assets/images/footerlogo.png";
// Если у тебя папка не images, а image — просто поправь пути выше

export function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-white to-[#E6F3FF]">
      <div className="mx-auto max-w-[1440px] px-4 pt-[72px] pb-[40px] lg:px-[72px]">
        {/* ======== ВЕРХНИЙ БЛОК: ВОПРОСЫ + ОБЛАКА ======== */}
        <section className="relative mx-auto flex max-w-[1076px] flex-col overflow-hidden rounded-[40px] bg-[#CFEFFF] px-8 py-8 md:flex-row md:items-center md:justify-between md:px-12 md:py-10">
          {/* Текст слева */}
          <div className="z-10 max-w-[420px]">
            <h2 className="font-display text-[24px] font-bold leading-tight text-[#052640] md:text-[28px]">
              У вас остались
              <br />
              вопросы по сервису?
            </h2>

            <p className="mt-3 text-[13px] leading-relaxed text-[#4A6277]">
              Мы готовы предоставить вам проверенного специалиста, с которым вы
              можете обсудить все ваши вопросы.
            </p>

            {/* Кнопки чата (как в макете) */}
            <div className="mt-7 flex flex-wrap items-center gap-6">
              {/* Чат с Yordam — просто синяя ссылка с иконкой */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#1F98FA]"
              >
                <img src={chatBubble} alt="" className="h-5 w-5" />
                <span>Чат с Yordam</span>
              </a>

              {/* Telegram — белый круг с синей иконкой */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full  shadow-[0_6px_16px_rgba(31,152,250,0.25)] hover:bg-white transition-colors"
                aria-label="Написать в Telegram"
              >
                <img src={telegramIcon} alt="" className="h-11 w-11" />
              </a>

              {/* WhatsApp — прозрачный круг с синей обводкой */}
              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full  bg-transparent hover:bg-white transition-colors"
                aria-label="Написать в WhatsApp"
              >
                <img src={whatsappIcon} alt="" className="h-11 w-11" />
              </a>
            </div>
          </div>

          {/* Облака справа */}
          <div className="pointer-events-none select-none md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
            <img
              src={cloud}
              alt=""
              className="mt-6 w-[260px] md:mt-0 md:w-[360px] lg:w-[420px]"
            />
          </div>
        </section>

        {/* ======== НИЖНИЙ БЛОК ФУТЕРА ======== */}
        <section className="mx-auto mt-[72px] max-w-[1295px]">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            {/* Лево: логотип + текст */}
            <div className="max-w-[260px]">
              <img src={footerLogo} alt="Yordam" className="h-8 w-auto" />
              <p className="mt-4 text-[13px] leading-relaxed text-[#4A6277]">
                Clarity gives you the blocks and components you need to create a
                truly professional website.
              </p>
            </div>

            {/* Центр: Company + Help */}
            <div className="flex gap-16">
              <div>
                <h3 className="text-[13px] font-semibold text-[#1A2841]">
                  Company
                </h3>
                <ul className="mt-3 space-y-2 text-[13px] text-[#4A6277]">
                  <li>About</li>
                  <li>Features</li>
                  <li>Works</li>
                  <li>Career</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[13px] font-semibold text-[#1A2841]">
                  Help
                </h3>
                <ul className="mt-3 space-y-2 text-[13px] text-[#4A6277]">
                  <li>Customer Support</li>
                  <li>Delivery Details</li>
                  <li>Terms &amp; Conditions</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>

            {/* Право: Newsletter */}
            <div className="max-w-[260px]">
              <h3 className="text-[13px] font-semibold text-[#1A2841]">
                Newsletter
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-full border border-[#E0E7F0] bg-white px-4 py-2 text-[13px] text-[#4A6277] outline-none placeholder:text-[#B0BDC9] focus:border-[#1F98FA]"
                />
                <button className="w-full rounded-full bg-[#1F98FA] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#0f84e2]">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Линия + копирайт */}
          <div className="mt-10 h-px bg-[#E2EDF7]" />
          <div className="mt-4 text-center text-[12px] text-[#697586]">
            © Copyright 2025, All Rights Reserved by Yordam
          </div>
        </section>
      </div>
    </footer>
  );
}
