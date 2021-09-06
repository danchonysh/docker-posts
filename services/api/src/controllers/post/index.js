const service = require('./service')
const multer = require('../../middleware/upload')

const upload = multer.single('image')

const postController = {}

postController.getPosts = async (req, res, next) => {
	try {
		let result
		const limit = +getParams(req.url).limit
		if (limit) {
			result = await service.getLimitedPosts(limit)
		} else {
			result = await service.getAllPosts()
		}
		res.status(200).json(result)
	} catch(err) {
		console.warn('Error: ', err)
		next()
	}
}

postController.createPost = async (req, res, next) => {
	try {
		upload(req, res, async (err) => {
			if (err) {
				res.json({ status: err })
			}
			if (req.file && req.body) {
				const post = {
					image: req.file.path,
					caption: req.body.caption,
					date: new Date().toLocaleString()
				}
				const result = await service.createPost(post)
				res.status(201).json(result)
			}
 		})
	} catch(err) {
		console.warn('Error: ', err)
		next()
	}
}

postController.removePost = async (req, res, next) => {
	try {
		const result = await service.removePost(req.params.id)
		res.status(200).json(result)
	} catch(err) {
		console.warn('Error: ', err)
		next()
	}
}

postController.editPost = async (req, res, next) => {
	try {
		upload(req, res, async err => {
			if (err) {
				res.json({ status: err })
			}
			if (req.file && req.body) {
				const post = {
					image: req.file.path,
					caption: req.body.caption,
					prev: req.body.prev,
					date: req.body.date
				}
				const result = await service.editPost(post, req.params.id)
				res.status(201).json(result)
			} else if (req.body) {
				const post = {
					caption: req.body.caption,
					date: req.body.date
				}
				const result = await service.editPostText(post, req.params.id)
				res.status(201).json(result)
			}
 		})
	} catch(err) {
		console.warn('Error: ', err)
		next()
	}
}

module.exports = postController