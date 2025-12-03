import { MainLayout } from "../components/layout/MainLayout";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="mb-3 text-2xl font-semibold text-sky-950">
          Страница не найдена
        </h1>
        <p className="mb-4 text-sm text-slate-600">
          Возможно, ссылка устарела или вы ошиблись при вводе адреса.
        </p>
        <Link
          to="/"
          className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
        >
          На главную
        </Link>
      </div>
    </MainLayout>
  );
}
