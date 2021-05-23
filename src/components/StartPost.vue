<template>
	<!--	TODO: make dark implementation-->
	<v-dialog
		v-model="dialog"
		max-width="550"
		persistent
	>
		<v-card
			light
		>
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
						size="60"
					>
						<v-img
							:src="getCurrentProfileImage"
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
										style="font-size: 10px; font-weight: bold"
									>
										Member
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
						class="ma-0 pa-0"
						name="title"
						outlined
						clearable
						label="Post Title"
						hide-details="auto"
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
						hide-details="auto"
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
							:error-messages="postCreationFormErrors.video_url"
						/>
					</v-col>
				</transition>
			</v-row>
			<v-scale-transition name="errMsgTransition">
				<v-row
					v-show="showPostCreationErrorMessage"
					justify="center"
					align="center" class="ma-0 pa-0 err-msg-row"
				>
					<v-col
						cols="12"
						class="pa-1 py-3"
					>
						<ul>
							<li v-for="(msg, index) in postCreationErrorMessageArray"
								:key="index"
							>
								{{ msg }}
							</li>
						</ul>
					</v-col>
				</v-row>
			</v-scale-transition>
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
					class="d-flex justify-center py-2"
					style="background-color: aliceblue"
				>
					<v-badge
						bottom
						overlap
						color="grey darken-2"
						offset-x="15"
						offset-y="30"
					>
						<template #badge>
							<v-icon
								x-small
								@click="removeImage(index)"
							>
								mdi-close
							</v-icon>
						</template>
						<v-img :src="file" class="image-preview"
							max-height="100" max-width="100"
							contain
						/>
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
					cols="4"
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
								@click="removeVideo_URL(index)"
							>
								mdi-close
							</v-icon>
						</template>
						<iframe :src="prepareEmbedUrl(item)"
							frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
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
					cols="4"
					class="ma-0 pa-0 d-flex justify-center align-start"
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
								@click="removeVideo(index)"
							>
								mdi-close
							</v-icon>
						</template>
						<div>
							<a :href="item.videoUrl"
								target="_blank"
							>{{ item.name }}</a>
						</div>
					</v-badge>
				</v-col>
			</v-row>
			<v-row v-if="audios.length > 0"
				id="audio-preview-pane"
				justify="space-around"
				align="center"
				class="ma-0 pa-0 px-4 pb-3"
			>
				<v-col cols="12">
					<p class="ma-0 pa-0 subtitle-2">
						<span><v-icon size="20"
							class="mb-1"
						>mdi-music</v-icon></span>
						AUDIO PREVIEW PANE
					</p>
				</v-col>
				<v-col v-for="(item, index) in audioURLs" :key="index"
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
								@click="removeAudio(index)"
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
	</v-dialog>
</template>

<script>
import {getFormData} from "@/Helper";

const VueUploadComponent = require("vue-upload-component")
import APlayer from "vue-aplayer"
import {mapGetters} from "vuex";

export default {
	name: "StartAPostComponent",
	components: {
		FileUpload: VueUploadComponent,
		APlayer,
		// VideoPlayer: () => import("@/components/VideoPlayer")
	},
	emits: ["close-dialog"],
	data: () => ({
		currentUser: null,
		files: [],
		dialog: false,
		uploadVideo: false,
		playing: false,
		showPostCreationErrorMessage: false,
		postCreationErrorMessageArray: [],
		flexButtonsFile: [
			{icon: "mdi-camera", tooltip: "Upload photo", color: "#3aaada"},
			{icon: "mdi-music", tooltip: "Upload audio", color: "#9896f2"},
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
		audios: [],
		videos: [],
		video_urls: [],
		// fields to show uploaded look on UI
		imageURLs: [],
		audioURLs: [],
		videoURLs: [],
		video_URLs: [],
		defaultProfileImage: require("@/assets/defaultProfileImage.png"),
	}),
	computed: {
		...mapGetters({
			postCreationFormErrors: "multimedia/multimediaPostCreationFormErrors"
		}),
		getCurrentProfileImage() {
			const currentUser = this.$helper.getCurrentUser()
			if (currentUser && currentUser.profile["profile_images"].length > 0) {
				return currentUser.profile["profile_images"][0].image
			}
			else return this.defaultProfileImage
		}
	},
	async created() {
		this.currentUser = this.$helper.getCurrentUser()
		this.$bus.on("open-start-post-dialog", this.openDialog)
		await this.resetPostForm()
	},
	beforeUnmount() {
		this.$bus.off("open-start-post-dialog")
	},
	methods: {
		async resetPostForm() {
			await this.$store.dispatch("multimedia/clearMultimediaPostCreationFormErrors")
			this.showPostCreationErrorMessage = false
			this.postCreationErrorMessageArray = []
			this.post = {
				title: "",
				description: "",
			}
			this.images = []
			this.audios = []
			this.videos = []
			this.video_urls = []
			// fields to show uploaded look on UI
			this.imageURLs = []
			this.audioURLs = []
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
				this.audioURLs.push({
					title: "Kiran Parajuli",
					artist: "KIRAN",
					src: latestUrl,
					pic: "https://bd.gaadicdn.com/processedimages/hero/passion-pro-110/640X309/passion-pro-1105e5ddca2e3a50.jpg",
				})
				this.audios.push(latestFile)
			} else if (/\.(webm|mp4|mpeg|flv)$/i.test(latestFile.name)) {
				this.videoURLs.push({
					playing: false,
					name: latestFile.name,
					videoUrl: latestUrl,
				})
				this.videos.push(latestFile)
			}
		},
		/**
		 * Pretreatment
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
		removeAudio(index) {
			this.audios.splice(index, 1)
			this.audioURLs.splice(index, 1)
		},
		getId(url) {
			return this.$helper.getVideoIdFromYoutubeURL(url)
		},
		prepareEmbedUrl(url) {
			return `https://www.youtube.com/embed/${this.getId(url)}`
		},
		closeDialog() {
			this.resetPostForm()
			this.dialog = false
		},
		openDialog() {
			this.dialog = true
			this.uploadVideo = false
		},
		showPostCreationErrorInDialog(msgArray) {
			this.showPostCreationErrorMessage = true

			this.postCreationErrorMessageArray = msgArray
		},
		calculateNonFieldFormErrorMessages() {
			let errMsgArray = []
			if (Array.isArray(this.postCreationFormErrors.video)) {
				this.postCreationFormErrors.video.forEach((msg) => {
					errMsgArray.push(msg)
				})
			}
			if (Array.isArray(this.postCreationFormErrors.audio)) {
				this.postCreationFormErrors.audio.forEach((msg) => {
					errMsgArray.push(msg)
				})
			}
			if (Array.isArray(this.postCreationFormErrors.image)) {
				this.postCreationFormErrors.image.forEach((msg) => {
					errMsgArray.push(msg)
				})
			}

			return errMsgArray
		},
		async makeMultimedia() {
			let response
			if (this.video_urls.length > 0 || this.videos.length > 0) {
				// create a multimedia
				const body = await getFormData({
					...this.post,
					audio: this.audios,
					image: this.images,
					video: this.videos,
					video_url: this.video_urls
				})
				response = await this.$store.dispatch("multimedia/createMultimediaPost", body)
			} else {
				// create an article
				const body = getFormData({
					...this.post,
					image: this.images
				})
				response = await this.$store.dispatch("article/createArticlePost", body)
			}
			if (response === true) {
				this.closeDialog()
				await this.resetPostForm()
			}
			else if (response === 500) {
				this.showPostCreationErrorInDialog(["Internal server error. Please try again."])
			}
			else if (response === false) {
				const errMsgArray = this.calculateNonFieldFormErrorMessages()
				this.showPostCreationErrorInDialog(errMsgArray)
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
.err-msg-row
	margin: 0 3rem !important
	background-color: red
	color: white
	font-size: .7rem
	line-height: .7rem
.image-preview
	border-radius: 10px
</style>
