
import Api from './Api'

const api = new Api({ api_url: `http://${document.location.host}/api/` })

api.News = api.simpleApi('/news')
api.Post = api.simpleApi('/posts')

export default api