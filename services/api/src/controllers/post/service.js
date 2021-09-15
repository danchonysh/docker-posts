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

exports.removePost = async id => {
	if (!id) throw Error('DELETE_POST_ERROR: LEAKINGid')
	const result = await repository.removePost(id)
	return result
}

exports.editPost = async (id, body) => {
	if (!id) throw Error('EDIT_POST_ERROR: LEAKINGid')
	const result = await repository.editPost(id, body)
	return result
}