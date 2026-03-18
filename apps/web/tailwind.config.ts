/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        'geist-sans': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'funnel-sans': ['var(--font-funnel-sans)', 'system-ui', 'sans-serif'],
        'funnel-display': ['var(--font-funnel-display)', 'system-ui'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'], // default sans
      },
    },
  },
}