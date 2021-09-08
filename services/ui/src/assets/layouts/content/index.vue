<template>
	<main>
		<div class="content">
			<div class="btn-wrapper">
				<nav class="tab">					
					<ul class="tab__list">
						<Tab
							v-for="(tab, index) in tabsState" 
							:key="tab.title"
							:tab="tab"
							@click.native="tabClick(index)"
						/>
					</ul>
				</nav>
				<button 
					class="add" 
					@click="showModal(contentType ? 'post' : 'news')">
					Add
				</button>
			</div>
			<article 
				:class="{
					'tab__item' : true,
					'change' : isAnimated
				}">
				<div class="posts" v-show="contentType">
					<Loader v-if="!allPosts"/>
					<template v-else-if="allPosts.length">
						<Post
							v-for="post in allPosts"
							:key="post._id"
							:post="post"
						/>
					</template>
					<div v-else class="no-content">There is no posts right now...</div>	
				</div>
				<div class="news" v-show="!contentType">
					<Loader v-if="!allNews"/>
					<template v-else-if="allNews.length">
						<News 
							v-for="news in allNews"
							:key="news._id"
							:news="news"
						/>
					</template>
					<div v-else class="no-content">There is no news right now...</div>
				</div>
			</article>
		</div>
	</main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import './content.scss'
import Tab from '../../UI/tab'
import Post from '../../components/post'
import News from '../../components/news'
import Loader from '../../components/loader'

import { LOAD_NEWS } from '../../../store/news/strings'
import { LOAD_POST } from '../../../store/posts/strings'
import { SET_ACTIVE_TAB, SET_CONTENT_ANIMATION, SET_CONTENT_TYPE, SET_CURRENT_TIME } from '../../../store/page/strings'
import { SHOW_MODAL } from '../../../store/modal/strings'

export default {
	components: { Tab, Post, News, Loader },
	computed: mapGetters(['allPosts', 'allNews', 'tabsState', 'contentType', 'isAnimated']),
	methods: {
		...mapActions([SET_CONTENT_TYPE, SET_ACTIVE_TAB, SET_CONTENT_ANIMATION, SHOW_MODAL, LOAD_NEWS, LOAD_POST, SET_CURRENT_TIME]),
		tabClick(idx) {
			if (this.contentType !== idx) {
				this[SET_ACTIVE_TAB](idx)
				this[SET_CONTENT_ANIMATION](true)
				setTimeout(() => {
					this[SET_CONTENT_TYPE](idx)
				}, 300)
				setTimeout(() => {
					this[SET_CONTENT_ANIMATION](false)
				}, 1000)
			}
		},
		showModal(config) {
			return this[SHOW_MODAL](config)
		}
	},
	async mounted() {
		await this[LOAD_NEWS]()
		await this[LOAD_POST]()
		setInterval(() => {
			this[SET_CURRENT_TIME](Date.now())
		}, 5000)
	}
} 
</script>