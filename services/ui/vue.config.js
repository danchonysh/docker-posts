const production = process.env.NODE_ENV === 'production'

let config = {
	publicPath: production ? './' : '/',
	assetsDir: '',
	filenameHashing: true,
	productionSourceMap: false
}

// if (!production) config = { 
// 	...config,
// 	poweredByHeader: false,
// 	target: 'serverless'
// }

// console.log(config)

module.exports = config