/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        base: {
          DEFAULT: '#141414',
          soft: '#14191B',
          card: '#161D20',
          alt: '#1A2529',
        },
        brand: {
          950: '#06333D',
          900: '#0B4A57',
          700: '#10697C',
          500: '#1B8FA8',
          400: '#2AA6C0',
        },
        ink: {
          DEFAULT: '#F7F7F7',
          muted: '#B8AEA7',
        },
        border: 'rgba(27, 143, 168, 0.18)',
        ring: '#1B8FA8',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 15px 60px rgba(27, 143, 168, 0.10)',
        glow: '0 0 0 1px rgba(27,143,168,0.25), 0 0 32px rgba(27,143,168,0.18)',
        'glow-sm': '0 0 18px rgba(27, 143, 168, 0.22)',
      },
      backgroundImage: {
        grid: `linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)`,
        'hero-radial': `radial-gradient(circle at 50% 20%, rgba(27,143,168,0.35), rgba(11,74,87,0.15) 30%, transparent 65%)`,
        'brand-gradient': 'linear-gradient(100deg, #2AA6C0 0%, #1B8FA8 45%, #10697C 100%)',
      },
      backgroundSize: {
        grid: '64px 64px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.45', transform: 'scale(.82)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(900%)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.16,1,.3,1) both',
        blink: 'blink 1s step-end infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'scan-line': 'scan-line 6s linear infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
