// src/components/layout/MainLayout.jsx
import Header from "./Header";          // у тебя Header по default-export
import { Footer } from "./Footer";      // если Footer у тебя по-другому экспортируется — поправь

export function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-skySoft">
            {/* общий хедер для всех страниц */}
            <Header />

            {/* контент страницы */}
            <main className="flex-1">
                {children}
            </main>

            {/* общий футер */}
            <Footer />
        </div>
    );
}
