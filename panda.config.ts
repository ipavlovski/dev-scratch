import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './main.tsx'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          jakarta: { value: 'Plus Jakarta Sans, sans-serif' },
          pacifico: { value: 'Pacifico, cursive;' }
        }
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeout: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      }
    }
  },

  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system'
})
