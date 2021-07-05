<template>
	<v-card
		:height="height"
		dark
		class="my-2"
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
			default: "400"
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
