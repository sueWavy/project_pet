// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       screens: {
//         s: { max: "628px" },
//         sm: { max: "820px" },
//         md: { max: "1070px" },
//       },
//       colors: {
//         brand: "#3D89D0",
//       },
//     },
//   },
//   plugins: [],
// };

// module.exports = {
//   darkMode: "class",
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        s: { max: "628px" },
        sm: { max: "820px" },
        md: { max: "1070px" },
        l: { max: "1600px" },
      },
      colors: {
        brand: "#3D89D0",
      },
      boxShadow: {
        outline: "0 0 0 3px rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
