<template>
	<div class="item-container" @click="show = false">
		<Options 
			:show="show"
			@enable-edit="enableEdit()"
			@delete="deleteNews(news._id)"
		/>
		<section
			@click.stop
			:class="{
				'article': true,
				'moved': show
			}">
			<template v-if="editing">
				<input 
					v-model="editedArticle.title"
					class="article__title input"
					type="text">
				<textarea 
					v-model="editedArticle.article"
					:style="prevHeight"
					class="article__content input">
				</textarea>
			</template>
			<template v-else>
				<h3 class="article__title">{{news.title}}</h3>
				<p ref="content" class="article__content">{{news.article}}</p>
			</template>
			<div class="article__footer">
				<Confirmation 
					v-if="editing"
					@confirm="confirmEdit()"
					@cancel="cancelEdit()"/>
				<span
					v-else
					class="article__options" 
					@click="toggleButtons()">
					&hellip;
				</span>
				<p class="article__time" ref="time">{{editing ? 'editing' : time}}</p>
			</div>
		</section>
	</div>
</template>

<script>
import './news.scss'

import formatting from '../../libs/timeFormatting'
import Confirmation from '../../UI/confirmation'
import Options from '../../UI/options'
import { mapActions, mapGetters } from 'vuex'
import { DELETE_NEWS, EDIT_NEWS } from '../../../store/news/strings'

export default {
	components: {
		Confirmation,
		Options
	},
	props: {
		news: {
			Type: Object,
			required: true
		}
	},
	data() {
		return {
			show: false,
			editing: false,
			prevHeight: null,
			editedArticle: {
				title: this.news.title,
				article: this.news.article
			}
		}
	},
	computed: {
		...mapGetters(['currentTime']),
		time() {
			return formatting(this.news.date, this.currentTime)
		}
	},
	methods: {
		...mapActions([ DELETE_NEWS, EDIT_NEWS ]),
		toggleButtons() {
			this.show = !this.show
		},
		enableEdit() {
			this.editing = true
			this.prevHeight = {
				height: this.$refs.content.offsetHeight + 'px'
			}
		},
		cancelEdit() {
			this.editing = false
			this.editedArticle = {
				title: this.news.title,
				article: this.news.article
			}
		},
		async confirmEdit() {
			const { title, article } = this.editedArticle
			if (title && article) {
				await this[EDIT_NEWS]({ _id: this.news._id, title, article })
				this.editing = false
				this.$refs.time.textContent = 'just now'
			}
		},
		async deleteNews() {
			return await this[DELETE_NEWS](this.news._id)
		}
	}
}
</script>