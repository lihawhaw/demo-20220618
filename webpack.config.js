/* eslint-disable @typescript-eslint/no-var-requires */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'
const { NODE_ENV = 'development', PUBLIC_PATH, PORT = 5555 } = process.env
const devMode = NODE_ENV === 'development'
const distPath = '/dist'
const publicPath = !PUBLIC_PATH || devMode ? '/' : PUBLIC_PATH

const isProd = process.env.NODE_ENV === 'production'
const filename = isProd ? '[name].[contenthash]' : '[name]'
const plugins = [
  new HtmlWebpackPlugin({ template: './public/index.html', BASE_URL: publicPath }),
  new CopyPlugin([
    {
      from: __dirname + '/public',
      to: __dirname + distPath,
      toType: 'dir',
      globOptions: {
        dot: true,
        gitignore: true,
        ignore: ['**/index.htm', '**/*.d.ts'],
      },
    },
  ]),
]

if (isProd) {
  plugins.push(new MiniCssExtractPlugin({ filename: `${filename}.css` }))
}
if (isDevelopment) {
  plugins.push(
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockHost: '127.0.0.1:1026',
        // sockPath: '',
      },
    }),
  )
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    home: ['./src/index.tsx'],
  },
  output: {
    filename: `${filename}.js`,
    publicPath,
    path: __dirname + distPath,
  },
  devtool: isProd ? 'none' : 'eval-source-map',
  plugins,
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          isProd
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath },
              }
            : 'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: {
                'primary-color': '#F27E49',
                'link-color': '#4161A3',
                'font-size-base': '12px',
                'border-radius-base': '4px',
              },
            },
          },
        ],
      },
      { exclude: /node_modules/, test: /\.(ts|tsx)?$/, loader: 'ts-loader' },
    ],
  },
  optimization: {
    minimize: isProd,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
          name: 'commons',
          chunks: 'all',
          priority: -1,
        },
        antd: {
          test: /[\\/]node_modules[\\/](antd|rc-|@ant-design)/,
          name: 'antd',
          chunks: 'all',
          priority: -1,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
          priority: -3,
        },
      },
    },
  },
  devServer: {
    contentBase: __dirname + distPath,
    host: '0.0.0.0',
    port: PORT,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
    sockHost: '127.0.0.1',
  },
}
