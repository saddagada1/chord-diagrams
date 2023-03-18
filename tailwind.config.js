/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header: ["Syne"],
        body: ["Inter"],
      },
    },
  },
  plugins: [],
};
