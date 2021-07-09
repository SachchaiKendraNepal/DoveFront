<template>
	<v-card
		flat
		min-height="82vh"
		color="transparent"
	>
		<no-multimedia-card v-if="youtube_medias.length === 0"
			text="Youtube database is empty."
		/>

		<multimedia-youtube
			class="mx-1"
			:videos="youtube_medias"
		/>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "Youtube",
	components: {
		NoMultimediaCard: import("@/components/multimedia/NoMultimediaCard.vue"),
		MultimediaYoutube: import("@/components/multimedia/MultimediaYoutube.vue")
	},
	computed: {
		...mapGetters({
			multimedias: "multimedia/list"
		}),
		youtube_medias() {
			if(!this.multimedias) return []
			if(!this.multimedias.results) return []
			let temp = []
			this.multimedias.results.forEach(media => {
				temp = temp.concat(media["multimedia_video_urls"])
			})
			return temp
		}
	}
}
</script>
