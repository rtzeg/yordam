// PsyDashboardPage.jsx
import { MOCK_PSY_PROFILE } from "../mockPsyData";

export function PsyDashboardPage() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <h1 className="text-lg font-semibold text-sky-950 mb-2">
        Обзор
      </h1>
      <p className="text-sm text-slate-600">
        Добро пожаловать, {MOCK_PSY_PROFILE.fullName}. Здесь позже будет
        дашборд с ближайшими сессиями и статистикой.
      </p>
    </div>
  );
}
