import ContentClass from '../../assets/libs/ContentClass'
const { url } = require('../urls')

export default {
	state: {
		posts: [],
		formattedTime: []
	},
	actions: {
		getPosts: async ({ dispatch, commit }) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}posts`,
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
					url: `${url}posts`,
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
		deletePost: async ({ dispatch, commit }, id) => {
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}posts/${id}`,
					method: 'DELETE',
					success: res => {
						commit('deletePost', id)
						resolve()
					},
					failure: err => reject(err)
				}, { root: true })
			})
		},
		editPost: async ({ dispatch, commit }, payload) => {
			const { id, data } = payload
			return new Promise((resolve, reject) => {
				dispatch('request', {
					url: `${url}posts/${id}`,
					method: 'PUT',
					data,
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					success: res => {
						commit('editPost', { body: res.data, id })
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
		editPost: (state, { body, id }) => {
			const { image, caption } = body
			state.posts.edit({_id: id}, {
				image,
				caption,
				date: state.posts.getDate()
			})
		}
	},
	getters: {
		allPosts: state => state.posts.newFirst,
	}
}