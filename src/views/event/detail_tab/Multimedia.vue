<template>
	<v-tab-item value="tab-multimedia">
		<v-card flat>
			<v-card-text>
				<v-row v-if="videoUrls.length>0"
					no-gutters
					justify="center"
					align="center"
					class="pb-4"
				>
					<v-col v-for="(videoUrl, index) in videoUrls" :key="index"
						cols="12" xl="4"
						md="4"
						lg="4" sm="4"
						class="image-to-upload-col"
					>
						<v-badge
							bordered
							color="error"
							overlap
						>
							<template #badge>
								<v-icon @click="removeVideoUrls(index)">
									mdi-close
								</v-icon>
							</template>
							<youtube-iframe
								:video-url="videoUrl"
							/>
						</v-badge>
					</v-col>
				</v-row>
				<div class="upload-image-container">
					<file-upload
						v-model="eventVideosForUpload"
						:multiple="true"
						class="cursor-pointer"
						@input-file="inputFile"
						@input-filter="inputFilter"
					>
						<div class="upload-image">
							Add video to event
						</div>
					</file-upload>
				</div>
				<div v-if="videos.length > 0"
					class="d-flex justify-center pa-2"
				>
					<v-btn color="orange"
						dark
						@click="uploadEventVideos"
					>
						Upload
					</v-btn>
				</div>
			</v-card-text>
			<v-card-text>
				<v-combobox
					v-model="videoUrls"
					class="ma-0"
					:items="[]"
					label="Video URL"
					type="url"
					clearable
					multiple
					outlined
					small-chips
					hide-selected
					deletable-chips
					hide-details="auto"
					prepend-inner-icon="mdi-video"
					hint="Type youtube video url and press enter to add a new one."
				/>
			</v-card-text>
			<v-card-title class="headline pb-0">
				<v-icon large>
					mdi-video
				</v-icon>
				<span class="pl-4 quick-sand-font">Event Videos</span>
			</v-card-title>
			<v-row class="ma-0 pa-0">
				<v-col v-show="event.video_urls.length === 0">
					<div class="no-videos">
						No videos added yet!
					</div>
				</v-col>
				<v-col
					cols="12"
					class="ma-0"
				>
					<v-card
						v-if="nowPlaying"
						max-width="950"
						height="400"
						class="ma-0 pa-0"
					>
						<youtube-iframe :video-url="nowPlaying" />
					</v-card>
					<v-list>
						<v-list-item v-for="(video_url, index) in event['video_urls']"
							:key="video_url.id"
							@click="1"
						>
							<v-list-item-avatar style="border: 2px solid #8BC34A; background: #8BC34A;">
								<v-icon
									:color="(nowPlaying !== video_url.video_url) ? 'indigo lighten-1' : 'green darken-2'"
								>
									mdi-play
								</v-icon>
							</v-list-item-avatar>
							<v-list-item-content>
								<div class="video-list-name">
									Video {{ index + 1 }}
								</div>
							</v-list-item-content>
							<v-list-item-action>
								<v-btn v-if="!(nowPlaying === video_url.video_url)" icon
									color="red lighten-1"
									@click="nowPlaying = video_url.video_url"
								>
									<v-icon>mdi-play</v-icon>
								</v-btn>
								<div v-else
									class="green--text"
								>
									Currently Playing
								</div>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-col>
			</v-row>
		</v-card>
	</v-tab-item>
</template>
<script>
import {getFormData} from "@/Helper";
import VueUploadComponent from "vue-upload-component";

export default {
	name: "EventDetailMultimediaTabContent",
	components: {
		YoutubeIframe: () => import("@/components/YoutubeIframe"),
		FileUpload: VueUploadComponent,
	},
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		eventVideosForUpload: [],
		videos: [],
		videoUrls: [],
		videosToUpload: [],
		nowPlaying: null,
	}),
	created() {
		if (this.event.video_urls.length > 0) {
			this.nowPlaying = this.event.video_urls[0].video_url
		}
	},
	methods: {
		inputFile(latest) {
			const latestFile = latest.file
			const latestUrl = URL.createObjectURL(latestFile)
			if (/\.(webm|mp4|mpeg|flv)$/i.test(latestFile.name)) {
				this.videosToUpload.push({
					playing: false,
					name: latestFile.name,
					videoUrl: latestUrl,
				})
				this.videos.push(latestFile)
			}
		},
		inputFilter(newFile, oldFile, prevent) {
			if (newFile && !oldFile) {
				// Filter file extension
				if (!/\.(webm|mp4|mpeg|flv)$/i.test(newFile.name)) {
					alert("Unsupported file type selected. Please select valid image file.")
					return prevent()
				}
			}
		},
		removeVideoUrls() {
			this.videoUrls.splice(index, 1)
		},
		removeVideosToUpload() {
			this.videos.splice(index, 1)
			this.videosToUpload.splice(index, 1)
		},
		async uploadEventVideos() {
			const body = await getFormData({
				videos: this.videos,
			})
			const added = await this.$store.dispatch("event/addVideoListFor", {
				id: this.event.id,
				body: body
			})
			if (added) {
				await this.$store.dispatch("event/fetchSingle", {id: this.$route.params.id})
				this.videosToUpload = []
				this.videos = []
			}
		}
	}
}
</script>
<style lang="scss">
.video-list-name {
	font-family: 'Stint Ultra Condensed', cursive;
	font-size: 1.4rem;
}
.no-videos {
	display: flex;
	color: #b07ed4;
	font-weight: bold;
	align-items: center;
	justify-content: center;
	background: aliceblue url(./../../../assets/cinema-clipart-roll.jpg) no-repeat;
	background-size: 100%;
	margin: 12px;
	height: 180px;
}
</style>
