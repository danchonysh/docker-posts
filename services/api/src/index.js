const app = require('./app')
const { PORT } = require('./constants')

app.listen(PORT, () => console.log('Server has been started...'))