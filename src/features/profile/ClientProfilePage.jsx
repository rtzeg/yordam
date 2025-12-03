import { useState } from "react";

export default function ClientProfilePage() {
    const [birthDate, setBirthDate] = useState("");
    const [about, setAbout] = useState("");
    const [goal, setGoal] = useState("therapy");
    const [mainConcern, setMainConcern] = useState("");
    const [topics, setTopics] = useState(["relationships"]);
    const [visitedBefore, setVisitedBefore] = useState("no");

    const toggleTopic = (value) => {
        setTopics((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            birthDate,
            about,
            goal,
            mainConcern,
            topics,
            visitedBefore,
        };
        console.log("ClientProfilePage submit:", payload);
    };

    const topicOptions = [
        { value: "relationships", label: "Отношения" },
        { value: "self-esteem", label: "Самооценка" },
        { value: "anxiety", label: "Тревога" },
        { value: "burnout", label: "Выгорание" },
        { value: "career", label: "Карьера / учёба" },
        { value: "other", label: "Другое" },
    ];

    return (
        <div className="rounded-3xl bg-white px-8 py-8 shadow-[0_24px_60px_rgba(2,45,98,0.08)]">
            <h2 className="mb-2 text-2xl font-display text-[#071A34]">Личные вопросы</h2>
            <p className="mb-6 text-sm text-slate-500">
                Эти ответы помогут подобрать психолога и подготовиться к первой сессии.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Дата рождения */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Дата рождения
                    </label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-sky-100 focus:bg-white focus:ring-2"
                    />
                </div>

                {/* О себе */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Расскажите о себе
                    </label>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Небольшой автопортрет..."
                        rows={5}
                        className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-sky-100 focus:bg-white focus:ring-2"
                    />
                </div>

                {/* Цель обращения */}
                <section>
                    <h3 className="mb-2 text-sm font-semibold text-slate-800">
                        С какой целью вы обратились к нам?
                    </h3>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                            <input
                                type="radio"
                                name="goal"
                                value="therapy"
                                checked={goal === "therapy"}
                                onChange={() => setGoal("therapy")}
                                className="h-4 w-4 accent-[#1F98FA]"
                            />
                            Регулярная терапия
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                            <input
                                type="radio"
                                name="goal"
                                value="single"
                                checked={goal === "single"}
                                onChange={() => setGoal("single")}
                                className="h-4 w-4 accent-[#1F98FA]"
                            />
                            Разовая консультация
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                            <input
                                type="radio"
                                name="goal"
                                value="diagnostic"
                                checked={goal === "diagnostic"}
                                onChange={() => setGoal("diagnostic")}
                                className="h-4 w-4 accent-[#1F98FA]"
                            />
                            Диагностика / второе мнение
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                            <input
                                type="radio"
                                name="goal"
                                value="other"
                                checked={goal === "other"}
                                onChange={() => setGoal("other")}
                                className="h-4 w-4 accent-[#1F98FA]"
                            />
                            Другое
                        </label>
                    </div>
                </section>

                {/* Что беспокоит */}
                <div>
                    <h3 className="mb-1 text-sm font-semibold text-slate-800">
                        Что вас сейчас больше всего беспокоит?
                    </h3>
                    <p className="mb-2 text-xs text-slate-500">
                        Постоянная тревога, сложности в отношениях, потеря мотивации и т.д.
                    </p>
                    <textarea
                        value={mainConcern}
                        onChange={(e) => setMainConcern(e.target.value)}
                        rows={4}
                        className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-sky-100 focus:bg-white focus:ring-2"
                    />
                </div>

                {/* Темы */}
                <section>
                    <h3 className="mb-1 text-sm font-semibold text-slate-800">
                        Темы, которые хотите обсудить
                    </h3>
                    <p className="mb-2 text-xs text-slate-500">
                        Можно выбрать несколько вариантов
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                        {topicOptions.map((topic) => {
                            const checked = topics.includes(topic.value);
                            return (
                                <button
                                    key={topic.value}
                                    type="button"
                                    onClick={() => toggleTopic(topic.value)}
                                    className={[
                                        "rounded-xl border px-3 py-2 text-left text-sm transition-colors",
                                        checked
                                            ? "border-[#1F98FA] bg-[#1F98FA] text-white"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-[#1F98FA]/50",
                                    ].join(" ")}
                                >
                                    {topic.label}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Раньше обращались? */}
                <section>
                    <h3 className="mb-2 text-sm font-semibold text-slate-800">
                        Вы раньше обращались к психологу?
                    </h3>
                    <div className="space-y-2">
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                            <input
                                type="radio"
                                name="visited"
                                value="no"
                                checked={visitedBefore === "no"}
                                onChange={() => setVisitedBefore("no")}
                                className="h-4 w-4 accent-[#1F98FA]"
                            />
                            Нет, это впервые
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                            <input
                                type="radio"
                                name="visited"
                                value="yes-now"
                                checked={visitedBefore === "yes-now"}
                                onChange={() => setVisitedBefore("yes-now")}
                                className="h-4 w-4 accent-[#1F98FA]"
                            />
                            Да, хожу сейчас
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                            <input
                                type="radio"
                                name="visited"
                                value="yes-before"
                                checked={visitedBefore === "yes-before"}
                                onChange={() => setVisitedBefore("yes-before")}
                                className="h-4 w-4 accent-[#1F98FA]"
                            />
                            Да, обращался(ась) раньше
                        </label>
                    </div>
                </section>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="rounded-full bg-[#1F98FA] px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(31,152,250,0.45)] hover:bg-[#0f80d6] transition-colors"
                    >
                        Далее
                    </button>
                </div>
            </form>
        </div>
    );
}
