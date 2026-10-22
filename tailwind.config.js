/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pd: {
          blue: '#0078E8', // sampled from logo
          green: '#01A95C', // sampled from logo
          grey: '#6F6F6F',
          navy: '#0A1020',
          ink: '#0F172A',
          mist: '#F4F7FB',
          line: '#E3E9F2',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'pd-gradient': 'linear-gradient(120deg,#0078E8 0%,#01A95C 100%)',
      },
      boxShadow: {
        glow: '0 10px 40px -10px rgba(0,120,232,.45)',
        card: '0 1px 2px rgba(15,23,42,.06), 0 10px 30px -12px rgba(15,23,42,.18)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulseRing: { '0%': { transform: 'scale(.8)', opacity: '.8' }, '100%': { transform: 'scale(2)', opacity: '0' } },
      },
      animation: { float: 'float 6s ease-in-out infinite', marquee: 'marquee 40s linear infinite', pulseRing: 'pulseRing 2.4s ease-out infinite' },
    },
  },
  plugins: [],
}
