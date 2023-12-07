import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
