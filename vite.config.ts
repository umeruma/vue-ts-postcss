import { loadEnv, ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'
import { ViteEjsPlugin } from 'vite-plugin-ejs'

const CWD = process.cwd()

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {

  const {
    VITE_DIST_PATH,
    VITE_ASSETS_PATH,
    VITE_META_PATH,
  } = loadEnv(mode, CWD)

  const metaData = {
    asset_base: VITE_META_PATH,
    title: 'Title',
    description: '',
    og_title: '',
    og_url: '',
  }

  const inputSource = {
    main: resolve(__dirname, 'index.html'),
  }

  return {
    base: VITE_ASSETS_PATH,
    build: {
      outDir: VITE_DIST_PATH,
      rollupOptions: {
        input: inputSource,
      },
    },
    esbuild: {
      drop: (
        (command == 'build')
        && (mode != 'with-debug'))
        ? ['console', 'debugger']
        : [],
    },
    plugins: [
      vue(),
      svgLoader({
        svgo: false,
        defaultImport: 'url',
      }),
      ViteEjsPlugin(metaData),
    ],
    server: {
      host: '0.0.0.0',
    },
  }
}
