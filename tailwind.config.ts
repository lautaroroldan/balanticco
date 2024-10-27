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
        primary: "#DB3535",
        secondary: "#379137",
        "light-gray": "#ABABAB",
        "dark-gray": "#525252",
        "custom-white": "#F1F2F6",
        "blue-gradient": "#4F80C3",
        "purple-gradient": "#C262EA",
        "pink-gradient": "#D56DC4",
        "orange-gradient": "#E67B99",
      },
    },
  },
  plugins: [],
};
export default config;