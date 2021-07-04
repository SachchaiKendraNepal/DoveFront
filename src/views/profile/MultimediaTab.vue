<template>
	<div>
		<StartAPostComponent />
		<v-btn block
			height="45"
			@click="$bus.emit('open-start-post-dialog')"
		>
			<v-icon>mdi-video-vintage</v-icon>
			<span class="pl-2">add new multimedia</span>
		</v-btn>
		<div class="py-2" />
		<profile-no-content
			v-if="myMultimedias.length === 0"
			:text="noContentText"
		/>
		<div v-else>
			<v-tabs
				v-model="tab"
				class="my-6"
				background-color="transparent"
				color="purple"
				grow
			>
				<v-tab
					v-for="(item, index) in items"
					:key="index"
				>
					{{ item.title }}
				</v-tab>
			</v-tabs>
			<v-tabs-items v-model="tab">
				<v-tab-item>
					<profile-no-content
						v-if="videoUrls.length === 0"
						text="You have not uploaded any videos yet."
					/>
					<youtube-play-list
						:creator="$helper.getCurrentUser()"
						model-name="multimedia video"
						delete-action="multimedia/deleteVideoUrl"
						:video-urls="videoUrls"
						@reload="$bus.emit('refresh-me')"
					/>
				</v-tab-item>
				<v-tab-item>
					<profile-no-content
						v-if="videos.length === 0"
						text="You have not uploaded any videos yet."
					/>
					<video-play-list
						v-else
						:creator="$helper.getCurrentUser()"
						:videos="videos"
						model-name="multimedia video"
						delete-action="multimedia/deleteVideo"
					/>
				</v-tab-item>
			</v-tabs-items>
		</div>
	</div>
</template>
<script>

import StartAPostComponent from "@/components/StartPost.vue";
import YoutubePlayList from "@/components/YoutubePlayList.vue";
import VideoPlayList from "@/components/VideoPlayList.vue";

export default {
	name: "ProfileMultimediaTabView",
	components: {VideoPlayList, YoutubePlayList, StartAPostComponent},
	data: () => ({
		tab: null,
		items: [
			{title: "Youtube Videos"},
			{title: "Uploaded Videos"}
		],
		noContentText: "You do not have uploaded any videos yet." +
			" You can create a new multimedia item with some informative" +
			" videos about your experience with Sachchai Kendra Nepal."
	}),
	computed: {
		myMultimedias() {
			return this.$helper.getCurrentUser()["my_multimedias"]
		},
		videoUrls() {
			let temp = []
			this.myMultimedias.forEach(multimedia => {
				multimedia["multimedia_video_urls"].forEach(videoUrl => {
					temp.push(videoUrl)
				})
			})
			return temp
		},
		videos() {
			let temp = []
			this.myMultimedias.forEach(multimedia => {
				multimedia["multimedia_videos"].forEach(video => {
					video["title"] = multimedia.title
					temp.push(video)
				})
			})
			return temp
		}
	}
}
</script>
