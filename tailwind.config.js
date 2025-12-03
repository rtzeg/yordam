/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                skySoft: "#ECF7FF",
            },
            borderRadius: {
                "3xl": "1.5rem",
            },
        },
    },
    plugins: [],
};
