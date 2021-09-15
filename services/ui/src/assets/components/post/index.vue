<template>
	<div class="item-container" @click="show = false">

		<Options :show="show" @enable-edit="enableEdit()" @delete="deletePost()" />

		<div @dblclick="editing ? $refs.upload.click() : null" @click.stop :style="image"
			:class="{
				'post': true,
				'moved': show
			}"
		>
			<template v-if="editing">
				<textarea @dblclick.stop :style="prevHeight" maxlength="194" v-model="newPost.caption" class="post__text input" type="text" />
				<label ref="upload" for="upload" />
				<input @change="getPreview()" type="file"  id="upload" ref="file" style="display: none;" accept="image/*" />
			</template>
			<p v-else class="post__text" ref="content">{{ post.caption }}</p>

			<div class="post__footer" @dblclick.stop>

				<Confirmation v-if="editing" @confirm="confirmEdit()" @cancel="cancelEdit()"/>

				<span v-else-if="!activeContentItem" class="post__options" @click="toggleButtons()">
					&hellip;
				</span>
				<p class="post__time" ref="time">{{ editing ? 'editing' : time }}</p>
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
import { DELETE_POST, EDIT_POST } from '../../../store/posts/strings'
import { SET_ACTIVE_CONTENT_ITEM } from '../../../store/page/strings'

export default {
	components: { Confirmation, Options },
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
		...mapActions([DELETE_POST, EDIT_POST, SET_ACTIVE_CONTENT_ITEM]),
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
				await this[EDIT_POST]({ data, _id: this.post._id })
				this.editing = false
				this.newPost = {
					image: null,
					caption: this.post.caption
				}
				this.$refs.time.textContent = 'just now'
			}
		},
		async deletePost() {
			return await this[DELETE_POST](this.post._id)
		}
	},
	computed: {
		...mapGetters(['contentType', 'currentTime', 'activeContentItem']),
		image() {
			const prev = this.preview
			const image = prev
				? `url(${prev})` 
				: `url(uploads/${this.post.image})`
			return { backgroundImage: image }
		},
		time() {
			return formatting(this.post.date, this.currentTime)
		}
	},
	watch: {
		editing() {
			this[SET_ACTIVE_CONTENT_ITEM](this.editing ? this.post._id : false)
		}
	}
}
</script>