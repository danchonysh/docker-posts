const mongoose = require('mongoose')
const link = 'mongodb://mongodb:27017/posts'

const createConnection = () =>  mongoose.connect(link, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

module.exports = createConnection