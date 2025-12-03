import { MainLayout } from "../components/layout/MainLayout";
import { Link } from "react-router-dom";

export function ForbiddenPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="mb-3 text-2xl font-semibold text-sky-950">
          Нет доступа
        </h1>
        <p className="mb-4 text-sm text-slate-600">
          Эта страница доступна только авторизованным пользователям нужной роли.
        </p>
        <div className="flex flex-col items-center gap-2 text-sm">
          <Link
            to="/"
            className="rounded-full bg-sky-500 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-sky-600"
          >
            На главную
          </Link>
          <Link
            to="/auth/login"
            className="text-xs text-sky-700 underline"
          >
            Войти под другим аккаунтом
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
