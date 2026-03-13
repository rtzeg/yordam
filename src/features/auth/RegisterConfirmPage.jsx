import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "../../components/layout/MainLayout";
import { useAuth } from "./AuthContext";

const PENDING_REGISTRATION_KEY = "yordam_pending_registration";
const DEFAULT_TIMER_SECONDS = 60;

function getPendingRegistration() {
  try {
    const raw = sessionStorage.getItem(PENDING_REGISTRATION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function savePendingRegistration(data) {
  sessionStorage.setItem(PENDING_REGISTRATION_KEY, JSON.stringify(data));
}

function clearPendingRegistration() {
  sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
}

export function RegisterConfirmPage() {
  const navigate = useNavigate();
  const { register, confirmRegisterCode } = useAuth();

  const [pending, setPending] = useState(() => getPendingRegistration());
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_TIMER_SECONDS);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const data = getPendingRegistration();

    if (!data?.email || !data?.password) {
      navigate("/auth/register", { replace: true });
      return;
    }

    setPending(data);

    const startedAt = data.timerStartedAt || Date.now();
    const timerSeconds = data.timerSeconds || DEFAULT_TIMER_SECONDS;
    const passed = Math.floor((Date.now() - startedAt) / 1000);
    const left = Math.max(timerSeconds - passed, 0);

    setSecondsLeft(left);
  }, [navigate]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const maskedEmail = useMemo(() => {
    if (!pending?.email) return "";

    const [name, domain] = pending.email.split("@");
    if (!name || !domain) return pending.email;

    if (name.length <= 2) return pending.email;

    return `${name.slice(0, 2)}***@${domain}`;
  }, [pending]);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!code.trim()) {
      setError("Введите код подтверждения");
      return;
    }

    try {
      setLoading(true);

      const result = await confirmRegisterCode({
        email: pending.email,
        code: code.trim(),
      });

      console.log("REGISTER CONFIRM RESPONSE:", result);

      clearPendingRegistration();

      setSuccess("Аккаунт успешно подтверждён");

      setTimeout(() => {
        navigate("/auth/login", {
          replace: true,
          state: {
            registered: true,
            email: pending.email,
          },
        });
      }, 1000);
    } catch (err) {
      console.error("REGISTER CONFIRM PAGE ERROR:", err);
      setError(err?.message || "Не удалось подтвердить код");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!pending || secondsLeft > 0) return;

    try {
      setResending(true);
      setError("");
      setSuccess("");

      const result = await register({
        fullName: pending.fullName,
        email: pending.email,
        password: pending.password,
        passwordRepeat: pending.password,
      });

      console.log("REGISTER RESEND RESPONSE:", result);

      const updated = {
        ...pending,
        timerStartedAt: Date.now(),
        timerSeconds: DEFAULT_TIMER_SECONDS,
      };

      savePendingRegistration(updated);
      setPending(updated);
      setSecondsLeft(DEFAULT_TIMER_SECONDS);
      setSuccess("Код отправлен повторно");
    } catch (err) {
      console.error("REGISTER RESEND ERROR:", err);
      setError(err?.message || "Не удалось отправить код повторно");
    } finally {
      setResending(false);
    }
  };

  if (!pending) {
    return null;
  }

  return (
    <MainLayout>
      <main className="bg-skySoft min-h-[calc(100vh-80px)]">
        <div className="mx-auto flex max-w-[1200px] justify-center px-4 py-10 lg:px-[72px] lg:py-16">
          <div className="w-full max-w-[520px] rounded-[32px] bg-white p-6 shadow-[0_18px_52px_rgba(67,142,229,0.18)] lg:p-8">
            <h1 className="text-[22px] font-bold text-[#071A34] lg:text-[24px]">
              Подтверждение кода
            </h1>
            <p className="mt-1 text-[13px] text-[#6D7685]">
              Мы отправили код на {maskedEmail}
            </p>

            {error && (
              <div className="mt-4 rounded-xl bg-[#FFECEC] px-3 py-2 text-[13px] text-[#D12C2C]">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 rounded-xl bg-[#ECFFF3] px-3 py-2 text-[13px] text-[#1E8E5A]">
                {success}
              </div>
            )}

            <form onSubmit={handleConfirm} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-[#071A34]">
                  Код подтверждения
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="Введите код"
                  className="w-full rounded-xl border border-[#D7E0ED] bg-[#F9FBFF] px-3 py-2 text-[14px] text-[#071A34] outline-none transition focus:border-[#1F98FA] focus:bg-white"
                />
              </div>

              <div className="rounded-xl bg-[#F5F8FF] px-3 py-3 text-[13px] text-[#516074]">
                {secondsLeft > 0 ? (
                  <>Отправить код повторно можно через {secondsLeft} сек.</>
                ) : (
                  <>Можно запросить новый код.</>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full border border-[#1F98FA] bg-[#1F98FA] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(31,152,250,0.45)] transition hover:bg-[#0f84e2] disabled:opacity-60"
              >
                {loading ? "Подтверждаем..." : "Подтвердить код"}
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={resending || secondsLeft > 0}
                className="inline-flex w-full items-center justify-center rounded-full border border-[#D7E0ED] bg-white px-6 py-2.5 text-[13px] font-medium text-[#071A34] transition hover:border-[#1F98FA] hover:bg-[#F5F8FF] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resending ? "Отправляем..." : "Отправить код повторно"}
              </button>
            </form>

            <div className="mt-5 text-center text-[12px] text-[#6D7685]">
              <Link
                to="/auth/register"
                className="text-[#1F98FA] hover:underline"
              >
                Вернуться к регистрации
              </Link>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default RegisterConfirmPage;