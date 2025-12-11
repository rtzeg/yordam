import Header from "./Header";          
import { Footer } from "./Footer";  

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
