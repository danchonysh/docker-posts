const service = require('./service')
const multer = require('../../libs/upload')

const upload = multer.single('image')

const postController = {}

postController.getPosts = async (_, res, next) => {
	try {
		const result = await service.getAllPosts()
		res.status(200).json(result)
	} catch(err) {
		console.warn('Error: ', err)
		next()
	}
}

postController.createPost = async (req, res, next) => {
	try {
		upload(req, res, async err => {
			if (err) throw new Error('POST_CREATE_ERROR: UPLOAD_ERROR')
			if (!req.file || !req.body) throw new Error('POST_CREATE_ERROR: LEAKING_DATA')
			const post = {
				image: req.file.filename,
				caption: req.body.caption,
				date: new Date()
			}
			const result = await service.createPost(post)
			res.status(201).json(result)
 		})
	} catch(err) {
		console.warn('Error: ', err)
		next(err)
	}
}

postController.removePost = async (req, res, next) => {
	try {
		const result = await service.removePost(req.params.id)
		res.status(202).json(result)
	} catch(err) {
		console.warn('Error: ', err)
		next(err)
	}
}

postController.editPost = async (req, res, next) => {
	try {
		upload(req, res, async err => {
			if (err) throw new Error('POST_CREATE_ERROR: UPLOAD_ERROR')
			const { path: image, caption } = { ...req.file, ...req.body }
			const data = { image, caption, date: new Date() }
			const result = await service.editPost(req.params.id, data)
			res.status(202).json(result)
 		})
	} catch(err) {
		console.warn('Error: ', err)
		next(err)
	}
}

module.exports = postController