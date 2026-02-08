module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-pure": "#000000",
        "black-elevated": "#0a0a0a",
        "black-surface": "#141414",
        "black-hover": "#1a1a1a",
        "black-active": "#242424",

        "border-subtle": "#1f1f1f",
        "border-medium": "#2a2a2a",

        "text-primary": "#ffffff",
        "text-secondary": "#a0a0a0",
        "text-tertiary": "#525252",

        "accent-green": "#22c55e",
        "accent-green-hover": "#16a34a",
        "accent-red": "#ef4444",
        "accent-red-hover": "#dc2626",
        "accent-amber": "#f59e0b",
        "accent-blue": "#3b82f6",
        "accent-blue-hover": "#2563eb",

        "difficulty-easy": "#22c55e",
        "difficulty-medium": "#f59e0b",
        "difficulty-hard": "#ef4444",

        "dark-layer-1": "#0a0a0a",
        "dark-layer-2": "#000000",
        "dark-label-2": "#a0a0a0",
        "dark-divider-border-2": "#1f1f1f",
        "dark-fill-2": "#1a1a1a",
        "dark-fill-3": "#141414",
        "dark-gray-6": "#525252",
        "dark-gray-7": "#a0a0a0",
        "gray-8": "#141414",
        "dark-gray-8": "#ffffff",
        "brand-orange": "#f59e0b",
        "brand-orange-s": "#d97706",
        "dark-yellow": "#f59e0b",
        "dark-pink": "#ef4444",
        olive: "#22c55e",
        "dark-green-s": "#22c55e",
        "dark-blue-s": "#3b82f6",
      },
      transitionDuration: {
        150: "150ms",
      },
    },
  },
  plugins: [],
};
