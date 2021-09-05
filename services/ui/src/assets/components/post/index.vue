<template>
	<div class="item-container" @click="show = false">
		<Options
			:show="show"
			@enable-edit="enableEdit()"
			@delete="deletePost(post._id)"
		/>
		<div 
			@dblclick="editing ? $refs.upload.click() : null"
			@click.stop
			:class="{
				'post': true,
				'moved': show
			}"
			:style="image">
			<template v-if="editing">
				<textarea @dblclick.stop
					:style="prevHeight"
					maxlength="194"
					v-model="newPost.caption"
					class="post__text input"
					type="text">
				</textarea>
				<label ref="upload" for="upload"></label>
				<input 
					@change="getPreview()"
					type="file" 
					id="upload"
					ref="file"
					style="display: none;"
					accept="image/*">
			</template>
			<p v-else class="post__text" ref="content">{{post.caption}}</p>
			<div class="post__footer" @dblclick.stop>
				<Confirmation 
					v-if="editing"
					@confirm="confirmEdit()"
					@cancel="cancelEdit()"/>
				<span
					v-else-if="!oneActive"
					class="post__options"
					@click="toggleButtons()">
					&hellip;
				</span>
				<p class="post__time" ref="time">{{editing ? 'editing' : time }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import './post.scss'

import formatting from '../../libs/timeFormatting'
import Confirmation from '../../UI/confirmation'
import Options from '../../UI/options'
import { mapActions, mapGetters } from 'vuex'

export default {
	components: {
		Confirmation,
		Options
	},
	props: {
		post: {
			Type: Object,
			required: true
		}
	},
	data() {
		return {
			prevHeight: null,
			show: false,
			editing: false,
			newPost: {
				image: this.post.image,
				caption: this.post.caption,
			},
			preview: ''
		}
	},
	methods: {
		...mapActions(['deletePost', 'editPost', 'setActive']),
		toggleButtons() {
			this.show = !this.show
		},
		enableEdit() {
			this.show = false
			this.editing = true
			this.prevHeight = {
				height: this.$refs.content.offsetHeight + 'px'
			}
		},
		cancelEdit() {
			this.editing = false
			this.preview = ''
			this.newPost = {
				image: null,
				caption: this.post.caption
			}
		},
		async getPreview() {
			this.newPost.image = this.$refs.file.files[0]
			const reader = new FileReader()
			reader.readAsDataURL(this.newPost.image)
			reader.onload = (e) => {
				this.preview = e.target.result
			}
		},
		async confirmEdit() {
			const { image, caption } = this.newPost
			if ((image || caption) && (image !== this.post.image || caption !== this.post.caption)) {
				const data = new FormData()
				data.append('caption', caption)
				data.append('image', image)
				data.append('prev', this.post.image)
				data.append('date', new Date(Date.now()).toLocaleString())
				await this.editPost({ data, id: this.post._id})
				this.editing = false
				this.newPost = {
					image: null,
					caption: this.post.caption
				}
				this.$refs.time.textContent = 'just now'
			}
		}
	},
	computed: {
		...mapGetters(['oneActive', 'getTime']),
		image() {
			const prev = this.preview
			const image = prev
				? `url(${prev})` 
				: `url(${'http://localhost:3000/' + this.post.image})`
			return { backgroundImage: image }
		},
		time() {
			return formatting(this.post.date, this.getTime)
		}
	},
	watch: {
		editing() {
			this.setActive(this.editing ? this.post._id : false)
		}
	}
}
</script>