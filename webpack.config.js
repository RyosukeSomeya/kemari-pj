const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development', // 実行モード
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      hot: true,
      open: true
    },
    // entry: './src/js/index.js',
    entry: {
      style: './src/scss/index.scss', // js以外もエントリーポイントにできる
    },
    output: { // 出力設定
        path: path.resolve(__dirname, 'dist'), // 絶対パス
        assetModuleFilename: './assets/images/[hash][ext]',
    },
    module: {
    rules: [
      {
        test: /\.scss$/, // 対象となるファイルの拡張子
        use: [
          { // JSデータをCSSとして外部ファイル化
            loader: MiniCssExtractPlugin.loader
          },
          { // CSSをJSに変換
            loader: 'css-loader',
          },
          { // SCSSをCSSに変換
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ]
      },
      {
        test: /\.(jpe?g|gif|png)$/,
        type: "asset/resource",
      },
      {
        test: /\.ejs$/,
        use: [
          "html-loader",
          "ejs-plain-loader"
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 不要なJSファイルは削除
    new RemoveEmptyScriptsPlugin(),
    // cssの出力先を指定する
    new MiniCssExtractPlugin({
      filename: './assets/css/[name].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src' , 'index.ejs'),
      filename: './index.html',
    }),
  ],
}
