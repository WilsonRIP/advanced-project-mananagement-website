// tailwind.config.ts
import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import fontFamily from "tailwindcss/defaultTheme"; // Import default theme font families

const config: Config = {
  darkMode: ["class"], // Enable class-based dark mode
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
      // --- Colors (Mapped to CSS variables) ---
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          // Assuming --destructive-foreground is defined in your globals.css for completeness
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // --- Border Radius (Mapped to CSS variable) ---
      borderRadius: {
        lg: "var(--radius)", // Base large radius
        md: "calc(var(--radius) - 2px)", // Medium relative to base
        sm: "calc(var(--radius) - 4px)", // Small relative to base
      },
      // --- Font Families (Mapped to CSS variables set by next/font) ---
      fontFamily: {
        // Extend default sans-serif stack with Geist Sans variable first
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        // Extend default mono stack with Geist Mono variable first
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        // Map custom fonts to their CSS variables set by next/font/local
        // Utility classes will be font-flowers, font-arista, font-orange
        flowers: ["var(--font-flowers-kingdom)", "cursive"], // Add fallback generic
        arista: ["var(--font-arista-pro)", "sans-serif"], // Add fallback generic
        orange: ["var(--font-orange-juice)", "sans-serif"], // Add fallback generic
      },
      // --- Spacing (Replicating scale from removed CSS variables) ---
      // Allows using utilities like p-4, m-8 etc. with your custom scale
      spacing: {
        '1': '0.25rem', // 4px
        '2': '0.5rem',  // 8px
        '3': '0.75rem', // 12px
        '4': '1rem',    // 16px (base)
        '5': '1.25rem', // 20px
        '6': '1.5rem',  // 24px
        '8': '2rem',    // 32px
        '10': '2.5rem', // 40px
        '12': '3rem',   // 48px
        '16': '4rem',   // 64px
        '20': '5rem',   // 80px
        '24': '6rem',   // 96px
      },
      // --- Animation & Transitions (for tailwindcss-animate and general use) ---
      keyframes: {
        // Add shadcn/ui or custom keyframes here if you use them
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Add other keyframes needed by tailwindcss-animate or custom animations
      },
      animation: {
        // Map keyframes to animation utilities
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Add other animation utilities
      },
       // --- Transition Durations (Replicating scale from removed CSS variables) ---
       transitionDuration: {
        // You can override or extend Tailwind's default durations (75, 100, 150, 200, 300, 500, 700, 1000ms)
        DEFAULT: '150ms', // Default duration-[]
        'fast': '150ms',    // duration-fast (matches default)
        'normal': '300ms', // duration-normal
        'slow': '500ms',    // duration-slow
       },
      // --- Box Shadows (Replicating scale from removed CSS variables) ---
      // Uses Tailwind's default color approach (rgb with alpha) for simplicity.
      // For exact matching with potential light/dark CSS variable colors, more complex setup might be needed.
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)', // Matches Tailwind default sm
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // Matches Tailwind default 'shadow'
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // Matches Tailwind default md
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // Matches Tailwind default lg
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', // Matches Tailwind default xl
       // '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)', // Default 2xl if needed
       // inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', // Default inner if needed
       // none: 'none',
      },
      // --- Background Images (Keep existing) ---
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [animatePlugin], // Include the animation plugin
};

export default config;