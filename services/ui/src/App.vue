<template>
    <div class="wrapper">
		<Header />
		<Content />
		<Footer />

		<Modal :title="'Add Post'" :type="'post'"
			:buttons="[
				{ text: 'Add', class: 'ok', onClick: postHandler },
				{ text: 'Cancel', class: 'cancel', onClick: hideModal }
			]"
		>
			<form slot="post" @submit.prevent ref="form" class="new-post" enctype="multipart/form-data">
				<input @change="fileHandler()" ref="file" name="image" class="new-post__photo" id="file" type="file" accept="image/*">
				<label for="file" class="upload">
					{{ text }}
				</label>
				<textarea v-model="newPost.caption" maxlength="194" name="caption" class="new-post__content" type="text" placeholder="Write something" />
			</form>
		</Modal>

		<Modal :title="'Add News'" :type="'news'"
			:buttons="[
				{ text: 'Add', class: 'ok', onClick: newsHandler },
				{ text: 'Cancel', class: 'cancel', onClick: hideModal }
			]"
		>
			<form slot="news" @submit.prevent class="new-aritcle">
				<input v-model="newArticle.title" name="title" class="new-article__title" type="text" placeholder="Title">
				<textarea v-model="newArticle.article" name="article" class="new-article__content" type="text" placeholder="Article" />
			</form>
		</Modal>

		<Modal title="Warning" type="warn" :width="300"
			:buttons="[ { text: 'OK', class: 'ok', onClick: hideModal } ]"
		>
			<p slot="warn" class="modal__content-warning">Please, fill in the blank!</p>
		</Modal>
		
    </div>
</template>

<script>
import './assets/scss/default.scss'

import Header from './assets/layouts/header'
import Content from './assets/layouts/content'
import Footer from './assets/layouts/footer'
import Modal from './assets/components/modal'

import { mapActions } from 'vuex'
import { POST_NEWS } from './store/news/strings'
import { POST_POST } from './store/posts/strings'
import { SHOW_MODAL, HIDE_MODAL } from './store/modal/strings'

const defaultText = 'Choose a file'

export default { 
	components: { Header, Content, Footer, Modal },
	data: () => ({
		newArticle: {
			title: '',
			article: ''
		},
		newPost: {
			caption: '',
			image: ''
		},
		text: defaultText,
	}),
	methods: {
		...mapActions([SHOW_MODAL, HIDE_MODAL, POST_NEWS, POST_POST]),
		fileHandler() {
			const image = this.$refs.file.files[0]
			this.newPost.image = image
			const fileName = image.name
			this.text = fileName.length > 12 
				? fileName.slice(0,12) + '...'
				: fileName
		},
		newsHandler() {
			const title = this.newArticle.title.trim()
			const article = this.newArticle.article.trim()
			if (title && article) {
				this.hideModal('news')
				this[POST_NEWS]({ title, article })
				this.newArticle = { title: '', article: '' }
			} else {
				this[SHOW_MODAL]('warn')
			}
		},
		postHandler() {
			const { caption, image } = this.newPost
			if (caption.trim() && image) {
				this.hideModal('post')
				const formData = new FormData()
				formData.append('image', image)
				formData.append('caption', caption)
				this[POST_POST](formData)
				this.newPost = { caption: '', image: '' }
				setTimeout(() => this.text = defaultText, 500)
			} else {
				this[SHOW_MODAL]('warn')
			}
		},
		hideModal(value) {
			return this[HIDE_MODAL](value)
		}
	}
}
</script>