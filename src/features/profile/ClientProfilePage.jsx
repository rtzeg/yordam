// src/features/profile/ClientProfilePage.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ClientProfilePage() {
    const { t } = useTranslation();

    const [birthDate, setBirthDate] = useState("");
    const [about, setAbout] = useState("");
    const [goal, setGoal] = useState("therapy");
    const [mainConcern, setMainConcern] = useState("");
    const [topics, setTopics] = useState(["relationships"]);
    const [visitedBefore, setVisitedBefore] = useState("no");

    const toggleTopic = (value) => {
        setTopics((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
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
        { value: "relationships", label: t("clientProfilePage.topics.options.relationships") },
        { value: "self-esteem", label: t("clientProfilePage.topics.options.selfEsteem") },
        { value: "anxiety", label: t("clientProfilePage.topics.options.anxiety") },
        { value: "burnout", label: t("clientProfilePage.topics.options.burnout") },
        { value: "career", label: t("clientProfilePage.topics.options.career") },
        { value: "other", label: t("clientProfilePage.topics.options.other") },
    ];

    return (
        <div className="rounded-3xl bg-white px-8 py-8 shadow-[0_24px_60px_rgba(2,45,98,0.08)]">
            <h2 className="mb-2 text-2xl font-display text-[#071A34]">
                {t("clientProfilePage.title")}
            </h2>
            <p className="mb-6 text-sm text-slate-500">
                {t("clientProfilePage.intro")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Дата рождения */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        {t("clientProfilePage.birthDate.label")}
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
                        {t("clientProfilePage.about.label")}
                    </label>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder={t("clientProfilePage.about.placeholder")}
                        rows={5}
                        className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-sky-100 focus:bg-white focus:ring-2"
                    />
                </div>

                {/* Цель обращения */}
                <section>
                    <h3 className="mb-2 text-sm font-semibold text-slate-800">
                        {t("clientProfilePage.goal.title")}
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
                            {t("clientProfilePage.goal.options.therapy")}
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
                            {t("clientProfilePage.goal.options.single")}
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
                            {t("clientProfilePage.goal.options.diagnostic")}
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
                            {t("clientProfilePage.goal.options.other")}
                        </label>
                    </div>
                </section>

                {/* Что беспокоит */}
                <div>
                    <h3 className="mb-1 text-sm font-semibold text-slate-800">
                        {t("clientProfilePage.mainConcern.title")}
                    </h3>
                    <p className="mb-2 text-xs text-slate-500">
                        {t("clientProfilePage.mainConcern.hint")}
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
                        {t("clientProfilePage.topics.title")}
                    </h3>
                    <p className="mb-2 text-xs text-slate-500">
                        {t("clientProfilePage.topics.hint")}
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
                        {t("clientProfilePage.visitedBefore.title")}
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
                            {t("clientProfilePage.visitedBefore.options.no")}
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
                            {t("clientProfilePage.visitedBefore.options.yesNow")}
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
                            {t("clientProfilePage.visitedBefore.options.yesBefore")}
                        </label>
                    </div>
                </section>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="rounded-full bg-[#1F98FA] px-8 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(31,152,250,0.45)] hover:bg-[#0f80d6] transition-colors"
                    >
                        {t("clientProfilePage.submit.next")}
                    </button>
                </div>
            </form>
        </div>
    );
}
    