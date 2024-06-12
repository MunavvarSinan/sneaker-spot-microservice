import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'haveltica': 'Helvetica, sans-serif',
        'haveltica-bold': 'Helvetica-Bold, sans-serif',
        'haveltica-black': 'Helvetica-Black, sans-serif',
      },
      colors: {
        primary: "#F4F4F4",
        secondary: "#121212",
        accent: "#CDEB2A"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config