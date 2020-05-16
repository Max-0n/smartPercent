const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SassLintPlugin = require('sass-lint-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PugLintPlugin = require('puglint-webpack-plugin');

const config = {
  entry: {
    app: './src/app.ts'
  },
  output: {
    filename: "[name].[hash].bundle.js",
    path: path.resolve(__dirname, 'docs')
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new CleanWebpackPlugin(),
    new SassLintPlugin(),
    new PugLintPlugin({
      context: 'src',
      files: '**/*.pug',
      config: Object.assign({ emitError: true }, require('./.pug-lintrc'))
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          "ts-loader",
          {
            loader: "tslint-loader",
            options: {
              emitErrors: false,
              fix: true,
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader?pretty=true'
      },
      {
        //IMAGE LOADER
        test: /\.(jpe?g|png|gif|svg|mp3)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]'
        }
      },
      {
        test : /.css$|.scss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),

              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules']
              }
            },
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'fonts'
        }
      }
    ]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {}
  if (argv.mode === 'production') {
    config.module.rules
      .find(rule => String(rule.test) == String(/\.tsx?$/)).use
      .find(rule => typeof rule === 'object' && rule.loader === 'tslint-loader')
      .options.emitErrors = true;
    // config.plugins[1] = new HtmlWebpackPlugin({ template: './src/index.pug', inject: false });
  }
  return config;
}
