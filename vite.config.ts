import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import requireTransform from 'vite-plugin-require-transform'
// import lessVariables from './src/assets/styles/override/lessVariables'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'

const { proxy } = require('./proxyConfigPath')

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      react(),
      // @ts-ignore
      // viteCssModule(),
      viteTsconfigPaths(),
      svgrPlugin(),
      requireTransform({
        fileRegex: /.ts$|.tsx$|.jsx$|.js$/,
      }),
    ],
    define: {
      'process.env.REACT_APP_LABEL': `"${process.env.VITE_APP_LABEL}"`,
      'process.env.IS_VITE': true,
    },
    css: {
      preprocessorOptions: {
        modules: {
          generateScopedName: '[name]__[local]___[hash:base64:5]',
          hashPrefix: 'prefix',
          localsConvention: 'camelCaseOnly',
        },
        less: {
          //   modifyVars: {
          //     hack: `true; @import (reference) "${path.resolve(
          //       __dirname,
          //       'src/assets/styles/less/common/constants.less',
          //     )}";`,
          //     // ...lessVariables,
          //   },
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: '',
        },
      ],
    },
    server: {
      open: true,
      port: 8200,
      host: '0.0.0.0',
    },
  })
}
