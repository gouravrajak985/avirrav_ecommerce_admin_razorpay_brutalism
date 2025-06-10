/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
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
        // Polaris Color System
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
        // Shopify Polaris Colors
        shopify: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        surface: {
          DEFAULT: '#ffffff',
          subdued: '#fafbfb',
          disabled: '#f6f6f7',
          hovered: '#f1f2f3',
          pressed: '#e8e9ea',
          depressed: '#edeeef',
        },
        text: {
          DEFAULT: '#202223',
          subdued: '#6d7175',
          disabled: '#8c9196',
        },
        interactive: {
          DEFAULT: '#2c6ecb',
          hovered: '#1f5199',
          pressed: '#103262',
          disabled: '#bdc1cc',
        },
        critical: {
          DEFAULT: '#d72c0d',
          subdued: '#fef7f6',
          surface: '#fed3d1',
        },
        warning: {
          DEFAULT: '#ffc453',
          subdued: '#fffbf4',
          surface: '#fff5d6',
        },
        success: {
          DEFAULT: '#008060',
          subdued: '#f6fffe',
          surface: '#d1f7ee',
        },
        highlight: {
          DEFAULT: '#5bcdda',
          subdued: '#f7fcfd',
          surface: '#c7f0f4',
        },
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'caption': ['11px', { lineHeight: '16px', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '20px', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'subheading': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'heading': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'display-sm': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'display': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'display-lg': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'display-xl': ['32px', { lineHeight: '40px', fontWeight: '600' }],
      },
      spacing: {
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },
      boxShadow: {
        'polaris-sm': '0 1px 0 0 rgba(22, 29, 37, 0.05)',
        'polaris': '0 1px 0 0 rgba(22, 29, 37, 0.05), 0 1px 1px 0 rgba(22, 29, 37, 0.1)',
        'polaris-md': '0 4px 8px -2px rgba(22, 29, 37, 0.1), 0 1px 0 0 rgba(22, 29, 37, 0.05)',
        'polaris-lg': '0 8px 16px -4px rgba(22, 29, 37, 0.1), 0 1px 0 0 rgba(22, 29, 37, 0.05)',
        'polaris-inset': 'inset 0 1px 0 0 rgba(22, 29, 37, 0.05)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0, transform: "translateY(4px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}