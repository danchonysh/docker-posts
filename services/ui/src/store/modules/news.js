export default {
	state: {
		news: []
	},
	actions: {
		getNews: async ({ dispatch, commit }) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: '/news',
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
					url: '/news',
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
					url: `/news/${id}`,
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
					url: `/news/${id}`,
					method: 'PUT',
					data: body,
					success: res => {
						commit('editNews', res.data)
						resolve()
					},
					failure: err => reject(err) 
				})
			}, { root: true })
		}
	},
	mutations: {
		getNews: (state, data) => state.news = data,
		addNews: (state, news) => state.news.push(news),
		deleteNews: (state, _id) => state.news.filter(({ _id: nid }) => nid !== _id),
		editNews: (state, news) => state.news.map(item => item._id === news._id ? news : item)
	},
	getters: {
		allNews: state => state.news.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
	}
}