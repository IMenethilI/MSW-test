import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // // 设置生产环境下的环境变量
  // define: {
  //   'process.env': {
  //     NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  //     USE_MOCK: JSON.stringify(process.env.USE_MOCK || false)
  //   }
  // },
})
