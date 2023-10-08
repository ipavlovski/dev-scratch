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
      keyframes: {
        marquee: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        ball: {
          from: {
            transform: 'rotate(0) translateY(-6.5em)',
          },
          '50%': {
            transform: 'rotate(180deg) translateY(-6em)',
          },
          to: {
            transform: 'rotate(360deg) translateY(-6.5em)',
          },
        },
        ballInnerShadow: {
          from: {
            transform: 'rotate(0)',
          },
          to: {
            transform: 'rotate(-360deg)',
          },
        },
        ballOuterShadow: {
          from: {
            transform: 'rotate(20deg)',
          },
          to: {
            transform: 'rotate(-340deg)',
          },
        },
        ballTexture: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(50%)',
          },
        },
        trackCover: {
          from: {
            transform: 'rotate(0)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      tokens: {
        fonts: {
          jakarta: { value: 'Plus Jakarta Sans, sans-serif' },
          pacifico: { value: 'Pacifico, cursive;' },
        },
      },
    },
  },

  // hash classnames for devtools readability
  hash: { cssVar: false, className: true },

  // enable codegen components
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
})
