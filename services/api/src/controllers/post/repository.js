const path = require('path')
const fs = require('fs')
const { Post } = require('../../models')

exports.getLimited = async (limit) => {
	return await Post.find({}).sort({_id: -1}).limit(limit).exec()
}

exports.getAll = async () => {
	return await Post.find({}).sort({_id: -1}).exec()
}

exports.createPost = async (data) => {
	const post = await new Post(data).save()
	return post
}

exports.removePost = async _id => {
	const post = await Post.findOneAndDelete(_id)
	fs.unlink(path.resolve(__dirname, `../../../uploads/${post.image}`), err => {
		if (err) {
			console.log(err)
		}
	})

	const deleted = await Post.deleteOne({_id: id}).exec()
	return deleted
}

exports.editPost = async (body, id) => {
	const post = { ...body }
	delete post.prev
	if (body.prev) fs.unlink(path.resolve(__dirname, `../../../${body.prev}`), err => {
		if (err) {
			console.log(err)
		}
	})
	const edited = await Post.findOneAndUpdate({_id: id}, post).exec()
	return edited
}

exports.editPostText = async (body, id) => {
	const edited = await Post.findOneAndUpdate({_id: id}, body).exec()
	return edited
}