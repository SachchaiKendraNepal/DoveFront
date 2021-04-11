<template>
	<base-post-detail
		:target="multimedia"
		:is-article="false"
	>
		<template #imageCarousel>
			<v-carousel height="77vh">
				<v-carousel-item
					v-for="item in multimediaImages"
					:key="item.src"
					:src="item.src"
					reverse-transition="fade-transition"
					transition="fade-transition"
				/>
				<v-carousel-item
					v-for="item in multimediaVideos"
					:key="item.src"
					reverse-transition="fade-transition"
					transition="fade-transition"
				>
					<vue-player
						:v-model="item.playing"
						:src="item.videoUrl"
						:poster="item.videoPosterImageUrl"
						:title="item.videoPosterTitle"
					/>
				</v-carousel-item>
			</v-carousel>
		</template>
		<template #audios>
			<APlayer
				ref="player"
				class="my-6"
				:music="list[0]"
				:list="list"
				:mutex="true"
				:controls="true"
				preload="true"
				theme="indigo"
				list-max-height="100px"
			/>
		</template>
		<template #comments>
			<comments-detail :id="multimedia.id" />
		</template>
	</base-post-detail>
</template>
<script>
import vuePlayer from "@algoz098/vue-player"
import APlayer from "vue-aplayer"
// import $ from "jquery"

export default {
	name: "MultimediaDetailView",
	components: {
		vuePlayer,
		APlayer,
		BasePostDetail: () => import("@/components/post/_postDetail"),
		CommentsDetail: () => import("@/views/post/CommentsDetail"),
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
		videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
		videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
		videoPosterTitle: "ALICE IN THE WONDERLAND",
		isLiked: false,
		now: null,
		selection: 1,
		loading: false,
		multimediaImages: [
			{
				id: 1,
				src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
			},
			{
				id: 2,
				src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
			},
			{
				id: 3,
				src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
			},
			{
				id: 4,
				src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
			},
		],
		multimediaVideos: [
			{
				id: 1,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
			},
			{
				id: 2,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
			},
			{
				id: 3,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
			}
		],
		multimedia: {
			id: 1,
			title: "How beautiful is nature?",
			description: "Nature The word nature is a commonly used word." +
				"This word is used in a variety of contexts. Perhaps the most important reference is the multiple " +
				"species of plants, animals, wildlife, and all that the earth contains from topography such as " +
				"mountains, valleys, beaches, and seas. , And forests. The beauty of nature The nature of man is " +
				"characterized by its beauty resulting mainly from the wonderful diversity of living organisms that " +
				"exist in various parts of the earth, as well as the unique terrain of mountains, water, plateaus and " +
				"forests. Each of these features is distinguished by a special beauty that distinguishes it from Other " +
				"terrain, and this great diversity gave people wide spaces to seek calm, tranquility, and tranquility.",
			uploaded_by: "Kiran Parajuli",
			uploaded_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
			updated_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
			is_approved: true,
			approved_by: "Kiran Parajuli",
			approved_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")
		},
	}),
	// mounted: function () {
	// let height = $(window).height()
	// $(".hero").attr("style", `height: ${height - 166 }px !important`)
	// $(window).resize(function () {
	// 	console.log("here")
	// 	height = $(window).height()
	// 	$(".hero").height(height - 166)
	// })
	// }
}
</script>
<style lang="sass" scoped>
::v-deep div.title
	text-align: center !important
</style>
