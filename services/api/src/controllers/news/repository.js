const db = require('../../database')

exports.getAll = async () => {
	const news = await db.query('SELECT * FROM news')
	return news.rows
}

exports.createNews = async data => {
	const { title, article } = data
	const date = new Date()

	const created = await db.query('INSERT INTO news (title, article, date) values ($1, $2, $3) RETURNING *', [ title, article, date ])
	console.log(created)
	return created.rows[0]
}

exports.removeNews = async id => {
	const deleted = await db.query('DELETE FROM news where id = $1 RETURNING *', [ id ])
	console.log(deleted)
	return deleted.rows[0]
}

exports.editNews = async (id, body) => {
	body.date = new Date()

	const params = []
	let query = 'UPDATE news set '

	for (let key in body) {
		if (!body.hasOwnProperty(key) || !body[key]) continue
		params.push(body[key])
		query += `${key} = $${params.length}, `
	}
	query = query.slice(0, -2) + ` where id = $${params.length + 1} RETURNING *`
	params.push(id)
	console.log(query, params)

	const edited = await db.query(query, params)
	console.log(edited)
	return edited.rows[0]
}