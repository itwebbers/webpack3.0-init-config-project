// zander 2017.12.21

// 引入入依赖
const webpack = require('webpack')
const path = require('path')
const uglify = require('uglifyjs-webpack-plugin')
const htmlPlugin = require('html-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')


// 自动切换开发环境
if(process.env.type == "build"){
    var websit = {
        publicPath: 'http://localhost:8099/'
    }
}else{
    var websit = {
        publicPath: 'http://localhost:8099/'
    }
}

module.exports = {
    // 入口文件配置
    entry: './src/index.js',
    // 出口文件配置
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 添加hash，避免缓存
        filename: '[name]-[hash].js',
        publicPath: websit.publicPath
    },
    // 所需模块，压缩，转化等
    module: {
        rules: [
            {
                test: /\.css/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                },{
                    loader: 'postcss-loader'
                }]
            },
            // {
            //     test: /\.less/,
            //     use: [
            //         {loader: 'style-loader'},
            //         {loader: 'css-loader'},
            //         {loader: 'less-loader'}
            //     ]
            // },
            {
                test: /\.scss/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(html|htm)$/i,
                loader: ['html-withimg-loader']
            },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: [
                    //         'es2015', 'react'
                    //     ]
                    // }
                },
                exclude: '/node_modules'
            }
        ]
    },
    // 插件
    plugins: [
        // 压缩js
        new uglify(),
        // html
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        // 清除dist文件夹
        new cleanPlugin('dist/*.*',{
            root: __dirname,// 根目录
            verbose: true,// 开启在控制台输出信息
            dry: false // 启用删除文件
        }),
        // 打包第三方类库
        new webpack.ProvidePlugin({
            $:"jquery"
        }),
    ],
    // 服务配置
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        compress: true,
        port: 8099
    }
}