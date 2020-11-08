<template>
	<tab-item-card value="tab-Multimedia">
		<template #content>
			<v-card class="my-4">
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
				<v-row justify="start"
					align="center"
				>
					<v-col
						v-for="(item, keyring) in multimediaVideos"
						:key="keyring"
						cols="12"
						xl="6"
						lg="6"
						md="6"
					>
						<vue-player
							:v-model="item.playing"
							:src="item.videoUrl"
							:poster="item.videoPosterImageUrl"
							:title="item.videoPosterTitle"
							class="mx-4 my-3"
						/>
					</v-col>
				</v-row>
			</v-card>
		</template>
	</tab-item-card>
</template>
<script>
import vuePlayer from "@algoz098/vue-player";
import APlayer from "vue-aplayer";

export default {
	name: "ProfileMultimediaTabView",
	components: {
		TabItemCard: () => import("@/components/ProfileTabItem"),
		vuePlayer,
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
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
				duration: null
			},
			{
				id: 2,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
				duration: null
			},
			{
				id: 3,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
				duration: null
			}
		],
	})
}
</script>
