<template>
	<main>
		<div class="content">
			<div class="btn-wrapper">
				<nav class="tab">					
					<ul class="tab__list">
						<Tab
							v-for="(tab, index) in tabs" 
							:key="tab.title"
							:tab="tab"
							@click.native="tabClick(index)"
						/>
					</ul>
				</nav>
				<button 
					class="add" 
					@click="showModal(display ? 'post' : 'news')">
					Add
				</button>
			</div>
			<article 
				:class="{
					'tab__item' : true,
					'change' : changing
				}">
				<div class="posts" v-show="display">
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
				<div class="news" v-show="!display">
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

export default {
	components: { Tab, Post, News, Loader },
	computed: mapGetters(['allPosts', 'allNews', 'tabs', 'display', 'changing']),
	methods: {
		...mapActions(['changeDisplay', 'changeTab', 'isChanging', 'showModal', 'getNews', 'getPosts', 'updateTime']),
		tabClick(idx) {
			if (this.display !== idx) {
				this.changeTab(idx)
				this.isChanging(true)
				setTimeout(() => {
					this.changeDisplay(idx)
				}, 300)
				setTimeout(() => {
					this.isChanging(false)
				}, 1000)
			}
		}
	},
	async mounted() {
		await this.getNews()
		await this.getPosts()
		setInterval(() => {
			this.updateTime(Date.now())
		}, 60000)		
	}
} 
</script>