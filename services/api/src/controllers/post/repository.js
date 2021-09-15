const path = require('path')
const fs = require('fs')
const db = require('../../database')

exports.getAll = async () => {
	const posts = await db.query('SELECT * FROM post')
	return posts.rows
}

exports.createPost = async data => {
	const { caption, image, date } = data

	const created = await db.query('INSERT INTO post (caption, image, date) values ($1, $2, $3) RETURNING *', [ caption, image, date ])
	console.log(created)
	return created.rows[0]
}

exports.removePost = async id => {
	const deleted = await db.query('SELECT * FROM post where id = $1', [ id ])
	console.log(deleted)
	fs.unlink(path.resolve(__dirname, `../../public/uploads/${deleted.rows[0]?.image}`), err => {
		if (err) throw new Error('DELETE_POST_ERROR: DELETE_FILE_ERROR')
	})

	await db.query('DELETE FROM post where id = $1 RETURNING *', [ id ])
	return deleted.rows[0]
}

exports.editPost = async (id, { image, caption, date }) => {
	const postReq = await db.query('SELECT * FROM post where id = $1', [ id ])
	const post = postReq?.rows?.[0]
	if (!post) throw new Error('DELETE_POST_ERROR: POST_NOT_EXIST')

	if (image) {
		fs.unlink(path.resolve(__dirname, `../../public/uploads/${post.image}`), err => {
			if (err) throw new Error('DELETE_POST_ERROR: DELETE_PREV_FILE_ERROR')
		})
		post.image = image
	}
	post.caption = caption
	post.date = date

	const params = []
	let query = 'UPDATE post set '

	for (let key in post) {
		if (!post.hasOwnProperty(key) || !post[key]) continue
		params.push(post[key])
		query += `${key} = $${params.length}, `
	}

	query = query.slice(0, -2) + ` where id = $${params.length + 1} RETURNING *`
	params.push(id)
	console.log(query, params)

	const editedReq = await db.query(query, params)
	const edited = editedReq?.rows?.[0]
	console.log(edited)
	return edited
}