/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pine-dark': '#1B4332',
        'pine-light': '#2D6A4F',
        'forest-green-dark': '#1B4332',
        'forest-green-medium': '#2D6A4F',
        'forest-green-light': '#52B788',
        'earth-dark': '#40241A',
        'earth-light': '#8B4513',
        'bark-brown': '#8B5E3C',
        'leaf-green': '#52B788',
        'moss-light': '#95D5B2',
        'cream': '#FFF1E6',
        'sand': '#FFE8D6',
        'sky-blue': '#7EC8E3',
        'sunset-orange': '#FF7F50',
        'mustard-yellow': '#E3B448',
      },
    },
  },
  plugins: [],
} 