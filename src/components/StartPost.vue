<template>
	<!--	TODO: make dark implementation-->
	<v-card
		light
		max-width="650"
	>
		<v-toolbar>
			<v-avatar
				class="elevation-3"
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
					@click="$emit('close-dialog')"
				>
					mdi-close-circle
				</v-icon>
			</v-avatar>
		</v-toolbar>
		<v-row
			id="post-detail-row"
			class="mx-2 pa-0"
			justify="start"
			align="center"
		>
			<v-col cols="2"
				class="pr-0 mr-0"
			>
				<v-avatar class="elevation-4"
					size="60"
				>
					<v-img
						src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
					/>
				</v-avatar>
			</v-col>
			<v-col
				cols="10"
				class="pl-0 ml-0"
			>
				<v-list two-line>
					<p class="ma-0 pa-0">
						Kiran Parajuli
					</p>
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
				</v-list>
			</v-col>
			<v-col cols="12">
				<v-text-field
					id="title"
					v-model="post.title"
					class="ma-0 pa-0"
					name="title"
					placeholder="Give your activity a title, Kiran!"
					label="Post Title"
					outlined
					hide-details="auto"
					clearable
				/>
			</v-col>
			<v-col cols="12">
				<v-textarea
					id="description"
					v-model="post.description"
					class="ma-0 pa-0"
					name="description"
					placeholder="Write something about your activity, Kiran!"
					label="Description"
					outlined
					hide-details="auto"
					clearable
				/>
			</v-col>
			<transition name="fade">
				<v-col v-show="uploadVideo"
					cols="12"
				>
					<v-combobox
						v-model="post.videoUrl"
						class="ma-0 pa-0"
						:items="[]"
						hide-selected
						label="Video URL"
						multiple
						small-chips
						deletable-chips
						type="url"
						outlined
						clearable
						prepend-inner-icon="mdi-video"
						hide-details="auto"
					>
						<template #no-data>
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title>
										Type <code>youtube</code> video url and press <kbd>enter</kbd> to add a new one.
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</template>
					</v-combobox>
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
					<v-avatar size="100">
						<v-img :src="file" />
					</v-avatar>
				</v-badge>
			</v-col>
		</v-row>
		<v-row v-if="post.videoUrl.length > 0"
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
			<v-col v-for="(item, index) in post.videoUrl" :key="index"
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
							@click="removeVideo(index)"
						>
							mdi-close
						</v-icon>
					</template>
					<youtube
						ref="youtube"
						class="pa-4"
						:video-id="getId(item)"
						:resize="true"
						:resize-delay="1"
						height="100"
						width="200"
						@playing="playing"
					/>
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
			class="mx-5 pa-0"
			justify="center"
			align="center"
		>
			<v-col cols="12"
				class="ma-0 pa-0"
			>
				<p class="ma-0 pa-0 pb-2 overline text-center">
					add to your post
				</p>
			</v-col>
			<v-col cols="12"
				class="d-flex align-center justify-center"
			>
				<file-upload
					v-model="files"
					:multiple="true"
					@input-file="inputFile"
					@input-filter="inputFilter"
				>
					<v-btn
						v-for="(item, index) in flexButtonsFile"
						:key="index"
						fab x-small
						dark
						:color="item.color"
					>
						<v-icon>{{ item.icon }}</v-icon>
					</v-btn>
				</file-upload>
				<v-btn
					fab x-small
					dark
					:color="flexButtonsVideo.color"
					@click="uploadVideo = !(uploadVideo)"
				>
					<v-icon>{{ flexButtonsVideo.icon }}</v-icon>
				</v-btn>
				<v-btn
					fab x-small
					dark
					:color="flexButtonsTag.color"
				>
					<v-icon>{{ flexButtonsTag.icon }}</v-icon>
				</v-btn>
				<v-btn
					fab x-small
					dark
					:color="flexButtonsMap.color"
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
			>
				POST
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
const VueUploadComponent = require("vue-upload-component")
import APlayer from "vue-aplayer"

export default {
	name: "StartAPostComponent",
	components: {FileUpload: VueUploadComponent, APlayer},
	emits: ["close-dialog"],
	data: () => ({
		uploadVideo: false,
		playing: false,
		flexButtonsFile: [
			{icon: "mdi-camera", tooltip: "Upload photo", color: "#3aaada"},
			{icon: "mdi-music", tooltip: "Upload audio", color: "#9896f2"},
		],
		flexButtonsVideo:
			{icon: "mdi-video", tooltip: "Add video url", color: "#009688"},
		flexButtonsTag:
			{icon: "mdi-tag-faces", tooltip: "Not implemented", color: "blue"},
		flexButtonsMap:
			{icon: "mdi-google-maps", tooltip: "Not implemented", color: "red"},
		videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
		files: [],
		images: [],
		audios: [],
		videos: [],
		imageURLs: [],
		audioURLs: [],
		videoURLs: [],
		post: {
			title: "",
			description: "",
			videoUrl: []
		}
	}),
	methods: {
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
				if (!/\.(jpeg|jpe|jpg|gif|png|webp|mp4|mp3)$/i.test(newFile.name)) {
					alert("Unsupported file type selected. Please select valid image, audio or video file.")
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
			console.log(this.files)
		},
		removeImage(index) {
			this.images.splice(index, 1)
			this.imageURLs.splice(index, 1)
		},
		removeVideo(index) {
			this.post.videoUrl.splice(index, 1)
			this.videoURLs.splice(index, 1)
		},
		removeAudio(index) {
			this.audios.splice(index, 1)
			this.audioURLs.splice(index, 1)
		},
		getId(url) {
			return this.$youtube.getIdFromUrl(url)
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
</style>
