import toLocal from '../../assets/libs/toLocal'
import { SET_CONTENT_TYPE, SET_ACTIVE_CONTENT_ITEM, SET_ACTIVE_TAB, SET_CONTENT_ANIMATION, SET_CURRENT_TIME } from './strings'

export default {
	state: {
		pageState: JSON.parse(localStorage.getItem('page-state')) ??
		{
			display: 0,
			tabs: [
				{
					title: 'News',
					active: true
				},
				{
					title: 'Posts',
					active: false
				}
			],
		},
		changing: false,
		oneActive: false,
		currentTime: Date.now()
	},
	actions: {
		[SET_CURRENT_TIME]: ({ commit }, time) => commit(SET_CURRENT_TIME, time),
		[SET_ACTIVE_CONTENT_ITEM]: ({ commit }, value) => commit(SET_ACTIVE_CONTENT_ITEM, value),
		[SET_CONTENT_TYPE]: ({ commit }, config) => commit(SET_CONTENT_TYPE, config),
		[SET_ACTIVE_TAB]: ({ commit }, idx) => commit(SET_ACTIVE_TAB, idx),
		[SET_CONTENT_ANIMATION]: ({ commit }, value) => commit(SET_CONTENT_ANIMATION, value)
	},
	mutations: {
		[SET_CURRENT_TIME]: (state, time) => state.currentTime = time,
		[SET_ACTIVE_CONTENT_ITEM]: (state, value) => state.oneActive = value,
		[SET_CONTENT_TYPE]: (state, config) => {
			state.pageState.display = config
			toLocal(state.pageState, 'page-state')
		},
		[SET_ACTIVE_TAB]: (state, idx) => {
			state.pageState.tabs.forEach(el => el.active = false)
			state.pageState.tabs[idx].active = true
			toLocal(state.pageState, 'page-state')
		},
		[SET_CONTENT_ANIMATION]: (state, value) => state.changing = value
	},
	getters: {
		currentTime: state => state.currentTime,
		activeContentItem: state => state.oneActive,
		contentType: state => state.pageState.display,
		tabsState: state => state.pageState.tabs,
		isAnimated: state => state.changing
	}		
}
