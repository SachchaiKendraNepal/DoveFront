<template>
	<v-tab-item value="tab-multimedia">
		<v-card flat>
			<v-card-title class="headline">
				<v-icon large>
					mdi-music
				</v-icon>
				<span class="pl-4">Event Sounds</span>
			</v-card-title>
			<v-card-text v-show="list.length === 0">
				No sounds added yet!
			</v-card-text>
			<APlayer
				ref="player"
				class="my-3 mx-4"
				:music="list[0]"
				:list="list"
				:mutex="true"
				:controls="true"
				preload="true"
				theme="indigo"
				list-max-height="150px"
			/>
			<v-card-title class="headline pb-0">
				<v-icon large>
					mdi-video
				</v-icon>
				<span class="pl-4">Event Videos</span>
			</v-card-title>
			<v-row class="ma-0 pa-0">
				<v-col v-show="urls.length === 0">
					No videos added yet!
				</v-col>
				<v-col
					v-for="(item, index) in urls"
					:key="index"
					cols="12"
					class="ma-0 pa-0"
				>
					<youtube
						ref="youtube"
						class="pa-4"
						:video-id="getId(item)"
						:resize="true"
						:resize-delay="100"
						:fit-parent="true"
						@playing="playing"
					/>
				</v-col>
			</v-row>
		</v-card>
	</v-tab-item>
</template>
<script>
import APlayer from "vue-aplayer"

export default {
	name: "EventDetailMultimediaTabContent",
	components: {
		APlayer
	},
	props: {
		event: {
			type: Object,
			required: true
		}
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
		urls: [
			"https://www.youtube.com/watch?v=6li2Kib4uI0&ab_channel=Sachhaikendranepal",
			"https://www.youtube.com/watch?v=AQbZmhg4aMs&ab_channel=Sachhaikendranepal",
			"https://www.youtube.com/watch?v=zutF2cYlOHI&ab_channel=Sachhaikendranepal"
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
