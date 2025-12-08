// src/pages/TestApiPage.jsx
import { useEffect, useState } from "react";
// ВАЖНО: тут именно getPsychologistsFromApi
import { getPsychologistsFromApi } from "../shared/api/api";

export function TestApiPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const list = await getPsychologistsFromApi();
        setData(list);
      } catch (e) {
        console.error(e);
        setError(e.message || "Ошибка");
      }
    }

    load();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-[#E6F3FF] p-8 font-display text-[#071A34]">
        <h1 className="mb-4 text-2xl font-semibold">Test API Yordam</h1>
        <p className="text-red-500">Ошибка: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#E6F3FF] p-8 font-display text-[#071A34]">
        <h1 className="mb-4 text-2xl font-semibold">Test API Yordam</h1>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] p-4 text-[#E5E7EB]">
      <h1 className="mb-4 text-2xl font-semibold text-[#38BDF8]">
        Test API Yordam
      </h1>
      <pre className="max-h-[90vh] overflow-auto rounded-xl bg-[#020617] p-4 text-[12px] leading-relaxed">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default TestApiPage;
