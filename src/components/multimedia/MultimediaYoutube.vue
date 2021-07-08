<template>
	<div>
		<v-card v-for="y in videos"
			:key="y.id"
			class="my-2 pa-0"
			min-height="40vh"
			width="100%"
		>
			<v-card height="40vh">
				<youtube
					ref="yt"
					height="100%"
					width="100%"
					:video-id="$youtube.getIdFromUrl(y.video_url)"
					@playing="playing"
				/>
			</v-card>
			<v-card-title>
				{{ y.yt_info.title }}
			</v-card-title>
			<multimedia-action />
		</v-card>
	</div>
</template>

<script>
import YTMixin from "@/mixins/YTMixin..js";
import MultimediaAction from "@/components/multimedia/MultimediaAction.vue";

export default {
	name: "MultimediaYoutube",
	components: {MultimediaAction},
	mixins: [YTMixin],
	props: {
		videos: {
			type: Array,
			required: true
		}
	},
}
</script>

<style scoped>

</style>
