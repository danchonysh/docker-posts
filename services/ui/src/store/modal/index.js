import { SHOW_MODAL, HIDE_MODAL, GET_MODAL } from './strings' 

export default {
	state: {
		news: false,
		post: false,
		warn: false
	},
	actions: {
		[SHOW_MODAL]: ({ commit }, type) => commit(SHOW_MODAL, type),
		[HIDE_MODAL]: ({ commit }, type) => commit(HIDE_MODAL, type)
	},
	mutations: {
		[SHOW_MODAL]: (state, type) => state[type] = true,
		[HIDE_MODAL]: (state, type) => state[type] = false
	},
	getters: {
		modals: state => ({
			news: state.news,
			post: state.post,
			warn: state.warn
		}) 
	}
}