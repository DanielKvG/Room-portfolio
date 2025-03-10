import colors from 'tailwindcss/colors'
import type { Config } from 'tailwindcss'

//export default <Partial<Config>>{
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        myBlue: {
            50: '#EEF6FF',
            100: '#D9E9FF',
            200: '#BBDAFF',
            300: '#8DC3FF',
            400: '#57A1FF',
            500: '#307CFF',
            600: '#1A5CF6',
            700: '#1245E1',
            800: '#1639B7',
            900: '#183590',
            950: '#132258',  
        },
      },
    },
  }
}