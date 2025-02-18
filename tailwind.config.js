/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1976d2",
        secondary: "#ff4081",
        text: {
          primary: "#000000",
          lightGray: "#AFB2BF",
          extraGray: "#999DAA",
          thinGray: "#C5C7D4",
        },
        coolgray: "#161D29",
        hotgray:'#000814',
        lightWhite: "#DBDDEA",
        borderGray: "#2C333F",
        textGray: "#6E727F",
        success: "#06D6A0",
        yellow: "#FFD60A",
        tableGray: "#838894",
        footerBorder: "#424854",
      },

      height: {
        loginLayout: "calc(100vh - 70px)",
      },

      maxWidth:{
        50:'50rem'
      },

      fontSize: {
        12:'12px',
        14: "14px",
        16: "16px",
        18: "18px",
        24: "24px",
        30: "30px",
        36: "36px",
      },
    },
  },
  plugins: [],
};
