import ContentClass from '../../assets/libs/ContentClass'

export default {
	state: {
		posts: [],
		formattedTime: []
	},
	actions: {
		getPosts: async ({ dispatch, commit }) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: '/posts',
					success: res => {
						commit('getPosts', res.data)
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
		addPost: async ({ dispatch, commit }, data) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: '/posts',
					method: 'POST',
					data,
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					success: res => {
						commit('addPost', res.data)
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
		deletePost: async ({ dispatch, commit }, _id) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `/posts/${_id}`,
					method: 'DELETE',
					success: res => {
						commit('deletePost', _id)
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
		editPost: async ({ dispatch, commit }, payload) => {
			const { _id, data } = payload
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `/posts/${_id}`,
					method: 'PUT',
					data,
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					success: res => {
						commit('editPost', { body: res.data, _id })
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
	},
	mutations: {
		getPosts: (state, content) => state.posts = new ContentClass({
			pattern: [ 'image', 'caption', '_id', 'date', '__v' ],
			content
		}),
		addPost: (state, posts) => state.posts.add(posts),
		deletePost: (state, id) => state.posts.remove({_id: id}),
		editPost: (state, { body, _id }) => state.posts.edit({ _id }, body)
	},
	getters: {
		allPosts: state => state.posts.newFirst,
	}
}