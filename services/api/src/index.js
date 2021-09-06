const createConnection = require('./database')
const app = require('./app')
const { PORT } = require('./constants')

createConnection()
	.then(() => {
		app.listen(PORT, () => console.log('Server has been started...'))
	})
	.catch(err => console.log('Error: ', JSON.stringify(err)))