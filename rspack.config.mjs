import { rspack } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = process.env.NODE_ENV !== 'production';

/** @type {import('@rspack/core').Configuration} */
export default {
  context: __dirname,
  mode: isDev ? 'development' : 'production',
  entry: {
    main: './src/main.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      // TypeScript / JavaScript — transformed via built-in SWC
      {
        test: /\.(?:js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            detectSyntax: 'auto',
            jsc: {
              transform: {
                react: {
                  runtime: 'automatic',
                  development: isDev,
                  refresh: isDev,
                },
              },
            },
          },
        },
      },
      // CSS Modules
      {
        test: /\.module\.css$/,
        type: 'css/module',
      },
      // Global CSS
      {
        test: /(?<!\.module)\.css$/,
        type: 'css',
      },
      // Images
      {
        test: /\.(png|jpe?g|gif|webp|avif|ico)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: { maxSize: 8 * 1024 }, // inline if < 8 KB
        },
      },
      // SVG — inline as asset (swap for @svgr/webpack if you need React components)
      {
        test: /\.svg$/i,
        type: 'asset/resource',
      },
      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
      title: 'React App',
      favicon: './public/favicon.ico',
    }),
    new rspack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    }),
    // Fast Refresh — only in dev
    isDev && new ReactRefreshRspackPlugin(),
    isDev && new rspack.HotModuleReplacementPlugin(),
    // Progress indicator
    new rspack.ProgressPlugin({}),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  // Built-in CSS experiment (no separate css-loader needed)
  experiments: {
    css: true,
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
  },
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  stats: {
    preset: 'minimal',
  },
};
