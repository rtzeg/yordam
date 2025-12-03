import { MainLayout } from "../components/layout/MainLayout";
import { FAQSection } from "/src/components/FAQSection.jsx";




export function LandingPage() {
    return (
        <MainLayout>
            <div className="grid items-center gap-6 md:grid-cols-2">
                <div>
                    <h1 className="mb-3 text-3xl md:text-4xl font-display text-sky-900">
                        Психологическая помощь онлайн
                    </h1>
                    <p className="mb-4 text-sm text-slate-600">
                        Здесь будет верстка главного экрана из Figma. Сейчас это заглушка,
                        чтобы собрать структуру приложения.
                    </p>
                </div>
                <div className="h-64 rounded-3xl bg-sky-100" />
            </div>
            <FAQSection />
        </MainLayout>
    );
}
