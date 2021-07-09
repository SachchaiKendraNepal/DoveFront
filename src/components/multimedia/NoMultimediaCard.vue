<template>
	<v-card
		class="pa-4"
		color="no-data-gradient"
	>
		<div class="d-flex justify-center">
			<v-chip class="text-center"
				color="rgba(0, 0, 0, .1)"
			>
				{{ text }}
			</v-chip>
		</div>
		<v-card-actions class="d-flex justify-center">
			<v-btn
				color="rgba(0, 0, 0, .1)"
				to="/home/multimedia/images"
			>
				Images
			</v-btn>
			<v-btn
				color="rgba(0, 0, 0, .1)"
				to="/home/multimedia/videos"
			>
				Videos
			</v-btn>
			<v-btn
				color="rgba(0, 0, 0, .1)"
				to="/home/multimedia/youtube"
			>
				Youtube
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "NoMultimediaCard",
	props: {
		text: {
			type: String,
			required: true
		}
	},
}
</script>

<style scoped>

</style>
