//@ts-check

'use strict';

const path = require('path');
// If you decide to use ForkTsCheckerWebpackPlugin
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: 'node',
	mode: 'none', // Consider changing to 'development' for development mode to leverage better debugging and faster builds.

  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // Enable transpileOnly to speed up compilation
              // You can rely on ForkTsCheckerWebpackPlugin for type checking
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  // Adjust devtool for development. For production builds, consider 'source-map' or 'hidden-source-map' for better debugging support.
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'nosources-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      // Optional: configure the plugin for TypeScript type checking
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        // Adjust mode as needed; 'write-references' can be useful in certain scenarios
        mode: 'write-references',
      },
    })
  ],
  infrastructureLogging: {
    level: "log",
  },
};

module.exports = [ extensionConfig ];
