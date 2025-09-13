import colors from 'tailwindcss/colors'
import type { Config } from 'tailwindcss'

export default {
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
        secondary: {
            50: '#EEFFF6',
            100: '#D8FFEE',
            200: '#B3FFDE',
            300: '#78FDC4',
            400: '#2BF19D',
            500: '#0CDB84',
            600: '#03B66B',
            700: '#078E55',
            800: '#0B7046',
            900: '#0C5B3C',
            950: '#003320',  
        }
      },
    },
  }
} satisfies Config