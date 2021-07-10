<template>
	<v-dialog
		v-model="dialog"
		class="start-post-dialog"
		max-width="600"
	>
		<v-card>
			<input
				v-show="false"
				id="image-input"
				ref="imageInput"
				class="file-input"
				type="file"
				multiple
				accept="image/*"
				@change="imageInputChanged"
			>
			<input
				v-show="false"
				id="sound-input"
				ref="soundInput"
				multiple
				class="file-input"
				type="file"
				accept="audio/*"
				@change="soundInputChanged"
			>
			<input
				v-show="false"
				id="video-input"
				ref="videoInput"
				multiple
				class="file-input"
				type="file"
				accept="video/*"
				@change="videoInputChanged"
			>
			<v-toolbar color="#be75bd">
				<v-icon>mdi-pencil-box</v-icon>
				<v-spacer />
				<v-toolbar-title class="title-toolbar">
					start a post
				</v-toolbar-title>
				<v-spacer />
				<v-btn fab
					x-small
					@click="closeDialog"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>
			<v-row
				id="post-detail-row"
				class="mx-2 pa-0 py-2 pt-6"
				justify="start"
				align="center"
			>
				<v-col cols="12"
					class="py-0"
				>
					<v-list two-line
						class="py-0"
					>
						<v-list-item class="text-start pa-0">
							<v-list-item-avatar id="av"
								size="70"
								class="elevation-4"
							>
								<v-img
									v-if="$helper.getCurrentProfileImage()"
									:src="$helper.getCurrentProfileImage()"
								/>
								<v-img v-else
									:src="defaultProfileImage"
								/>
							</v-list-item-avatar>
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
							<v-list-item-action>
								<v-tooltip bottom>
									<template #activator="{on, attrs}">
										<v-btn icon
											v-bind="attrs"
											color="red lighten-2"
											v-on="on"
											@click="resetPostForm"
										>
											<v-icon>mdi-refresh</v-icon>
										</v-btn>
									</template>
									<span>Reset</span>
								</v-tooltip>
							</v-list-item-action>
						</v-list-item>
					</v-list>
				</v-col>
				<v-col cols="12"
					class="py-0"
				>
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
				<v-col cols="12"
					class="pt-4"
					style="position: relative;"
				>
					<v-fab-transition>
						<v-btn v-if="!addDescription"
							@click="addDescription = true"
						>
							<v-icon>mdi-image-text</v-icon>
							<span v-if="$vuetify.breakpoint.width > 400"
								class="pl-1"
							>Add description</span>
						</v-btn>
						<v-btn v-else
							style="position: absolute; right: 3%; top: -20%;"
							@click="removeDescription"
						>
							<v-icon color="red lighten-1">
								mdi-close
							</v-icon>
							<span v-if="$vuetify.breakpoint.width > 400"
								class="pl-1"
							>Remove description</span>
						</v-btn>
					</v-fab-transition>
				</v-col>
				<v-scale-transition>
					<v-col v-if="addDescription"
						cols="12"
					>
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
				</v-scale-transition>
				<v-scale-transition>
					<v-col v-show="uploadVideoUrl"
						cols="12"
					>
						<v-combobox
							ref="videoUrlInput"
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
				</v-scale-transition>
			</v-row>
			<v-fab-transition>
				<v-row
					v-if="media"
					id="image-preview-pane"
					no-gutters
					justify="space-around"
					align="center"
					class="pa-2"
					style="background-color: aliceblue"
				>
					<v-col cols="12"
						class="ma-0 pa-0"
					>
						<p class="ma-0 pa-0 subtitle-2">
							<span><v-icon size="20"
								class="mb-1"
							>mdi-diamond-stone</v-icon></span>
							MEDIA PREVIEW PANE
						</p>
						<v-divider />
					</v-col>
					<v-col v-for="(file, index) in imageURLs"
						:key="index"
						class="d-flex justify-center ma-2"
						cols="12"
					>
						<card-img height="30vh"
							max-width="500"
							:src="file"
						>
							<v-btn fab
								x-small class="right-corner"
								@click="removeImage(index)"
							>
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</card-img>
					</v-col>
					<v-col v-for="(item, index) in videoURLs" :key="index"
						cols="12"
						class="d-flex justify-center ma-2"
					>
						<v-card height="30vh"
							max-width="500" dark
						>
							<v-btn fab style="z-index: 1"
								x-small class="right-corner"
								@click="removeVideo(index)"
							>
								<v-icon>mdi-close</v-icon>
							</v-btn>
							<video
								controls
								width="100%"
								height="100%"
								@play="onPlay"
							>
								<source :src="item.videoUrl"
									:type="item.type"
								>
							</video>
						</v-card>
					</v-col>
					<v-col v-for="(item, index) in video_urls" :key="index"
						cols="12"
						class="ma-2"
					>
						<v-card height="30vh"
							max-width="500"
							class="mx-auto"
						>
							<v-btn fab
								x-small class="right-corner"
								@click="removeVideo_URL(index)"
							>
								<v-icon>mdi-close</v-icon>
							</v-btn>
							<v-card height="30vh">
								<youtube
									ref="yt"
									height="100%"
									width="100%"
									:video-id="$youtube.getIdFromUrl(item)"
									@playing="playing"
								/>
							</v-card>
						</v-card>
					</v-col>
					<v-col v-for="(item, index) in soundURLs" :key="index"
						cols="3"
						class="d-flex justify-center ma-2"
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
			</v-fab-transition>
			<v-row
				id="add-resources-row"
				no-gutters
				class="mx-5 mt-4 pa-0"
				justify="center"
				align="center"
			>
				<v-col cols="12">
					<p class="ma-0 pa-0 pb-sm-2 pb-md-2 overline text-center"
						@click="$refs.imageInput.click()"
					>
						add to your post
					</p>
				</v-col>
				<v-col cols="12"
					xl="7"
					lg="7"
					md="7"
					sm="7"
					class="d-flex align-center justify-center"
				>
					<v-btn fab
						x-small dark
						:color="imageBtn.color"
						@click="$refs.imageInput.click()"
					>
						<v-icon>{{ imageBtn.icon }}</v-icon>
					</v-btn>
					<v-btn fab
						x-small dark
						:color="soundBtn.color"
						@click="$refs.soundInput.click()"
					>
						<v-icon>{{ soundBtn.icon }}</v-icon>
					</v-btn>
					<v-btn fab
						x-small dark
						:color="videoBtn.color"
						@click="$refs.videoInput.click()"
					>
						<v-icon>{{ videoBtn.icon }}</v-icon>
					</v-btn>
					<v-btn fab
						x-small dark
						:color="videoUrlBtn.color"
						@click="toggleUploadVideoUrlInput()"
					>
						<v-icon>{{ videoUrlBtn.icon }}</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-card-actions class="pa-4">
				<v-btn
					id="post-submit"
					block
					dark
					color="rgb(201 134 201)"
					@click="makeMultimedia"
				>
					POST
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import {getFormData} from "@/Helper.js";

import APlayer from "vue-aplayer"
import {mapGetters} from "vuex";
import Snack from "@/mixins/Snack.js";
import HtmlVideoMixin from "@/mixins/HtmlVideoMixin..js";

export default {
	name: "StartAPostComponent",
	components: {
		APlayer,
	},
	mixins: [Snack, HtmlVideoMixin],
	emits: ["close-dialog"],
	data: () => ({
		addDescription: false,
		files: [],
		dialog: false,
		uploadVideoUrl: false,
		imageBtn: {icon: "mdi-camera", tooltip: "Upload photo", color: "#3aaada"},
		soundBtn: {icon: "mdi-music", tooltip: "Upload sound", color: "#9896f2"},
		videoBtn: {icon: "mdi-video", tooltip: "Add video url", color: "#009688"},
		videoUrlBtn:
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
			formErrors: "multimedia/formErrors",
		}),
		currentUser() {
			return this.$helper.getCurrentUser()
		},
		media() {
			return this.images.length > 0 || this.sounds.length > 0 || this.videos.length > 0 || this.video_urls.length > 0;
		},
	},
	async created() {
		this.$bus.on("open-start-post-dialog", this.openDialog)
		await this.resetPostForm()
	},
	beforeUnmount() {
		this.$bus.off("open-start-post-dialog")
	},
	methods: {
		removeDescription() {
			this.addDescription = false
			this.post.description = null
		},
		imageInputChanged(e) {
			e.target.files.forEach(file => {
				this.images.push(file)
				this.imageURLs.push(URL.createObjectURL(file))
			})
		},
		soundInputChanged(e) {
			e.target.files.forEach(file => {
				this.sounds.push(file)
				this.soundURLs.push({
					title: "Sachchai Sounds",
					artist: this.currentUser.username,
					src: URL.createObjectURL(file),
					pic: "https://bd.gaadicdn.com/processedimages/hero/passion-pro-110/640X309/passion-pro-1105e5ddca2e3a50.jpg",
				})
			})
		},
		videoInputChanged(e) {
			e.target.files.forEach(file => {
				this.videos.push(file)
				this.videoURLs.push({
					playing: false,
					video: file,
					name: file.name,
					videoUrl: URL.createObjectURL(file),
					type: file.type
				})
			})
		},
		async resetPostForm() {
			await this.$store.dispatch("multimedia/clearFormErrors")
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
		focusVideoUrlInput() {
			setTimeout(() => {
				this.$refs.videoUrlInput.focus()
			}, 500)
		},
		toggleUploadVideoUrlInput() {
			if (this.uploadVideoUrl) {
				this.uploadVideoUrl = false
			} else {
				this.uploadVideoUrl = true
				this.focusVideoUrlInput()
			}
		},
		async closeDialog() {
			this.dialog = false
		},
		async openDialog(attrs) {
			this.dialog = true
			await this.$nextTick()
			if (attrs.url) {
				this.uploadVideoUrl = true
				this.focusVideoUrlInput()
			} else {
				this.uploadVideoUrl = false
			}
			if (attrs.images) {
				this.imageInputChanged(attrs.images)
			}
			if (attrs.videos) {
				this.videoInputChanged(attrs.videos)
			}
		},
		async createMultimedia() {
			const body = await getFormData({
				...this.post,
				sound: this.sounds,
				image: this.images,
				video: this.videos,
				video_url: this.video_urls
			})
			const response = await this.$store.dispatch("multimedia/createPost", body)
			if (!response) this.postCreationFormErrors = this.formErrors
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
			if (!response) {
				await this.showPostCreationErrorMessages()
			} else {
				await this.closeDialog()
				await this.resetPostForm()
				await this.openSnack(
					"Your post is added successfully. An admin approval will make your post visible.",
					"success"
				)
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
.title-toolbar
	font-size: 1rem
	font-weight: 400
	text-transform: uppercase
	font-family: 'Open Sans Condensed', sans-serif
.right-corner
	position: absolute
	right: 1%
	top: 1%
</style>
