<template>
	<tab-item-card value="tab-Multimedia">
		<template #content>
			<v-card class="ma-2 pa-0">
				<v-card-title class="headline">
					My Sounds
				</v-card-title>
				<APlayer
					ref="player"
					class="my-3 mx-4"
					:music="list[0]"
					:list="list"
					:mutex="true"
					:controls="true"
					preload="true"
					theme="indigo"
					list-max-height="230px"
				/>
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
						class="ma-0 pa-0"
						xl="3"
						lg="4"
						md="4"
						sm="6"
					>
						<youtube
							ref="youtube"
							class="pa-1"
							:video-id="getId(item.videoUrl)"
							:resize="true"
							:resize-delay="1"
							:fit-parent="true"
							@playing="item.playing"
						/>
					</v-col>
				</v-row>
			</v-card>
		</template>
	</tab-item-card>
</template>
<script>
import APlayer from "vue-aplayer"

export default {
	name: "ProfileMultimediaTabView",
	components: {
		TabItemCard: () => import("@/components/ProfileTabItem"),
		APlayer,
	},
	data: () => ({
		list: [
			{
				title: "Sound Helix 1",
				artist: "Kiran Parajuli",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
				pic: "https://bd.gaadicdn.com/processedimages/hero/passion-pro-110/640X309/passion-pro-1105e5ddca2e3a50.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 2",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 3",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 1",
				artist: "Kiran Parajuli",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
				pic: "https://bd.gaadicdn.com/processedimages/hero/passion-pro-110/640X309/passion-pro-1105e5ddca2e3a50.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 2",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 3",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 1",
				artist: "Kiran Parajuli",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
				pic: "https://bd.gaadicdn.com/processedimages/hero/passion-pro-110/640X309/passion-pro-1105e5ddca2e3a50.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 2",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 3",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
		],
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
	computed: {
		player() {
			return this.$refs.youtube.player
		},
	},
	methods: {
		playVideo() {
			this.player.playVideo()
		},
		playing() {
			console.log("\o/ we are watching!!!")
		},
		getId(url) {
			return this.$youtube.getIdFromUrl(url)
		}
	}
}
</script>
