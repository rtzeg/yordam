import { Outlet, NavLink } from "react-router-dom";
import { MainLayout } from "../../components/layout/MainLayout";

export function PsyLayout() {
  const navLinkClass =
    "flex items-center justify-between rounded-2xl px-3 py-2 text-xs font-medium text-slate-700";

  return (
    <MainLayout>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:gap-6">
        <aside className="w-full rounded-3xl bg-white p-4 shadow-sm md:w-56">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Кабинет психолога
          </h2>
          <nav className="space-y-1 text-xs">
            <NavLink
              to="/psy"
              end
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? "bg-sky-50 text-sky-800" : "hover:bg-slate-50"
                }`
              }
            >
              Обзор
            </NavLink>
            <NavLink
              to="/psy/profile"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? "bg-sky-50 text-sky-800" : "hover:bg-slate-50"
                }`
              }
            >
              Профиль
            </NavLink>
            <NavLink
              to="/psy/schedule"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? "bg-sky-50 text-sky-800" : "hover:bg-slate-50"
                }`
              }
            >
              Расписание
            </NavLink>
            <NavLink
              to="/psy/prices"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? "bg-sky-50 text-sky-800" : "hover:bg-slate-50"
                }`
              }
            >
              Цены
            </NavLink>
            <NavLink
              to="/psy/education"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? "bg-sky-50 text-sky-800" : "hover:bg-slate-50"
                }`
              }
            >
              Образование
            </NavLink>
            <NavLink
              to="/psy/payments"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? "bg-sky-50 text-sky-800" : "hover:bg-slate-50"
                }`
              }
            >
              Способы оплаты
            </NavLink>
            <NavLink
              to="/psy/finance"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? "bg-sky-50 text-sky-800" : "hover:bg-slate-50"
                }`
              }
            >
              Финансы
            </NavLink>
            <NavLink
              to="/psy/clients"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive ? "bg-sky-50 text-sky-800" : "hover:bg-slate-50"
                }`
              }
            >
              Клиенты
            </NavLink>
          </nav>
        </aside>

        <section className="flex-1">
          <Outlet />
        </section>
      </div>
    </MainLayout>
  );
}
