module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  safelist: [],
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        main: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#3B60E4",
          secondary: "#7CC6FE",
          accent: "#5DFDCB",
        }
      }
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: false,
  },
}
