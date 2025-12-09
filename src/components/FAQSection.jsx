// src/components/FAQSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import roundFaq from "../assets/images/roundfaq.png";

export function FAQSection() {
  const { t } = useTranslation();

  // t(..., { returnObjects: true }) чтобы получить массив объектов из i18n
  const faqs = t("faqSection.items", { returnObjects: true }) || [];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="mx-auto max-w-[1296px] px-4 lg:px-0 py-16">
      {/* Заголовок с картинкой-овалом */}
      <div className="relative inline-block mb-10">
        <img
          src={roundFaq}
          alt=""
          className="pointer-events-none select-none absolute -top-4 left-[85px] h-[72px] w-auto"
        />

        <span className="font-display text-[32px] md:text-[40px] font-bold text-[#1F98FA]">
          {t("faqSection.title.part1")}{" "}
        </span>
        <span className="font-display text-[32px] md:text-[40px] font-bold text-[#000000] relative z-10">
          {t("faqSection.title.part2")}
        </span>
      </div>

      {/* Сетка вопросов */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="relative">
              {/* Светящаяся подложка позади активной карточки */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-r from-[#1F98FA] via-[#4CC3FF] to-[#1F98FA] blur-[26px]"
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35 }}
              />

              {/* Карточка */}
              <motion.div
                layout
                className={`relative overflow-hidden rounded-[20px] border bg-white transition-colors ${isOpen
                    ? "border-transparent shadow-[0_0_40px_rgba(31,152,250,0.16)]"
                    : "border-[#E4EDF5] shadow-sm"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-[16px] md:text-[18px] font-semibold text-[#071A34]">
                    {faq.question}
                  </span>

                  <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#D0D9E5]">
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-[#071A34]" />
                    ) : (
                      <Plus className="h-4 w-4 text-[#071A34]" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { height: "auto", opacity: 1 },
                        collapsed: { height: 0, opacity: 0 },
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="px-6 pb-6 text-[14px] leading-relaxed text-[#4A6277]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQSection;
