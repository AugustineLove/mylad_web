/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0066FF",
        secondary: "#FF0066",
        tertiary: "#00FF66",
        quaternary: "#FFCC00",
        quinary: "#FF00FF",
        senary: "#00FFFF",
        septenary: "#FFFF00",
        octonary: "#FF6666",
        nonary: "#66FF66",
        denary: "#6666FF",
        undenary: "#FF66FF",
      },
    },
  },
  plugins: [],
};
