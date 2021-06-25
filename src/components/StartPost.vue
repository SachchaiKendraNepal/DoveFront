<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		class="start-post-dialog"
	>
		<v-card class="start-post-card">
			<v-toolbar color="#288dba"
				dark
				height="70"
			>
				<v-avatar
					class="elevation-3 start-post-av"
					size="40"
					tile
				>
					<v-icon size="30">
						mdi-pencil-box
					</v-icon>
				</v-avatar>
				<v-spacer />
				<v-toolbar-title class="text-uppercase font-weight-bold">
					start a post
				</v-toolbar-title>
				<v-spacer />
				<v-avatar
					v-ripple
					class="elevation-3"
					size="40"
				>
					<v-icon
						@click="dialog = false"
					>
						mdi-close-circle
					</v-icon>
				</v-avatar>
			</v-toolbar>
			<div class="py-4" />
			<v-card
				flat
				class="rounded-0 mx-auto"
				max-width="700"
				color="transparent"
			>
				<v-row
					id="post-detail-row"
					class="mx-2 pa-0 py-2 pt-6"
					justify="start"
					align="center"
				>
					<v-col
						cols="2"
						class="pa-0 d-flex av-col"
						:class="
							$vuetify.breakpoint.width < 524 && $vuetify.breakpoint.width > 315
								? 'pl-3'
								: $vuetify.breakpoint.width < 315 && $vuetify.breakpoint.width > 237
									? 'pl-3'
									: $vuetify.breakpoint.width < 236 && $vuetify.breakpoint.width > 100
										? 'pl-4'
										: 'justify-center'
						"
					>
						<v-avatar id="av" class="elevation-4"
							size="70"
						>
							<v-img
								v-if="$helper.getCurrentProfileImage()"
								:src="$helper.getCurrentProfileImage()"
							/>
							<v-img v-else
								:src="defaultProfileImage"
							/>
						</v-avatar>
					</v-col>
					<v-col
						v-if="$vuetify.breakpoint.width > 180"
						cols="10"
						class="pa-0 d-flex"
						:class="
							$vuetify.breakpoint.width < 524 && $vuetify.breakpoint.width > 461
								? 'justify-start pl-3'
								:	$vuetify.breakpoint.width < 460 && $vuetify.breakpoint.width > 333
									? 'justify-start pl-8'
									: $vuetify.breakpoint.width < 334
										? 'pl-12'
										: 'justify-start'
						"
					>
						<v-list two-line>
							<v-list-item class="text-start pa-0">
								<v-list-item-content class="pa-0">
									<v-list-item-title
										style="white-space: normal;"
									>
										{{ currentUser.first_name }} {{ currentUser.last_name }}
									</v-list-item-title>
									<v-list-item-subtitle v-show="$vuetify.breakpoint.width > 235">
										<v-chip
											dense
											label
											class="small-bold"
										>
											<span v-if="currentUser.member">
												Member
											</span>
											<span v-else>
												Follower
											</span>
											<v-icon right
												small
											>
												mdi-account-circle
											</v-icon>
										</v-chip>
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-col>
					<v-col cols="12">
						<v-text-field
							id="title"
							v-model="post.title"
							class="ma-0 pa-0 mt-4"
							name="title"
							outlined
							clearable
							label="Post Title"
							hide-details="auto"
							counter="255"
							placeholder="Give your activity a title, Kiran!"
							:error-messages="postCreationFormErrors.title"
						/>
					</v-col>
					<v-col cols="12">
						<v-textarea
							id="description"
							v-model="post.description"
							class="ma-0 pa-0"
							name="description"
							label="Description"
							outlined
							clearable
							auto-grow
							hide-details="auto"
							counter="2048"
							placeholder="Write something about your activity, Kiran!"
							:error-messages="postCreationFormErrors.description"
						/>
					</v-col>
					<transition name="fade">
						<v-col v-show="uploadVideo"
							cols="12"
						>
							<v-combobox
								v-model="video_urls"
								class="ma-0 pa-0"
								:items="[]"
								label="Video URL"
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
						</v-col>
					</transition>
				</v-row>
				<v-row v-if="images.length > 0"
					id="image-preview-pane"
					no-gutters
					justify="space-around"
					align="center"
					class="px-4 pb-3"
				>
					<v-col cols="12"
						class="ma-0 pa-0"
					>
						<p class="ma-0 pa-0 subtitle-2">
							<span><v-icon size="20"
								class="mb-1"
							>mdi-diamond-stone</v-icon></span>
							IMAGE PREVIEW PANE
						</p>
					</v-col>
					<v-col v-for="(file, index) in imageURLs"
						:key="index"
						class="d-flex justify-center ma-2 pa-2"
						style="background-color: aliceblue"
					>
						<v-badge
							style="z-index: 5;"
							bordered
							overlap
							color="grey darken-1"
						>
							<template #badge>
								<v-icon
									x-small
									class="remove-icon"
									@click="removeImage(index)"
								>
									mdi-close
								</v-icon>
							</template>
							<v-card height="70"
								dark
								max-width="100"
							>
								<v-img :src="file"
									height="70"
									contain
								/>
							</v-card>
						</v-badge>
					</v-col>
				</v-row>
				<v-row v-if="video_urls.length > 0"
					id="video-urls-preview-pane"
					justify="space-around"
					align="center"
					class="ma-0 pa-0 mx-4 pb-3"
				>
					<v-col cols="12">
						<p class="ma-0 pa-0 subtitle-2">
							<span><v-icon size="20"
								class="mb-1"
							>mdi-movie</v-icon></span>
							VIDEO URLS PREVIEW PANE
						</p>
					</v-col>
					<v-col v-for="(item, index) in video_urls" :key="index"
						cols="12"
						class="ma-2 d-flex justify-center"
					>
						<v-badge
							bordered
							overlap
							color="grey darken-2"
						>
							<template #badge>
								<v-icon
									x-small
									class="remove-icon"
									@click="removeVideo_URL(index)"
								>
									mdi-close
								</v-icon>
							</template>
							<youtube-iframe class="slight-round"
								:video-url="item"
							/>
						</v-badge>
					</v-col>
				</v-row>
				<v-row v-if="videos.length > 0"
					id="video-preview-pane"
					justify="space-around"
					align="center"
					class="ma-0 pa-0 mx-4 pb-3"
				>
					<v-col cols="12">
						<p class="ma-0 pa-0 subtitle-2">
							<span><v-icon size="20"
								class="mb-1"
							>mdi-movie</v-icon></span>
							VIDEO PREVIEW PANE
						</p>
					</v-col>
					<v-col v-for="(item, index) in videoURLs" :key="index"
						cols="12"
						class="ma-0 pa-0 d-flex justify-center align-start"
					>
						<v-badge
							bordered
							overlap
							color="grey darken-2"
						>
							<template #badge>
								<v-icon
									x-small
									class="remove-icon"
									@click="removeVideo(index)"
								>
									mdi-close
								</v-icon>
							</template>
							<video
								class="slight-round"
								width="300"
								height="200"
								controls
							>
								<source :src="item.videoUrl"
									:type="item.type"
								>
							</video>
						</v-badge>
					</v-col>
				</v-row>
				<v-row v-if="sounds.length > 0"
					id="sound-preview-pane"
					justify="space-around"
					align="center"
					class="ma-0 pa-0 px-4 pb-3"
				>
					<v-col cols="12">
						<p class="ma-0 pa-0 subtitle-2">
							<span><v-icon size="20"
								class="mb-1"
							>mdi-music</v-icon></span>
							SOUND PREVIEW PANE
						</p>
					</v-col>
					<v-col v-for="(item, index) in soundURLs" :key="index"
						cols="3"
						class="ma-2 d-flex justify-center"
					>
						<v-badge
							bottom
							overlap
							color="grey darken-2"
							offset-x="0"
							offset-y="2"
						>
							<template #badge>
								<v-icon
									x-small
									@click="removeSound(index)"
								>
									mdi-close
								</v-icon>
							</template>
							<a-player
								:music="item"
								mini
							/>
						</v-badge>
					</v-col>
				</v-row>
				<v-row
					id="add-resources-row"
					no-gutters
					class="mx-5 mt-4 pa-0"
					justify="center"
					align="center"
				>
					<v-col cols="12">
						<p class="ma-0 pa-0 pb-sm-2 pb-md-2 overline text-center">
							add to your post
						</p>
					</v-col>
					<v-col cols="12"
						xl="7"
						lg="7"
						md="7"
						sm="7"
						class="d-flex align-center"
						:class="
							$vuetify.breakpoint.smAndUp
								? 'justify-end'
								: 'justify-center'
						"
					>
						<file-upload
							v-model="files"
							:multiple="true"
							class="cursor-pointer"
							@input-file="inputFile"
							@input-filter="inputFilter"
						>
							<v-btn
								v-for="(item, index) in flexButtonsFile"
								:key="index"
								class="mx-2 mb-2 mb-sm-0 mb-md-0 mb-lg-0 mb-xl-0"
								fab x-small
								dark
								:color="item.color"
							>
								<v-icon>{{ item.icon }}</v-icon>
							</v-btn>
						</file-upload>
					</v-col>
					<v-col cols="12"
						xl="5"
						lg="5"
						md="5"
						sm="5"
						class="d-flex align-center"
						:class="
							$vuetify.breakpoint.smAndUp
								? 'justify-start'
								: 'justify-center'
						"
					>
						<v-btn
							class="mx-2 mb-2 mb-sm-0 mb-md-0 mb-lg-0 mb-xl-0"
							fab x-small
							dark
							:color="flexButtonsMap.color"
							@click="uploadVideo = !(uploadVideo)"
						>
							<v-icon>{{ flexButtonsMap.icon }}</v-icon>
						</v-btn>
					</v-col>
				</v-row>
				<v-card-actions class="pa-4">
					<v-btn
						id="post-submit"
						block
						dark
						color="#288dba"
						@click="makeMultimedia"
					>
						POST
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-card>
	</v-dialog>
</template>

<script>
import {getFormData} from "@/Helper";

const VueUploadComponent = require("vue-upload-component")
import APlayer from "vue-aplayer"
import {mapGetters} from "vuex";
import YoutubeIframe from "@/components/YoutubeIframe";
import Snack from "@/mixins/Snack";

export default {
	name: "StartAPostComponent",
	components: {
		YoutubeIframe,
		FileUpload: VueUploadComponent,
		APlayer,
	},
	mixins: [Snack],
	emits: ["close-dialog"],
	data: () => ({
		files: [],
		dialog: false,
		uploadVideo: false,
		playing: false,
		flexButtonsFile: [
			{icon: "mdi-camera", tooltip: "Upload photo", color: "#3aaada"},
			{icon: "mdi-music", tooltip: "Upload sound", color: "#9896f2"},
			{icon: "mdi-video", tooltip: "Add video url", color: "#009688"},
		],
		flexButtonsTag:
			{icon: "mdi-tag-faces", tooltip: "Not implemented", color: "blue"},
		flexButtonsMap:
			{icon: "mdi-youtube", tooltip: "Video URL", color: "red"},
		// fields to prepare form data
		post: {
			title: "",
			description: "",
		},
		images: [],
		sounds: [],
		videos: [],
		video_urls: [],
		// fields to show uploaded look on UI
		imageURLs: [],
		soundURLs: [],
		videoURLs: [],
		video_URLs: [],
		defaultProfileImage: require("@/assets/default_profile_image.png"),
		postCreationFormErrors: {
			title: null,
			description: null,
			video_url: null
		}
	}),
	computed: {
		...mapGetters({
			multimediaPostCreationFormErrors: "multimedia/multimediaPostCreationFormErrors",
			articlePostCreationFormErrors: "article/formErrors"
		}),
		currentUser() {
			return this.$helper.getCurrentUser()
		}
	},
	async created() {
		this.$bus.on("open-start-post-dialog", this.openDialog)
		await this.resetPostForm()
	},
	beforeUnmount() {
		this.$bus.off("open-start-post-dialog")
	},
	methods: {
		async resetPostForm() {
			await this.$store.dispatch("multimedia/clearMultimediaPostCreationFormErrors")
			await this.$store.dispatch("article/clearFormErrors")
			this.post = {
				title: "",
				description: "",
			}
			this.images = []
			this.sounds = []
			this.videos = []
			this.video_urls = []
			// fields to show uploaded look on UI
			this.imageURLs = []
			this.soundURLs = []
			this.videoURLs = []
			this.video_URLs = []
		},
		/**
		 * Has changed
		 * @return undefined
		 * @param latest
		 */
		inputFile(latest) {
			const latestFile = latest.file
			const latestUrl = URL.createObjectURL(latestFile)
			if (/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(latestFile.name)) {
				this.imageURLs.push(latestUrl)
				this.images.push(latestFile)
			} else if (/\.(mp3)$/i.test(latestFile.name)) {
				this.soundURLs.push({
					title: "Sachchai Sounds",
					artist: this.currentUser.username,
					src: latestUrl,
					pic: "https://bd.gaadicdn.com/processedimages/hero/passion-pro-110/640X309/passion-pro-1105e5ddca2e3a50.jpg",
				})
				this.sounds.push(latestFile)
			} else if (/\.(webm|mp4|mpeg|flv)$/i.test(latestFile.name)) {
				this.videoURLs.push({
					playing: false,
					video: latestFile,
					name: latestFile.name,
					videoUrl: latestUrl,
					type: latestFile.type
				})
				this.videos.push(latestFile)
			}
		},
		/**
		 * Pre treatment
		 * @return undefined
		 * @param newFile
		 * @param oldFile
		 * @param prevent
		 */
		inputFilter(newFile, oldFile, prevent) {
			if (newFile && !oldFile) {
				// Filter file extension
				if (!/\.(jpeg|jpe|jpg|gif|png|webp|mp3|webm|mp4|mpeg|flv)$/i.test(newFile.name)) {
					alert("Unsupported file type selected. Please select valid image or audio file.")
					return prevent()
				}
			}
			// Create a blob field
			newFile.blob = ""
			let URL = window.URL || window.webkitURL
			if (URL && URL.createObjectURL) {
				newFile.blob = URL.createObjectURL(newFile.file)
			}
		},
		clearFiles() {
			this.files = []
		},
		removeImage(index) {
			this.images.splice(index, 1)
			this.imageURLs.splice(index, 1)
		},
		removeVideo_URL(index) {
			this.video_urls.splice(index, 1)
		},
		removeVideo(index) {
			this.videoURLs.splice(index, 1)
			this.videos.splice(index, 1)
		},
		removeSound(index) {
			this.sounds.splice(index, 1)
			this.soundURLs.splice(index, 1)
		},
		closeDialog() {
			this.resetPostForm()
			this.dialog = false
		},
		openDialog() {
			this.dialog = true
			this.uploadVideo = false
		},
		async createMultimedia() {
			// create a multimedia
			const body = await getFormData({
				...this.post,
				sound: this.sounds,
				image: this.images,
				video: this.videos,
				video_url: this.video_urls
			})
			const response = await this.$store.dispatch("multimedia/createMultimediaPost", body)
			if (response === false) {
				this.postCreationFormErrors = this.multimediaPostCreationFormErrors
			}
			return response
		},
		async showPostCreationErrorMessages() {
			if(this.postCreationFormErrors.video_url) {
				await this.openSnack("Please add a valid youtube video url for your post")
			}
			if(this.postCreationFormErrors.video) {
				await this.openSnack(this.postCreationFormErrors.video[0])
			}
			if(this.postCreationFormErrors.sound) {
				await this.openSnack(this.postCreationFormErrors.sound[0])
			}
			if(this.postCreationFormErrors.image) {
				await this.openSnack(this.postCreationFormErrors.image[0])
			}
			if(this.postCreationFormErrors["non_field_errors"]) {
				await this.openSnack(this.postCreationFormErrors["non_field_errors"][0])
			}
		},
		async makeMultimedia() {
			let response
			response = await this.createMultimedia()
			if (response === false) {
				await this.showPostCreationErrorMessages()
			}
			else {
				this.closeDialog()
				await this.resetPostForm()
				await this.openSnack("Your post is added successfully. An admin approval will make your post visible.", "success")
			}
		}
	}
}
</script>

<style lang="sass" scoped>
#title
	font-family: Roboto, sans-serif
	font-size: 20px

#description
	margin-top: 0 !important
	padding-top: 15px !important
	font-size: 20px
	font-family: "Roboto", sans-serif
	line-height: 25px

#post-submit
	font-size: 18px
	letter-spacing: 0
	height: 42px
#add-resources-row
	padding: 8px !important
	border: 2px solid #008db6
	border-radius: 4px
	p
		font-size: 18px
	.v-btn
		margin-right: 4px
		margin-left: 4px
::v-deep .size-124
	font-size: 24px !important
#av
	border: 2px white solid
	background-color: white
	@media only screen and (max-width: 236px)
		height: 45px !important
		min-width: 45px !important
		width: 45px !important
	@media only screen and (max-width: 180px)
		margin: 10px 0 5px 0
.cursor-pointer
	cursor: pointer !important
.start-post-av
	border-radius: 4px !important
.image-preview
	border-radius: 10px !important
.slight-round
	border-radius: 5px
.small-bold
	font-size: 10px
	font-weight: bold
.remove-icon
	z-index: 500
</style>
