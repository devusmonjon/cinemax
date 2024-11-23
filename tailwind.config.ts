import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        grayscale: {
          "10": "hsl(var(--grayscale-10))",
          "20": "hsl(var(--grayscale-20))",
          "30": "hsl(var(--grayscale-30))",
          "40": "hsl(var(--grayscale-40))",
          "50": "hsl(var(--grayscale-50))",
          "60": "hsl(var(--grayscale-60))",
          "70": "hsl(var(--grayscale-70))",
          "80": "hsl(var(--grayscale-80))",
          "90": "hsl(var(--grayscale-90))",
          "100": "hsl(var(--grayscale-100))",
        },
        alert: {
          DEFAULT: "hsl(var(--success))",
          warning: "hsl(var(--warning))",
          error: "hsl(var(--error))",
        },
        line: "hsl(var(--line))",
        dark: "hsl(var(--dark-smooth))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
    keyframes: {
      "show-section": {
        from: {
          transform: "translateX(-100%)",
        },
      },
      "hide-section": {
        to: {
          transform: "translateX(100%)",
        },
      },
      "caret-blink": {
        "0%,70%,100%": { opacity: "1" },
        "20%,50%": { opacity: "0" },
      },
    },
    animation: {
      "show-section": "show-section 0.3s ease-in-out",
      "show-section-reverse": "show-section-reverse 0.3s ease-in-out",
      "hide-section": "hide-section 0.3s ease-in-out",
      "hide-section-reverse": "hide-section-reverse 0.3s ease-in-out",
      "caret-blink": "caret-blink 1.25s ease-out infinite",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
