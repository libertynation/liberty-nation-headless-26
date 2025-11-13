import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        serif: ['Georgia', 'serif'], // Body text - matches thefp.com
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Lora', 'Georgia', 'serif'], // All headlines - matches thefp.com
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
