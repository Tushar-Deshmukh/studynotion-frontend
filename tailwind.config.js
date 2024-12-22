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
        
        },
        coolgray:"#161D29"
      }
    },
  },
  plugins: [],
}

