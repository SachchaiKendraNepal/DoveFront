<template>
	<v-card
		light
		max-width="650"
	>
		<v-toolbar
			dark
		>
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
		<v-divider />
		<v-row
			id="post-detail-row"
			class="mx-2 pa-0"
			justify="start"
			align="center"
		>
			<v-col cols="2"
				class="pr-0 mr-0"
			>
				<v-avatar>
					<v-img
						class="elevation-6"
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
							@click="removeVideo(index)"
						>
							mdi-close
						</v-icon>
					</template>
					<vue-player
						v-model="playing"
						:src="item"
						style="border-radius: 10px"
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
			<file-upload
				v-model="files"
				:multiple="true"
				@input-file="inputFile"
				@input-filter="inputFilter"
			>
				<v-col class="ma-0 pa-0">
					<p class="ma-0 pa-0 overline">
						add to your post
					</p>
				</v-col>
				<v-col>
					<v-btn
						v-for="(item, index) in flexButtons"
						:key="index"
						fab x-small
						dark
						:color="item.color"
					>
						<v-icon>{{ item.icon }}</v-icon>
					</v-btn>
				</v-col>
			</file-upload>
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
import vuePlayer from "@algoz098/vue-player"
import APlayer from "vue-aplayer"

export default {
	name: "StartAPostComponent",
	components: {FileUpload: VueUploadComponent, vuePlayer, APlayer},
	emits: ["close-dialog"],
	data: () => ({
		playing: false,
		flexButtons: [
			{icon: "mdi-camera", color: "#3aaada"},
			{icon: "mdi-music", color: "#9896f2"},
			{icon: "mdi-video", color: "#009688"},
			{icon: "mdi-tag-faces", color: "blue"},
			{icon: "mdi-google-maps", color: "red"},
		],
		videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
		files: [],
		images: [],
		audios: [],
		videos: [],
		imageURLs: [],
		audioURLs: [],
		videoURLs: [],
		post: {
			description: ""
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
			} else if (/\.(mp4)$/i.test(latestFile.name)) {
				this.videoURLs.push(latestUrl)
				this.videos.push(latestFile)
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
			this.videos.splice(index, 1)
			this.videoURLs.splice(index, 1)
		},
		removeAudio(index) {
			this.audios.splice(index, 1)
			this.audioURLs.splice(index, 1)
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
