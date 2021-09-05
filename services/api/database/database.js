const mongoose = require('mongoose')
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST } = require('../constants')
const link = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/posts?authSource=admin`

const createConnection = () =>  mongoose.connect(link, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

module.exports = createConnection