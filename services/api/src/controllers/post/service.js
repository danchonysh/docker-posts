const repository = require('./repository')

exports.getAllPosts = async () => {
	const result = await repository.getAll()
	return result
}

exports.createPost = async data => {
	const { image, caption } = data
	if (!image || !caption) throw new Error('POST_CREATE_ERROR: LEAKING_DATA')
	const result = await repository.createPost(data) 
	return result
}

exports.removePost = async _id => {
	if (!_id) throw Error('DELETE_POST_ERROR: LEAKING_ID')
	const result = await repository.removePost(_id)
	return result
}

exports.editPost = async (_id, body) => {
	if (!_id) throw Error('EDIT_POST_ERROR: LEAKING_ID')
	const result = await repository.editPost(_id, body)
	return result
}