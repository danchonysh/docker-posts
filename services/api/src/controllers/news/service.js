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

exports.removeNews = async id => {
	if (!id) throw Error('DELETE_NEWS_ERROR: LEAKINGid')
	const result = await repository.removeNews(+id)
	return result
}

exports.editNews = async (id, body = {}) => {
	if (!id) throw Error('EDIT_NEWS_ERROR: LEAKINGid')
	const result = await repository.editNews(id, body)
	return result
}