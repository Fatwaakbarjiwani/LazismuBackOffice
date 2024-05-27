/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
        Madimi: ["Madimi One", "sans-serif"],
      },
      colors: {
        primary: " rgba(246, 143, 40)",
        GREENDARK: "#436850",
        GREENDARK2: "#1E2F24",
        DARKBLUE05: "#6148FF",
        DARKBLUE04: "#EBF3FC",
        DARKBLUE03: "#489CFF",
        DARKBLUE02: "#D0B7E6",
        DARKBLUE01: "#E2D4F0",
        LIMEGREEN05: "#AA9B87",
        LIMEGREEN04: "#D4C2A8",
        LIMEGREEN03: "#FFE9CA",
        LIMEGREEN02: "#FFF0DC",
        LIMEGREEN01: "#FFF8ED",
        ALERTRED: "#FF0000",
        ALERTYELLOW: "#F9CC00",
        ALERTGREEN: "#73CA5C",
        NEUTRAL05: "#222222",
        NEUTRAL04: "#3C3C3C",
        NEUTRAL03: "#8A8A8A",
        NEUTRAL06: "#ECF0EE",
        NEUTRAL02: "#D0D0D0",
        LightBlue5: "#EBF3FC",
        LightBlue4: "#489CFF",
        DEEPGRAY: "#8A8A8A",
        YELLOW05: "#FFBE05",
        YELLOW04: "#FFFCF2",
        BLUE05: "#1E3A5F",
        WHITE05: "#FDFDFD",
        WHITE01: "#3b3b3b",
        GRAY01: "#F5F6FA",
      },
      dropShadow: {
        "3xl": "0 15px 15px rgba(0, 0, 0, 0.25)",
        "green-shadow": "-5px 5px 5px #73CA5C",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      boxShadow: {
        green: "0 0px 25px 2px rgba(124, 252, 0, 1)",
      },
    },
  },
  plugins: [
    // require("flowbite/plugin")
  ],
};
