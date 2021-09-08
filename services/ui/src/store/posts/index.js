import api from '../../api'
import { DELETE_POST, EDIT_POST, LOAD_POST, POST_POST } from './strings'

export default {
	state: {
		posts: []
	},
	actions: {
		[LOAD_POST]: async ({ commit }) => api.Post.list()
			.then(res => commit(LOAD_POST, res))
			.catch(err => console.error(LOAD_POST, err)),

		[POST_POST]: async ({ commit }, data) => api.Post.post(data)
			.then(res => commit(POST_POST, res))
			.catch(err => console.error(POST_POST, err)),

		[DELETE_POST]: async ({ commit }, _id) => api.Post.delete(_id)
			.then(res => commit(DELETE_POST, res._id))
			.catch(err => console.error(DELETE_POST, err)),

		[EDIT_POST]: async ({ commit }, { _id, data }) => api.Post.patch(_id, data)
			.then(res => commit(EDIT_POST, res))
			.catch(err => console.error(EDIT_POST, err))
	},
	mutations: {
		[LOAD_POST]: (state, data) => state.posts = data,
		[POST_POST]: (state, post) => state.posts = [ ...state.posts, post ],
		[DELETE_POST]: (state, _id) => state.posts = state.posts.filter(({ _id: nid }) => nid !== _id),
		[EDIT_POST]: (state, post) => state.posts = state.posts.map(item => item._id === post._id ? post : item)
	},
	getters: {
		allPosts: state => state.posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
	}
}