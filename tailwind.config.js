module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Xmind",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        lg: "0.625rem",
      },
      colors: {
        "black-pure": "#131316",
        "black-elevated": "#1a1a1e",
        "black-surface": "#222227",
        "black-hover": "#2b2b31",
        "black-active": "#34343b",

        "border-subtle": "#2a2a30",
        "border-medium": "#3a3a42",

        "text-primary": "#f4f4f5",
        "text-secondary": "#a1a1aa",
        "text-tertiary": "#71717a",

        "accent-green": "#34d399",
        "accent-green-hover": "#10b981",
        "accent-red": "#f87171",
        "accent-red-hover": "#ef4444",
        "accent-amber": "#fbbf24",
        "accent-blue": "#60a5fa",
        "accent-blue-hover": "#3b82f6",

        "difficulty-easy": "#34d399",
        "difficulty-medium": "#fbbf24",
        "difficulty-hard": "#f87171",

        "dark-layer-1": "#131316",
        "dark-layer-2": "#1a1a1e",
        "dark-layer-3": "#222227",
        "dark-label-2": "#a1a1aa",
        "dark-divider-border-2": "#2a2a30",
        "dark-divide-border": "#2a2a30",
        "dark-fill-2": "#222227",
        "dark-fill-3": "#1e1e22",
        "dark-gray-6": "#71717a",
        "dark-gray-7": "#a1a1aa",
        "gray-8": "#1e1e22",
        "dark-gray-8": "#f4f4f5",
        "brand-orange": "#fbbf24",
        "brand-orange-s": "#f59e0b",
        "dark-yellow": "#fbbf24",
        "dark-pink": "#f87171",
        olive: "#34d399",
        "dark-green-s": "#34d399",
        "dark-blue-s": "#60a5fa",
      },
      transitionDuration: {
        150: "150ms",
      },
    },
  },
  plugins: [],
};
