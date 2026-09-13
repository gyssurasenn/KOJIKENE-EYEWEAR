import type { Config } from 'tailwindcss';

/**
 * KOJIKANE EYEWEAR — design tokens.
 * White and charcoal surfaces with orange brand accents.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        paper: '#FAF9F6', // Soft paper white.
        white: '#FFFFFF', // Pure white.
        canvas: '#FFFFFF',
        bone: '#F4F4F3', // neutral section break
        brand: { DEFAULT: '#FF8A4C', hover: '#F57835' },
        sand: '#E2DACE', // muted beige
        clay: '#C8BCAA', // warm sand accent
        // Ink
        ink: '#16140F', // near-black, warm
        charcoal: '#2A2724',
        graphite: '#4A4640',
        stone: '#7C766C', // soft gray, body-secondary
        mist: '#A9A399',
        // Very subtle accent
        olive: '#5E6152',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'ui-sans-serif', 'sans-serif'],
        thai: ['var(--font-thai)', 'var(--font-sans)', 'sans-serif'],
        accent: ['var(--font-accent)', 'var(--font-thai)', 'var(--font-sans)', 'sans-serif'],
      },
      fontSize: {
        // Editorial display scale (clamped, mobile-first)
        'display-xl': ['clamp(2.75rem, 9vw, 7rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.25rem, 6.5vw, 4.75rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.875rem, 4.4vw, 3.25rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        lede: ['clamp(1.0625rem, 1.6vw, 1.3125rem)', { lineHeight: '1.62', letterSpacing: '-0.011em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.22em' }],
      },
      letterSpacing: {
        widest2: '0.22em',
        widest3: '0.32em',
      },
      maxWidth: {
        prose2: '68ch',
        shell: '92rem',
      },
      spacing: {
        section: 'clamp(4.5rem, 10vw, 9.5rem)',
        gutter: 'clamp(1.25rem, 4vw, 3.5rem)',
      },
      borderRadius: {
        none: '0',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'rule-in': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.85s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.7s ease both',
        'rule-in': 'rule-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
