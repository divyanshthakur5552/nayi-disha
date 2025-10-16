/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
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
      colors: {
        border: "var(--color-border)" /* slate-600 */,
        input: "var(--color-input)" /* custom-surface */,
        ring: "var(--color-ring)" /* violet-500 */,
        background: "var(--color-background)" /* deep-navy */,
        foreground: "var(--color-foreground)" /* slate-50 */,
        primary: {
          DEFAULT: "var(--color-primary)" /* violet-500 */,
          foreground: "var(--color-primary-foreground)" /* white */,
        },
        secondary: {
          DEFAULT: "var(--color-secondary)" /* cyan-500 */,
          foreground: "var(--color-secondary-foreground)" /* white */,
        },
        destructive: {
          DEFAULT: "var(--color-destructive)" /* red-500 */,
          foreground: "var(--color-destructive-foreground)" /* white */,
        },
        muted: {
          DEFAULT: "var(--color-muted)" /* slate-600 */,
          foreground: "var(--color-muted-foreground)" /* slate-400 */,
        },
        accent: {
          DEFAULT: "var(--color-accent)" /* emerald-500 */,
          foreground: "var(--color-accent-foreground)" /* white */,
        },
        popover: {
          DEFAULT: "var(--color-popover)" /* custom-surface */,
          foreground: "var(--color-popover-foreground)" /* slate-50 */,
        },
        card: {
          DEFAULT: "var(--color-card)" /* custom-surface */,
          foreground: "var(--color-card-foreground)" /* slate-50 */,
        },
        success: {
          DEFAULT: "var(--color-success)" /* green-500 */,
          foreground: "var(--color-success-foreground)" /* white */,
        },
        warning: {
          DEFAULT: "var(--color-warning)" /* amber-500 */,
          foreground: "var(--color-warning-foreground)" /* black */,
        },
        error: {
          DEFAULT: "var(--color-error)" /* red-500 */,
          foreground: "var(--color-error-foreground)" /* white */,
        },
        // Brand Colors (Direct hex values for consistency)
        violet: {
          400: "#A78BFA" /* violet-400 */,
          500: "#8B5CF6" /* violet-500 */,
          600: "#7C3AED" /* violet-600 */,
          900: "#4C1D95" /* violet-900 */,
        },
        cyan: {
          400: "#22D3EE" /* cyan-400 */,
          500: "#06B6D4" /* cyan-500 */,
          600: "#0891B2" /* cyan-600 */,
        },
        emerald: {
          400: "#34D399" /* emerald-400 */,
          500: "#10B981" /* emerald-500 */,
          600: "#059669" /* emerald-600 */,
        },
        slate: {
          400: "#94A3B8" /* slate-400 */,
          600: "#475569" /* slate-600 */,
          700: "#334155" /* slate-700 */,
          800: "#1E293B" /* slate-800 */,
          900: "#0F172A" /* slate-900 */,
        },
        purple: {
          500: "#8B5CF6" /* purple-500 */,
          900: "#581C87" /* purple-900 */,
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        spring: "spring 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        spring: {
          "0%": {
            transform: "scale(0.95)",
          },
          "50%": {
            transform: "scale(1.02)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(139, 92, 246, 0.15)",
        "glass-lg": "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
        neon: "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
