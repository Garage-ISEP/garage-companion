
const WorkboxPlugin = require('workbox-webpack-plugin');

export default config => {
	config.plugins.push(
		new WorkboxPlugin.InjectManifest({
			swSrc: './src/sw.js',
			swDest: './sw.js',
			include: [/\.html$/, /\.js$/, /\.svg$/, /\.css$/, /\.png$/, /\.ico$/]
		})
	);

	return config;
};