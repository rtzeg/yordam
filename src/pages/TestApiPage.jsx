// src/pages/TestApiPage.jsx
import { useEffect, useState } from "react";
import { fetchPsychologists } from "../shared/api/http";

export function TestApiPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                setError("");
                const res = await fetchPsychologists();
                setData(res);
            } catch (e) {
                console.error(e);
                setError(
                    e?.response
                        ? `Ошибка: ${e.response.status} ${e.response.statusText}`
                        : `Ошибка: ${e.message}`
                );
            }
        })();
    }, []);

    return (
        <div className="min-h-screen bg-[#E7F4FF] p-6 text-[#071A34]">
            <h1 className="mb-4 text-2xl font-display">Тест API Yordam</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {data && (
                <pre className="max-h-[70vh] overflow-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}

export default TestApiPage;
