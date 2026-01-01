/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#346F44",
          50: "#e8f5ec",
          100: "#d1ebd9",
          200: "#a3d7b3",
          300: "#75c38d",
          400: "#47af67",
          500: "#346F44",
          600: "#2a5936",
          700: "#1f4329",
          800: "#152c1b",
          900: "#0a160e",
        },
        secondary: {
          DEFAULT: "#141053",
          50: "#e6e5f1",
          100: "#cdcbe3",
          200: "#9b97c7",
          300: "#6963ab",
          400: "#372f8f",
          500: "#141053",
          600: "#100d42",
          700: "#0c0a32",
          800: "#080621",
          900: "#040311",
        },
        accent: {
          DEFAULT: "#E5E0FF",
        },
        background: {
          DEFAULT: "#ECEEF0",
        },
      },
      fontFamily: {
        serif: ["InstrumentSerif-Regular"],
        "serif-italic": ["InstrumentSerif-Italic"],
        oswald: ["Oswald-Regular"],
        "oswald-medium": ["Oswald-Medium"],
        "oswald-semibold": ["Oswald-SemiBold"],
        "oswald-bold": ["Oswald-Bold"],
      },
    },
  },
  plugins: [],
};
