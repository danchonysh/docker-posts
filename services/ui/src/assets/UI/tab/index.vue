<template>
	<li 
		:class="{
			'tab__list-item' : true,
			'active' : tab.active
		}"
	>{{tab.title}}</li>
</template>

<script>
import './tab.scss'

export default {
	props: {
		tab: {
			Type: Object,
			required: true
		}
	}
}
</script>