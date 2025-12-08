// src/features/profile/ClientLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Header from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";

const navItems = [
  { to: "/client", label: "Личные вопросы", exact: true },          // <= exact / end
  { to: "/psychologists", label: "Выбор психолога" },        // я бы вел сюда, а не на /psychologists
  { to: "/client/settings", label: "Настройки" },
  { to: "/client/billing", label: "Оплата" },
  { to: "/client/videochat", label: "Видеочат" },
  { to: "/client/support", label: "Поддержка" },
];

export function ClientLayout() {
  const { logout } = useAuth();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-skySoft pt-8 pb-16">
        <div className="mx-auto flex max-w-[1296px] gap-8 px-4 lg:px-0">
          {/* ЛЕВАЯ КОЛОНКА */}
          <aside className="w-[240px] rounded-3xl bg-white px-5 py-6 shadow-[0_24px_60px_rgba(2,45,98,0.12)]">
            <h1 className="mb-6 text-2xl leading-tight font-display text-[#1F98FA]">
              Личный
              <br />
              Кабинет
            </h1>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact} // ВАЖНО: только для /client
                  className={({ isActive }) =>
                    [
                      "flex items-center justify-between rounded-xl px-3 py-2 text-[14px] transition-colors",
                      isActive
                        ? "bg-skySoft text-[#1F98FA] font-semibold"
                        : "text-slate-600 hover:bg-slate-50",
                    ].join(" ")
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            <button
              onClick={logout}
              className="mt-6 flex items-center gap-2 text-[14px] font-semibold text-[#FF4D2A]"
            >
              <span className="text-lg">⟵</span>
              Выйти из аккаунта
            </button>
          </aside>


          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ClientLayout;
