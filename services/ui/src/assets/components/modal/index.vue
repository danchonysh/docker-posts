<template>
	<aside :class="{ 'modal': true, 'show': modals[type], 'hide': !modals[type] }" ref="modal" @click="hideModal(type)">
		<div @click.stop
			:class="{
				'modal__window': true, 'open': modals[type], 'close': !modals[type]
			}"
			:style="{ width: `min(80%, ${width}px)`}">
			<h2 class="modal__header">{{ title }}</h2>
			<slot :name="type"></slot>
			<div class="modal__footer">
				<button
					v-for="button in buttons"
					:class="{ 'modal__button': true, [button.class]: !!button.class }" 
					:key="button.text"  
					@click="button.onClick(type)"
				>
					{{ button.text }}
				</button>
			</div>
		</div>
	</aside>
</template>

<script>
import './modal.scss'

import { mapActions, mapGetters } from 'vuex'
import { HIDE_MODAL, SHOW_MODAL } from '../../../store/modal/strings'

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
		},
		buttons: {
			Type: Array,
			default: () => []
		}
	},
	methods: {
		...mapActions([SHOW_MODAL, HIDE_MODAL]),
		showModal(type) {
			return this[SHOW_MODAL](type)
		},
		hideModal(type) {
			return this[HIDE_MODAL](type)
		}
	},
	computed: mapGetters(['modals']),
	mounted() { this.$refs.modal.classList.remove('hide') }
}
</script>