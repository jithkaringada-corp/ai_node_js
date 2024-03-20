/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',  // 512px
        '144': '36rem',  // 576px
        // Add more as needed
      }, 
      width: {
        '128': '32rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}