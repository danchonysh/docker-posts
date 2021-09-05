import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import posts from './modules/posts'
import news from './modules/news'
import pageState from './modules/page-state'
import modal from './modules/modal'
import { BASE_URL } from '../constants'

Vue.use(Vuex)

console.log(BASE_URL)
const api = axios.create({ baseURL: BASE_URL })

export default new Vuex.Store({
	actions: {
		async request(_, { url, success, failure, method = 'GET', data, headers }) {
			const config = { url, method }
			if (data) {
				config.headers = headers ?? { 'Content-Type': 'application/json'}
				config.data = data
			}
			
			api.request(config)
				.then(success)
				.catch(failure)
		}
	},
	modules: { posts,  news, pageState, modal }
})