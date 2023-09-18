/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#854dff',
        'light-red': '#ff5757',
        'white': '#fff',
        'off-white': '#f0f0f0',
        'light-grey': '#dbdbdb',
        'smokey-grey': '#716f6f',
        'off-black': '#141414',
      },
      fontFamily: {
        "poppins": ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    visibility: false
  },
}