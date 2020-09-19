<template>
	<v-card id="start-post-card" class="mx-auto mb-4" outlined>
		<v-hover close-delay="1" v-slot:default="{ hover }">
			<div
				id="start-post-box"
				class="d-flex align-center mx-4 mt-4 mb-1 pt-1 py-2"
			>
				<v-avatar tile size="38" class="mx-4" id="start-post-av">
					<v-img :src="writePostIcon" />
				</v-avatar>
				<p class="pa-0 ma-0" id="start-a-post">Start a post</p>
			</div>
		</v-hover>
		<v-divider />
		<v-card-actions class="d-flex justify-space-around" id="start-post-actions">
			<v-btn x-small depressed class="py-5">
				<v-icon left size="24" color="#3aaada">mdi-camera</v-icon>
				<span>Images</span>
			</v-btn>
			<v-btn x-small depressed class="py-5">
				<v-icon left size="24" color="#9896f2">mdi-music</v-icon>
				<span>Audios</span>
			</v-btn>
			<v-btn x-small depressed class="py-5">
				<v-icon left size="24" color="#9896f2">mdi-video</v-icon>
				<span>Videos</span>
			</v-btn>
			<v-btn x-small depressed class="py-5">
				<v-icon left size="24" color="#ef7e37">mdi-post</v-icon>
				<span>Write Article</span>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<style scoped>
	#start-post-av {
		opacity: 0.7;
	}

	#start-a-post {
		font-size: 24px;
		font-weight: bold;
		font-family: "Acme", sans-serif;
		letter-spacing: 2px;
		color: #4f5151;
	}

	#start-post-box:hover {
		background-color: #e3f0fc;
	}

	#start-post-actions button span {
		font-size: 12px !important;
		font-weight: bold;
	}

	@media only screen and (max-width: 974px) and (min-width: 600px) {
		#start-post-actions span {
			display: none;
		}
	}
	@media only screen and (max-width: 480px) {
		#start-post-actions span {
			display: none;
		}
	}
	@media only screen and (min-width: 1260px) and (max-width: 1470px) {
		#start-post-actions span {
			display: none;
		}
	}
</style>
<script>
	export default {
		name: "AddPostBoxComponent",
		data() {
			return {
				writePostIcon: require("@/assets/write_post_icon.jpg")
			}
		}
	}
</script>
