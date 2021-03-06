<template>
	<v-card
		v-if="event"
		flat
		class="event-tab"
	>
		<v-card-text v-if="event.created_by">
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
					class="ma-2"
				>
					<v-badge
						bordered
						color="error"
						overlap
					>
						<template #badge>
							<v-icon class="badge-close"
								@click="removeVideoUrls(index)"
							>
								mdi-close
							</v-icon>
						</template>
						<youtube-iframe
							:video-url="videoUrl"
							class="rounded"
						/>
					</v-badge>
				</v-col>
			</v-row>
			<v-row v-if="videos.length>0"
				no-gutters
				justify="center"
				align="center"
				class="pb-4"
			>
				<v-col v-for="(video, index) in videosToUpload" :key="index"
					cols="12" xl="4"
					md="4"
					lg="4" sm="4"
				>
					<v-badge
						bordered
						overlap
						color="grey darken-2"
					>
						<template #badge>
							<v-icon
								x-small
								class="badge-close"
								@click="removeVideo(index)"
							>
								mdi-close
							</v-icon>
						</template>
						<div class="video-item-to-upload">
							<a :href="video.videoUrl"
								target="_blank"
							>{{ video.name }}</a>
						</div>
					</v-badge>
				</v-col>
			</v-row>
			<div
				v-if="ifWriterIsCurrentUser"
				class="upload-image-container"
			>
				<file-upload
					id="multimedia-uploader"
					v-model="eventVideosForUpload"
					:multiple="true"
					class="cursor-pointer"
					@input-file="inputVideoFile"
					@input-filter="inputVideoFilter"
				>
					<div class="upload-image">
						Add video to event
					</div>
				</file-upload>
			</div>
		</v-card-text>
		<v-card-text
			v-if="ifWriterIsCurrentUser"
		>
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
		<v-card-text v-if="videos.length > 0 || videoUrls.length > 0">
			<div class="d-flex justify-center pa-2">
				<v-btn color="orange"
					dark
					@click="uploadEventVideos"
				>
					Upload
				</v-btn>
			</div>
		</v-card-text>
		<v-card-title class="headline pb-0">
			<v-icon large>
				mdi-video
			</v-icon>
			<span class="pl-4 quick-sand-font">Event Videos</span>
		</v-card-title>
		<v-row
			v-if="event.video_urls"
			class="ma-0 pa-0"
		>
			<v-col>
				<div
					v-if="event.video_urls.length === 0"
					class="no-videos"
				>
					No videos added yet!
				</div>
				<youtube-play-list v-else
					:video-urls="event.video_urls"
					:creator="event.created_by"
					model-name="event video"
					delete-action="event/deleteVideoUrl"
				/>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import {getFormData} from "@/Helper";
import VueUploadComponent from "vue-upload-component";
import {mapGetters} from "vuex";

export default {
	name: "EventMultimedias",
	components: {
		YoutubeIframe: () => import("@/components/multimedia/YoutubeIframe.vue"),
		YoutubePlayList: () => import("@/components/multimedia/YoutubePlayList.vue"),
		FileUpload: VueUploadComponent,
	},
	data: () => ({
		eventVideosForUpload: [],
		videos: [],
		videoUrls: [],
		videosToUpload: [],
	}),
	computed: {
		...mapGetters({
			event: "event/detail"
		}),
		ifWriterIsCurrentUser() {
			if (!this.event) return false
			if (!this.event.created_by) return false
			return this.$helper.ifWriterIsCurrentUser(this.event.created_by.username)
		}
	},
	methods: {
		inputVideoFile(latest) {
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
		removeVideo(index) {
			this.videosToUpload.splice(index, 1)
			this.videos.splice(index, 1)
		},
		inputVideoFilter(newFile, oldFile, prevent) {
			if (newFile && !oldFile) {
				// Filter file extension
				if (!/\.(webm|mp4|mpeg|flv)$/i.test(newFile.name)) {
					alert("Unsupported file type selected. Please select valid image file.")
					return prevent()
				}
			}
		},
		removeVideoUrls(index) {
			this.videoUrls.splice(index, 1)
		},
		removeVideosToUpload() {
			this.videos.splice(index, 1)
			this.videosToUpload.splice(index, 1)
		},
		async uploadEventVideos() {
			let added
			if (this.videos.length > 0) {
				const body = await getFormData({
					videos: this.videos,
				})
				added = await this.$store.dispatch("event/addVideoListFor", {
					id: this.event.id,
					body: body
				})
			}
			if (this.videoUrls.length >0) {
				added = await this.$store.dispatch("event/addVideoUrlListFor", {
					id: this.event.id,
					body: {
						video_urls: this.videoUrls
					}
				})
			}
			if (added) {
				await this.$store.dispatch("event/fetchSingle", {id: this.$route.params.id})
				this.videosToUpload = []
				this.videos = []
				this.videoUrls = []
			}
		}
	}
}
</script>
<style lang="scss">
.video-list-name {
	font-family: 'Mate SC', serif;
	font-size: 1.2rem;
}
.no-videos {
	display: flex;
	color: #88889a;
	align-items: center;
	justify-content: center;
	text-align: center;
	background: aliceblue url(./../../../assets/noEventVideos.jpg) no-repeat;
	background-size: 100%;
	margin: 12px;
	height: 180px;
	border-radius: 5px;
}
.badge-close {
	z-index: 1;
}
.video-item-to-upload {
	padding: 10px;
	background: #7affcf;
	border-radius: 5px;
	a {
		font-weight: bold;
	}
}
</style>
