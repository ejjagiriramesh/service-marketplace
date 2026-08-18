/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#001F3F",
        "ink-soft": "#1A4D7A",
        paper: "#F3EEE2",
        "paper-dim": "#E9E1CE",
        amber: "#FFD700",
        "amber-deep": "#DAA520",
        slate: "#62707D",
        "slate-light": "#8D97A0",
        rust: "#C1512F",
        green: "#3F7859",
        line: "#D9D0BB",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
