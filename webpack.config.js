const path = require("path");
const Minify = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const html = require('html-withimg-loader');
module.exports = {
	entry:{
		index:"./src/js/index",
		main:"./src/js/main"
	},

	output:{
		path:path.resolve(__dirname, 'dist'),
		filename:"./js/[name].bundle.js"
	},

	mode:'development',

	watch:true,

	devServer:{
		contentBase: path.join(__dirname, 'dist'),
        inline:true,
		port:8787,
		host: '192.168.1.104'
	},

	module:{
		rules:[
		//html
		
		//js
			{
            	test:/\.js$/,
                exclude: /node_modules/,
            	use:['babel-loader']
            		         		
            	
            	
            },
            //less
            {
            	test:/\.less$/,
            	use:[Minify.loader,'css-loader','less-loader']
            },
            {test: /\.css$/, use: ['style-loader', 'css-loader','postcss-loader']},
            //img
            {
            	test:/\.(png|jpg|gif|woff|ttf|eot|svg)$/i,
            	use:[{
            		loader:'url-loader',
            		options:{
            			limit:8192,
            			name:'img/[name].[ext]',
            			// publicPath:'./'
            		}
            	}]
            },

            {
            	test:/\.(htm|html)$/i,
            	use:['html-withimg-loader']
            }


		]
	},

	
	plugins:[

		new HtmlWebpackPlugin({
            title:'meituan1',
            filename:"index.html",
            template: __dirname + "/src/index.html" ,
            chunks:['index']
        }),

        new HtmlWebpackPlugin({
            title:'meituan2',
            filename:"main.html",
            template: __dirname + "/src/main.html" ,
            chunks:['main']
        }),

        new Uglify(),

		new Minify({
			filename:'./css/[name]_[contenthash:8].css'
		})

	]
}