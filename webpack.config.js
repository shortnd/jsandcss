const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        main: './src/js/main.js',
        main: './src/sass/main.sass'
    },
    output: {
        filename: 'js/[name].js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/public/css/'
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ]
            },
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader'
            // },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
              },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]?[hash]'
                }
              }
        ]
    },
    // resolve: {
    //     alias: {
    //       'vue$': 'vue/dist/vue.esm.js'
    //     },
    //     extensions: ['*', '.js', '.vue', '.json']
    //   },
    plugins: [
        // new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
    devtool: '#eval-source-map',
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }