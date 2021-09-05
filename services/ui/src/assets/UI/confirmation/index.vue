<template>
  	<div class="confirm">
		<span
			class="confirm__button ok"
			@click="$emit('confirm')">
			OK
		</span>
		<span
			class="confirm__button cancel"
			@click="$emit('cancel')">
			Cancel
		</span>
	</div>
</template>

<script>
import './confirmation.scss'

export default {

}
</script>