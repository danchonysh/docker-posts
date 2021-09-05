<template>
	<ul 
		:class="{
			'buttons__list': true,
			'hidden__list': !show
		}">
		<li 
			class="buttons__list-item edit"
			@click="$emit('enable-edit')">
			Edit
		</li>
		<li 
			class="buttons__list-item remove"
			@click="$emit('delete')">
			Remove
		</li>
	</ul>
</template>

<script>
import './options.scss'

export default {
	props: {
		show: {
			Type: Boolean,
			required: true
		}
	}
}
</script>