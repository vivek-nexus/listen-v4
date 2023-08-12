/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary-900": "#055d57",
        "primary-800": "#008080",
        "primary-700": "#009497",
        "primary-600": "#00a9af",
        "primary-500": "#00b9c1",
        "primary-400": "#26c3c7",
        "primary-300": "#4dcecf",
        "primary-200": "#80dddb",
        "primary-100": "#b1eae8",
        "primary-50": "#dff7f6",
      }
    },
  },
  plugins: [],
}
