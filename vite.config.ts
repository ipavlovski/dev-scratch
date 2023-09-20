import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import FullReload from 'vite-plugin-full-reload'

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [react()], // FullReload(['src/app.tsx'])

    server: {
      port: parseInt(process.env.VITE_PORT!),
      host: true,
      https: {
        key: `${process.env.HOME}/.config/ssl/local/local.key`,
        cert: `${process.env.HOME}/.config/ssl/local/local.crt`
      }
    },

    resolve: {
      alias: [
        {
          find: 'src',
          replacement: `${__dirname}/src`
        },
        {
          find: 'styled-system',
          replacement: `${__dirname}/styled-system`
        }
      ]
    }
  })
}
