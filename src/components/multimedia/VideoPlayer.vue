<template>
	<v-card
		:height="height"
		max-width="100%"
		dark
		class="ma-0 pa-0"
	>
		<video
			:poster="poster"
			controls
			height="100%"
			width="100%"
			:src="src"
			@play="onPlay"
		/>
	</v-card>
</template>

<script>
import HtmlVideoMixin from "@/mixins/HtmlVideoMixin..js";

export default {
	name: "VideoPlayer",
	mixins: [HtmlVideoMixin],
	props: {
		height: {
			type: String,
			default: "40vh"
		},
		src: {
			type: String,
			required: true
		},
		poster: {
			type: String,
			default: null
		}
	},
}
</script>

<style scoped>

</style>
