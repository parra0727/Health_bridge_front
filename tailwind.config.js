/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Teal Medico HealthBridge
        hb: {
          dark:      "#0F2A30",
          darkMid:   "#1A3A42",
          darkCard:  "#1F4550",
          teal:      "#028090",
          tealLight: "#02A8BE",
          mint:      "#02C39A",
          accent:    "#F9A825",
          danger:    "#E53935",
          success:   "#2E7D32",
          textMuted: "#AACCCC",
          textDim:   "#6B8E8E",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}