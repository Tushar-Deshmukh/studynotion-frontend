/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#1976d2',
        secondary:"#ff4081",
        text:{
          primary:"#000000",
          lightGray:"#AFB2BF",
          extraGray:'#999DAA',
          thinGray:'#C5C7D4',
        },
        coolgray:"#161D29",
        lightWhite:'#DBDDEA',
        borderGray:'#2C333F',
        success:'#06D6A0',
        yellow:'#FFD60A'
      },
      fontSize:{
        14:'14px',
        16:'16px',
      }
    },
  },
  plugins: [],
}

