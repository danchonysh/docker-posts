<template>
    <div class="wrapper">
		<Header />
		<Content />
		<Footer />

		<Modal 
			:title="'Add Post'"
			:type="'post'">
			<template slot="post">
				<form 
					@submit.prevent
					ref="form"
					class="new-post" 
					enctype="multipart/form-data">
					<input 
						@change="fileHandler()"
						ref="file"
						name="image"
						class="new-post__photo" 
						id="file" 
						type="file" 
						accept="image/*">
					<label 
						for="file" 
						class="upload">
						{{ text }}
					</label>
					<textarea 
						v-model="newPost.caption"
						maxlength="194"
						name="caption" 
						class="new-post__content" 
						type="text" 
						placeholder="Write something">
					</textarea>
				</form>
				<div class="modal__footer">
					<button
						class="modal__button ok"
						@click="postHandler()">
						Add
					</button>
					<button 
						class="modal__button cancel"
						@click="hideModal('post')">
						Cancel
					</button>
				</div>
			</template>
		</Modal>
		
		<Modal 
			:title="'Add News'"
			:type="'news'">
			<template slot="news">
				<form 
					@submit.prevent
					class="new-aritcle">
					<input
						v-model="newArticle.title"
						name="title" 
						class="new-article__title" 
						type="text" 
						placeholder="Title">
					<textarea 
						v-model="newArticle.article"
						name="article" 
						class="new-article__content" 
						type="text" 
						placeholder="Article">
					</textarea>
				</form>
				<div class="modal__footer">
					<button
						class="modal__button ok"
						@click="newsHandler()">
						Add
					</button>
					<button 
						class="modal__button cancel"
						@click="hideModal('news')">
						Cancel
					</button>
				</div>
			</template>
		</Modal>

		<Modal
			title="Warning"
			type="warn"
			:width="300">
			<template slot="warn">
				<p class="modal__content-warning">
					Please, fill in the blank!
				</p>
				<div class="modal__footer">
					<button 
						class="modal__button ok"
						@click="hideModal('warn')">
						OK
					</button>
				</div>
			</template>
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
		...mapActions(['showModal', 'hideModal', 'addNews', 'addPost']),
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
				this.addNews({
					title,
					article,
					date: new Date(Date.now()).toLocaleString()
				})
				this.newArticle = {
					title: '',
					article: ''
				}
			} else {
				this.showModal('warn')
			}
		},
		postHandler() {
			const { caption, image } = this.newPost
			if (caption.trim() && image) {
				this.hideModal('post')
				const formData = new FormData()
				formData.append('image', image)
				formData.append('caption', caption)
				this.addPost(formData)
				this.newPost = {
					caption: '',
					image: ''
				}
				setTimeout(() => this.text = defaultText, 500)
			} else {
				this.showModal('warn')
			}
		}
	}
}
</script>