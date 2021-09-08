const News = require('./model')

exports.getAll = async () => {
	return await News.find({})
}

exports.createNews = async data => {
	data.date = new Date()
	const created = await News.create(data)
	console.log(created)
	return created
}

exports.removeNews = async _id => {
	const deleted = await News.findOneAndDelete({ _id })
	console.log(deleted)
	return deleted
}

exports.editNews = async (_id, body) => {
	body.date = new Date()
	const edited = await News.findByIdAndUpdate(_id, body, { new: true })
	console.log(edited)
	return edited
}