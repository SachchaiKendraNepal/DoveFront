<template>
	<v-card
		min-height="82vh"
		color="transparent"
	>
		<div class="py-1" />
		<v-text-field label="search"
			name="search"
			solo hide-details="auto"
			prepend-inner-icon="mdi-magnify"
		/>
		<no-multimedia-card v-if="videos.length === 0"
			text="Video database is empty."
		/>
		<multimedia-video
			v-for="video in videos"
			v-else
			:key="video.id"
			class="mx-1"
			:video="video"
		/>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "Videos",
	components: {
		NoMultimediaCard: () => import("@/components/multimedia/NoMultimediaCard.vue"),
		MultimediaVideo: () => import("@/components/multimedia/MultimediaVideo.vue")
	},
	computed: {
		...mapGetters({
			multimedias: "multimedia/list"
		}),
		videos() {
			if(!this.multimedias) return []
			if(!this.multimedias.results) return []
			let temp = []
			this.multimedias.results.forEach(media => {
				temp = temp.concat(media["multimedia_videos"])
			})
			return temp
		}
	}
}
</script>
