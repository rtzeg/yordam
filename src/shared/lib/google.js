const GOOGLE_SCRIPT_ID = "google-identity-services";

export function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google);
      return;
    }

    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.google));
      existingScript.addEventListener("error", () =>
        reject(new Error("Не удалось загрузить Google SDK"))
      );
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Не удалось загрузить Google SDK"));

    document.head.appendChild(script);
  });
}