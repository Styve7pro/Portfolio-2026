/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* dark */
        'dk-bg':     '#0A0A0A',
        'dk-section':'#141414',
        'dk-card':   '#141414',
        'dk-border': '#262626',
        'dk-text':   '#EDEDED',
        'dk-muted':  '#737373',
        'dk-subtle': '#404040',
        /* light */
        'lt-bg':     '#FFFFFF',
        'lt-section':'#F9FAFB',
        'lt-card':   '#FFFFFF',
        'lt-border': '#E5E7EB',
        'lt-text':   '#111111',
        'lt-muted':  '#6B7280',
        'lt-subtle': '#D1D5DB',
        /* accent */
        'em':        '#10B981',   /* dark mode emerald */
        'em-light':  '#059669',   /* light mode emerald */
        'em-dim':    '#065F46',
        'em-bright': '#34D399',
      },
      fontFamily: {
        sans:    ['"Inter"','"Geist"','system-ui','sans-serif'],
        display: ['"Inter"','"Geist"','system-ui','sans-serif'],
        body:    ['"Inter"','"Geist"','system-ui','sans-serif'],
        mono:    ['"JetBrains Mono"','Consolas','monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.04em',
      },
      animation: {
        'fade-up':    'fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fadeIn 0.3s ease both',
        'pulse-em':   'pulseEm 2.5s ease-in-out infinite',
        'float':      'float 7s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:   { '0%':{ opacity:'0', transform:'translateY(12px)' }, '100%':{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:   { '0%':{ opacity:'0' }, '100%':{ opacity:'1' } },
        pulseEm:  { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0.4' } },
        float:    { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
}
