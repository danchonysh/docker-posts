import api from '../../api'
import { LOAD_NEWS, POST_NEWS, DELETE_NEWS, EDIT_NEWS } from './actions'

export default {
	state: {
		news: []
	},
	actions: {
		[LOAD_NEWS]: async ({ commit }) => api.News.list()
			.then(res => commit(LOAD_NEWS, res))
			.catch(err => console.error(LOAD_NEWS, err)),

		[POST_NEWS]: async ({ commit }, data) => api.News.post(data)
			.then(res => commit(POST_NEWS, res))
			.catch(err => console.error(POST_NEWS, err)),

		[DELETE_NEWS]: async ({ commit }, _id) => api.News.delete(_id)
			.then(res => commit(DELETE_NEWS, res._id))
			.catch(err => console.error(DELETE_NEWS, err)),

		[EDIT_NEWS]: async ({ commit }, { _id, ...data }) => api.News.patch(_id, data)
			.then(res => commit(EDIT_NEWS, res))
			.catch(err => console.error(EDIT_NEWS, err))
	},
	mutations: {
		[LOAD_NEWS]: (state, data) => state.news = data,
		[POST_NEWS]: (state, news) => state.news = [ ...state.news, news ],
		[DELETE_NEWS]: (state, _id) => state.news = state.news.filter(({ _id: nid }) => nid !== _id),
		[EDIT_NEWS]: (state, news) => state.news = state.news.map(item => item._id === news._id ? news : item)
	},
	getters: {
		allNews: state => state.news.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
	}
}