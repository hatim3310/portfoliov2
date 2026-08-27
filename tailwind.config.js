/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Satoshi"', '"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        base: {
          DEFAULT: '#07090D',
          surface: '#0B0E14',
          surface2: '#111622',
          border: 'rgba(255,255,255,0.1)',
        },
        platinum: '#ECECEE',
        accent: {
          DEFAULT: '#5B8CFF',
          soft: 'rgba(91,140,255,0.12)',
          hover: '#8FB2FF',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'mask-up': 'maskUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        maskUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)', clipPath: 'inset(100% 0 0 0)' },
          '100%': { opacity: '1', transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)' },
        },
      },
    },
  },
  plugins: [],
}
