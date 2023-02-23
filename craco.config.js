const WebpackBar = require('webpackbar')
const { whenDev } = require('@craco/craco')
const CracoLessPlugin = require('craco-less')
const CracoCSSModules = require('craco-css-modules')

const path = require('path')
const fs = require('fs')

const defaultEntryName = 'main'
const rewireEntries = [] // 多入口

const proxyConfigPath = path.resolve(__dirname, '.proxyIPConfig.js')
const proxyConf = fs.existsSync(proxyConfigPath) ? require(proxyConfigPath) : {}

module.exports = {
  devServer: {
    hot: true,
    proxy: {
      ...proxyConf,
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: '/index.html' }],
    },
  },
  rules: [
    {
      test: /node_modules\/monaco-editor/,
      use: {
        loader: 'babel-loader',
        // if you include your babel config here,
        // you don’t need the `babel.config.json` file
        options: { presets: ['@babel/preset-env'] },
      },
    },
  ],
  babel: {
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          displayName: false,
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true, // 支持在less中书写JavaScript代码
            module: true,
          },
        },
      },
    },
    { plugin: CracoCSSModules },
  ],
  webpack: {
    plugins: [new WebpackBar({ color: '#FF9D9C' })],
    // eslint-disable-next-line no-empty-pattern
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        ...{
          chunks: 'all',
          name: 'true',
          cacheGroups: {
            reactvendor: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'reactvendor',
              priority: 100,
              enforce: true,
            },
            antdDesign: {
              name: 'ant-design',
              test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
              priority: 100,
              enforce: true,
            },
          },
        },
      }

      /**
       * 修改 output
       */
      const prefix = ''
      webpackConfig.output = {
        ...webpackConfig.output,
        ...{
          filename: whenDev(
            () => `${prefix}static/js/bundle.js`,
            `${prefix}static/js/[name].js`,
          ),
          chunkFilename: 'static/js/[name].[contenthash:8].js',
        },
        // path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
        publicPath: '/',
      }

      const defaultEntryHTMLPlugin = webpackConfig.plugins.filter(plugin => {
        return plugin.constructor.name === 'HtmlWebpackPlugin'
      })
      defaultEntryHTMLPlugin.map(html => (html.chunks = [defaultEntryName]))

      // config.entry is not an array in Create React App 4
      if (!Array.isArray(webpackConfig.entry)) {
        webpackConfig.entry = [webpackConfig.entry]
      }

      const multipleEntry = {}
      multipleEntry[defaultEntryName] = webpackConfig.entry

      rewireEntries.forEach(entry => {
        multipleEntry[entry.name] = [].concat(entry.entry)
        // Multiple Entry HTML Plugin
        webpackConfig.plugins.unshift(
          new defaultEntryHTMLPlugin[0].constructor(
            Object.assign({}, defaultEntryHTMLPlugin.options, {
              filename: entry.outPath,
              template: entry.template,
              chunks: [entry.name],
            }),
          ),
        )
      })
      webpackConfig.entry = multipleEntry

      // Multiple Entry Output File
      let names = webpackConfig.output.filename.split('/').reverse()

      if (names[0].indexOf('[name]') === -1) {
        names[0] = '[name].' + names[0]
        webpackConfig.output.filename = names.reverse().join('/')
      }

      return webpackConfig
    },
  },
}
