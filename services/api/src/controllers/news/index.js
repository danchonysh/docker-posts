const service = require('./service')

const newsController = {}

newsController.getNews = async (_, res, next) => {
	try {
		const result = await service.getAllNews()
		res.status(200).json(result)
	} catch(err) {
		console.warn('Error: ', e)
		next()
	}
}

newsController.createNews = async (req, res, next) => {
	try {
		const result = await service.createNews(req.body)
		res.status(201).json(result)
	} catch(err) {
		console.warn('Error: ', err)
		next()
	}
}

newsController.removeNews = async (req, res, next) => {
	try {
		const result = await service.removeNews(req.params.id)
		res.status(200).json(result)
	} catch(err) {
		console.warn('Error: ', err)
		next()
	}
}

newsController.editNews = async (req, res, next) => {
	try {
		const result = await service.editNews(req.body, req.params.id)
		res.status(200).json(result)
	} catch(err) {
		console.warn('Error: ', err)
		next()
	}
}

module.exports = newsController