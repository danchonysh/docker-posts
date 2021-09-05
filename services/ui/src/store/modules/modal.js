import toLocal from '../../assets/libs/toLocal'

export default {
	state: {
		news: false,
		post: false,
		warn: false
	},
	actions: {
		showModal: ({ commit }, type) => commit('showModal', type),
		hideModal: ({ commit }, type) => commit('hideModal', type)
	},
	mutations: {
		showModal: (state, type) => state[type] = true,
		hideModal: (state, type) => state[type] = false
	},
	getters: {
		modals: (state) => ({
			news: state.news,
			post: state.post,
			warn: state.warn
		}) 
	}
}