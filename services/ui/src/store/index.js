import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import posts from './modules/posts'
import news from './modules/news'
import pageState from './modules/page-state'
import modal from './modules/modal'

Vue.use(Vuex)

export default new Vuex.Store({
	actions: {
		async request(ctx, {
			url, 
			success,
			failure,
			method,
			data,
			headers
		}) {
			const config = {
				url,
				method: method ?? 'GET'
			}
			if (data) {
				config.headers = headers ?? { 'Content-Type': 'application/json'}
				config.data = data
			}
			
			axios.request(config)
				.then(success)
				.catch(failure)
		}
	},
	modules: {
		posts, 
		news,
		pageState,
		modal
	}	
})