const repository = require('./repository')

exports.getAllNews = async () => {
	const result = await repository.getAll()
	return result
}

exports.createNews = async data => {
	const { title, article } = data
	if (!title || !article) throw Error('CREATE_NEWS_ERROR: NOT_ENOUGH_DATA')
	const result = await repository.createNews(data) 
	return result
}

exports.removeNews = async _id => {
	if (!_id) throw Error('DELETE_NEWS_ERROR: LEAKING_ID')
	const result = await repository.removeNews(+_id)
	return result
}

exports.editNews = async (_id, body = {}) => {
	if (!_id) throw Error('EDIT_NEWS_ERROR: LEAKING_ID')
	const result = await repository.editNews(_id, body)
	return result
}