const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const apiRouter = require('./routes/api')

app.use('/ui', express.static(path.resolve(__dirname, './public/ui')))
// app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use((req, _, next) => {
	console.log(req.method, req.body, req.params)
	next()
})

app.use('/api', apiRouter)
app.get('/api', (_, res) => {
	res.status(200).send('POSTS_API')
})

app.use((err, req, res, _) => {
	console.error(err.stack)
	return res.status(502).json(err)
})

module.exports = app