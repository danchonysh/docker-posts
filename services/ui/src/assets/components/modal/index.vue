<template>
	<aside 
		:class="{
			'modal' : true,
			'show' : modals[type],
			'hide' : !modals[type]
		}"
		ref="modal"
		@click="hideModal(type)">
		<div 
			@click.stop
			:class="{
				'modal__window' : true,
				'open' : modals[type],
				'close' : !modals[type]
			}"
			:style="{ width: `min(50%, ${width}px)`}">
			<h2 class="modal__header">{{ title }}</h2>
			<slot :name="type"></slot>
		</div>
	</aside>
</template>

<script>
import './modal.scss'

import { mapActions, mapGetters } from 'vuex'

export default {
	props: {
		title: {
			Type: String,
			required: true
		},
		type: {
			Type: String,
			required: true
		},
		width: {
			Type: Number,
			default: 400
		}
	},
	methods: mapActions(['showModal', 'hideModal']),
	computed: mapGetters(['modals']),
	mounted() { this.$refs.modal.classList.remove('hide') }
}
</script>