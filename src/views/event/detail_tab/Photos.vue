<template>
	<v-tab-item value="tab-photos">
		<v-dialog
			v-model="fullScreenDialog"
			max-width="90vw"
			max-height="90vh"
		>
			<v-row class="ma-0 pa-0"
				justify="center" align="center"
			>
				<v-col cols="12">
					<v-img :src="selectedImage"
						max-width="100%"
						max-height="80vh"
						@click.stop="closeImageDialog"
					/>
				</v-col>
			</v-row>
		</v-dialog>
		<v-card flat>
			<v-card-text>
				<v-row v-if="imageURLs.length>0"
					no-gutters
					justify="center"
					align="center"
				>
					<v-col v-for="(imageUrl, index) in imageURLs" :key="index"
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
								<v-icon @click="removeUploadToImage(index)">
									mdi-close
								</v-icon>
							</template>
							<v-img
								class="image-to-upload" :src="imageUrl"
								max-width="220"
								height="130"
							/>
						</v-badge>
					</v-col>
				</v-row>
				<div class="upload-image-container">
					<file-upload
						v-model="eventImagesForUpload"
						:multiple="true"
						class="cursor-pointer"
						@input-file="inputFile"
						@input-filter="inputFilter"
					>
						<div class="upload-image">
							Add image to event
						</div>
					</file-upload>
				</div>
				<div v-if="images.length > 0"
					class="d-flex justify-center pa-2"
				>
					<v-btn color="orange"
						dark
						@click="uploadEventImages"
					>
						Upload
					</v-btn>
				</div>
			</v-card-text>
			<v-card-text v-if="event.images.length === 0">
				<div class="no-photos">
					No photos added yet!
				</div>
			</v-card-text>
			<v-row class="ma-0 pa-2">
				<v-col
					v-for="img in event.images"
					:key="img.id"
					class="d-flex child-flex ma-0 pa-2"
					cols="12"
					xl="3"
					lg="3"
					md="4"
					sm="4"
				>
					<v-img

						:src="img.image"
						class="grey lighten-2 event-image"
						max-width="300"
						height="200"
						@click.stop="zoomImage(img.image)"
					/>
				</v-col>
			</v-row>
		</v-card>
	</v-tab-item>
</template>
<script>
import VueUploadComponent from "vue-upload-component"
import {getFormData} from "@/Helper";

export default {
	name: "EventDetailPhotosTabContent",
	components: {
		FileUpload: VueUploadComponent,
	},
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		eventImagesForUpload: [],
		images: [],
		imageURLs: [],
		selectedImage: null,
		fullScreenDialog: false,
	}),
	methods: {
		closeImageDialog() {
			this.fullScreenDialog = false
			this.selectedImage = null
		},
		zoomImage(url) {
			this.fullScreenDialog=true
			this.selectedImage = url
		},
		inputFile(latest) {
			const latestFile = latest.file
			const latestUrl = URL.createObjectURL(latestFile)
			if (/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(latestFile.name)) {
				this.imageURLs.push(latestUrl)
				this.images.push(latestFile)
			}
		},
		inputFilter(newFile, oldFile, prevent) {
			if (newFile && !oldFile) {
				// Filter file extension
				if (!/\.(jpeg|jpe|jpg|gif|png)$/i.test(newFile.name)) {
					alert("Unsupported file type selected. Please select valid image file.")
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
		async uploadEventImages() {
			const body = await getFormData({
				images: this.images,
			})
			const added = await this.$store.dispatch("event/addImageListFor", {
				id: this.event.id,
				body: body
			})
			if (added) {
				await this.$store.dispatch("event/fetchSingle", {id: this.$route.params.id})
				this.imageURLs = []
				this.images = []
			}
		},
		removeUploadToImage(index) {
			this.images.splice(index, 1)
			this.imageURLs.splice(index, 1)
		}
	}
}
</script>
<style lang="scss">
.upload-image{
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	min-height: 150px;
	border-radius: 20px;
	border: 4px dotted black;
	font-family: 'Stint Ultra Condensed', cursive;
	font-size: 2rem;
}
.no-photos {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background: aliceblue url("./../../../assets/noEventsPhoto.png") no-repeat;
	background-size: auto 100%;
	width: 100%;
	min-height: 150px;
	border-radius: 20px;
}
.file-uploads {
	width: 100%;
}
.image-to-upload-col {
	height: 135px;
	display: flex;
	justify-content: center;
	.image-to-upload {
		margin: 4px 8px;
		border: 2px solid #ffebeb;
		border-radius: 10px;
	}
}
.event-image {
	border-radius: 2%
}
</style>
