/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //colors used in the project
      colors:{
        primary:"#db2777",
        secondary:"#EF863E",
        btn_completed:"#437D61",
        btn_pending:"#CC2B52",
        btn_inprogress:"#4F959D"
      },
    },
  },
  plugins: [],
};
