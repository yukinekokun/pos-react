/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0F1113',
          900: '#14161A',
          800: '#1C1F24',
          700: '#252932',
          600: '#343945'
        },
        ink: {
          100: '#F3F4F1',
          300: '#B9BDC6',
          500: '#7C818C'
        },
        emerald: {
          500: '#12B981',
          600: '#0EA070'
        },
        amber: {
          400: '#F5A623',
          500: '#E0941A'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
}
