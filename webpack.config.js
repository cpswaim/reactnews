var webpack = require('webpack'),
    path = require('path');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

var alias = {
    'bootstrap-material-design': ''
};

var plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
];

if (PROD) {
    prodAlias = {
        'react': 'react/dist/react.min.js',
        'react-dom': 'react-dom/dist/react-dom.min.js'
    };

    prodPlugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ];

    Object.assign(alias, prodAlias);
    plugins = plugins.concat(prodPlugins);
}


module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        './src/scripts/app.jsx'
        // './Hello.jsx'
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+|.*)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+|.*)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+|.*)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+|.*)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+|.*)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+|.*)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }]
    },
    output: {
        filename: "app.js",
        path: __dirname + '/build'
    },
    resolve: {
        root: path.resolve(__dirname, 'src'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
        alias
    },
    plugins
}
