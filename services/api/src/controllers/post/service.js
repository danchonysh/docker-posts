const repository = require('./repository')

exports.getLimitedPosts = async (limit) => {
	const result = await repository.getLimited(limit);
	return result
}

exports.getAllPosts = async () => {
	const result = await repository.getAll();
	return result
}

exports.createPost = async (data) => {
	const {image, caption} = data
	if (!image) {
		throw Error
	}
	if (!caption) {
		throw Error
	}
	const result = await repository.createPost(data) 
	return result
}

exports.removePost = async (id) => {
	if (!id) {
		throw Error
	}
	const result = await repository.removePost(+id)
	return result
}

exports.editPost = async (body, id) => {
	if (!id) {
		throw Error
	}
	if (!body.caption && !body.image) {
		throw Error
	}
	const result = await repository.editPost(body, id)
	return result
}

exports.editPostText = async (body, id) => {
	if (!id) {
		throw Error
	}
	if (!body.caption) {
		throw Error
	}
	const result = await repository.editPostText(body, id)
	return result
}