import Vue from 'vue'
import Vuex from 'vuex'

import posts from './posts'
import news from './news'
import pageState from './modules/page-state'
import modal from './modules/modal'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: { posts, news, pageState, modal }
})