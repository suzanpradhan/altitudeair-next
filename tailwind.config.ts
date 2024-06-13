import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        gilroy: ['Gilroy-ExtraBold', 'sans-serif'],
      },
      colors: {
        'custom-blue': '#202e43',
        'custom-blue-light': '#545564',
        'custom-gray': '#b3c6d5',
        'custom-gray-light': '#8FA2B2',
        'custom-primary': '#fbc200',
      },
    },
  },
  plugins: [function ({ addUtilities }: PluginAPI) {
    addUtilities({
      '.icon-before::before': {
        content: '"\\2192"', /* Unicode for checkmark icon */
        marginRight: '0.5rem',
        fontWeight: 'bold',
        color: '#202e43',
      },
    });
  },],
};
export default config;