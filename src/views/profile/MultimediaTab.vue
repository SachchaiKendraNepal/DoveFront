<template>
	<tab-item-card>
		<template #content>
			<v-card class="ma-2 pa-0">
				<v-card-title class="headline pb-0">
					My Videos
				</v-card-title>
				<v-row
					justify="start"
					align="center"
					class="ma-0 pa-1"
				>
					<v-col
						v-for="(item, keyring) in multimediaVideos"
						:key="keyring"
						cols="12"
						class="ma-0 pa-2"
						xl="3"
						lg="4"
						md="4"
						sm="6"
					>
						<div class="video-container round-touch">
							<iframe :src="prepareEmbedUrl(item.videoUrl)"
								frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							/>
						</div>
					</v-col>
				</v-row>
			</v-card>
		</template>
	</tab-item-card>
</template>
<script>

export default {
	name: "ProfileMultimediaTabView",
	components: {
		TabItemCard: () => import("@/components/ProfileTabItem"),
	},
	data: () => ({
		multimediaVideos: [
			{
				id: 1,
				playing: false,
				videoUrl: "https://www.youtube.com/watch?v=gDFUYsXHiv0&ab_channel=Sachhaikendranepal",
			},
			{
				id: 2,
				playing: false,
				videoUrl: "https://www.youtube.com/watch?v=zutF2cYlOHI&ab_channel=Sachhaikendranepal",
				duration: null
			},
			{
				id: 3,
				playing: false,
				videoUrl: "https://www.youtube.com/watch?v=2m_K_ilFSTY&ab_channel=Sachhaikendranepal",
			}
		],
	}),
	methods: {
		getId(url) {
			return this.$helper.getVideoIdFromYoutubeURL(url)
		},
		prepareEmbedUrl(url) {
			return `https://www.youtube.com/embed/${this.getId(url)}`
		}
	}
}
</script>
