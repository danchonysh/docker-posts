import ContentClass from '../../assets/libs/ContentClass'
const { url } = require('../urls')

export default {
	state: {
		news: []
	},
	actions: {
		getNews: async ({ dispatch, commit }) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}news`,
					success: res => {
						commit('getNews', res.data)
						resolve()
					},
					failure: err => {
						reject(err)
					} 
				}, { root: true })
			})
		},
		addNews: async ({ dispatch, commit }, data) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}news`,
					method: 'POST',
					data,
					success: res => {
						commit('addNews', res.data)
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
		deleteNews: async ({ dispatch, commit }, id) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}news/${id}`,
					method: 'DELETE',
					success: res => {
						commit('deleteNews', id)
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
		editNews: async ({ dispatch, commit }, data) => {
			const { id, body } = data
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}news/${id}`,
					method: 'PUT',
					data: body,
					success: res => {
						commit('editNews', { body, id })
						resolve()
					},
					failure: err => reject(err) 
				})
			}, { root: true })
		}
	},
	mutations: {
		getNews: (state, content) => state.news = new ContentClass({
			pattern: [ 'title', 'article', '_id', 'date', '__v' ],
			content
		}),
		addNews: (state, news) => state.news.add(news),
		deleteNews: (state, id) => state.news.remove({_id: id}),
		editNews: (state, { body, id }) => {
			const { article, title } = body
			state.news.edit({_id: id}, {
				article,
				title,
				date: new Date(Date.now()).toLocaleString()
			})
		}
	},
	getters: {
		allNews: state => state.news.newFirst
	}
}