const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development', // 実行モード
    entry: {
      style: './src/scss/index.scss',
    },　// エントリーポイント
    output: { // 出力設定
        path: path.resolve(__dirname, 'public'), // 絶対パス
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 不要なJSファイルは削除
    new FixStyleOnlyEntriesPlugin({
      silent: true
    }),
    // cssの出力先を指定する
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
    })
  ],
}
