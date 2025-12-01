import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'lg:grid-cols-hero-3col',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'hero-3col': '26% 48% 26%',
      },
      colors: {
        primary: {
          black: '#161613',
          red: '#f9303d',
        },
        text: {
          dark: '#161613',
          gray: '#6b6b6b',
          light: '#999999',
        },
        bg: {
          white: '#ffffff',
          offwhite: '#fafafa',
          gray: '#f5f5f5',
        },
        border: {
          gray: '#e5e5e5',
          dark: '#d1d1d1',
        },
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'Georgia', 'serif'], // Body text - elegant serif
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'], // UI elements
        display: ['Lora', 'serif'], // ALL headlines/titles - NO EXCEPTIONS
      },
      maxWidth: {
        'site': '1920px',
      },
      fontSize: {
        'body': '18px',
        'link': '19px',
      },
      scale: {
        '102': '1.02',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
