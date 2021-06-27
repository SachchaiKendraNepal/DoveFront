<template>
	<v-card
		v-if="event"
		flat
		class="event-tab"
	>
		<v-row v-if="imageURLs.length > 0"
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
				<v-img
					class="image-to-upload" :src="imageUrl"
					max-width="220"
					height="130"
				>
					<v-btn fab
						x-small class="ma-2"
					>
						<v-icon class="badge-close"
							@click="removeUploadToImage(index)"
						>
							mdi-close
						</v-icon>
					</v-btn>
				</v-img>
			</v-col>
		</v-row>
		<v-card-text v-if="event.created_by">
			<div
				v-if="$helper.ifWriterIsCurrentUser(event.created_by.username)"
				class="upload-image-container"
			>
				<div class="upload-image cursor"
					@click="$refs.eventImageInput.click()"
				>
					Add image to event
				</div>
				<input
					v-show="false"
					id="event-image-input"
					ref="eventImageInput"
					class="file-input"
					type="file"
					multiple
					accept="image/*"
					@change="eventImagesForUploadChanged"
				>
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
		<div v-if="event.images">
			<v-card-text v-if="event.images.length === 0">
				<div class="no-photos">
					No photos added yet!
				</div>
			</v-card-text>
		</div>
		<v-row no-gutters
			class="pa-1"
		>
			<v-col
				v-for="img in event.images"
				:key="img.id"
				class="pa-1"
				cols="12"
				xl="4"
				lg="4"
				md="4"
				sm="4"
			>
				<card-img
					:src="img.image"
					height="200"
				>
					<v-btn icon
						class="action-btn"
					>
						<v-icon class="badge-close" color="error"
							@click="openAdminDeleteItemDialog(img.id, 'image')"
						>
							mdi-delete
						</v-icon>
					</v-btn>
				</card-img>
			</v-col>
		</v-row>
		<admin-delete-item-dialog
			model-name="event"
			delete-action="event/deleteImage"
		/>
	</v-card>
</template>
<script>
import {getFormData} from "@/Helper";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";
import {mapGetters} from "vuex";

export default {
	name: "EventPhotos",
	mixins: [AdminTableDeleteItemMixin],
	data: () => ({
		eventImagesForUpload: [],
		images: [],
		imageURLs: [],
	}),
	computed: {
		...mapGetters({
			event: "event/detail"
		})
	},
	methods: {
		eventImagesForUploadChanged(e) {
			if (e.target.getAttribute("id") === "event-image-input") {
				let URL = window.URL || window.webkitURL
				e.target.files.forEach(file => {
					this.images.push(file)
					this.imageURLs.push(URL.createObjectURL(file))
				})

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
	background: aliceblue url("./../../../assets/noEventPhotos.jpg") no-repeat;
	min-height: 150px;
	border-radius: 20px;
}
.file-uploads {
	width: 100%;
}
.image-to-upload-col {
	min-height: 160px;
	display: flex;
	justify-content: center;
	align-items: center;
	.image-to-upload {
		margin: 4px 8px;
		border: 2px solid #ffebeb;
		border-radius: 10px;
	}
}
.event-image {
	border-radius: 2%
}
.badge-close {
	z-index: 1;
}
</style>
