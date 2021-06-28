<template>
	<v-card
		flat
	>
		<v-fab-transition>
			<card-img
				v-if="cover_image_to_upload"
				height="300"
				:src="coverImageToUploadBlobUrl"
			/>
		</v-fab-transition>
		<div class="py-2" />
		<v-file-input
			v-model="cover_image_to_upload"
			:loading="cover_input_loading"
			filled
			show-size
			chips
			clear-icon="mdi-close"
			clearable
			accept="image/*"
			:placeholder="'Add new cover image'.toUpperCase()"
			prepend-icon=""
			prepend-inner-icon="mdi-image-area"
		>
			<template #append>
				<v-btn
					style="margin-top: -4px !important;"
					icon
					small
					class="ma-0 pa-0"
					@click="uploadImage"
				>
					<v-icon
						size="28"
						class="ma-0 pa-0 rotate"
						color="teal"
					>
						mdi-send
					</v-icon>
				</v-btn>
			</template>
		</v-file-input>
		<profile-no-content v-if="coverImages.length === 0"
			text="No cover image found for you. Please upload a new one and set background for your profile picture!"
		/>
		<v-card v-else>
			<v-row no-gutters>
				<v-col v-for="img in coverImages"
					:key="img.id"
					cols="12"
					class="d-flex justify-space-around flex-wrap pa-2"
				>
					<card-img height="230"
						:src="img.image"
					>
						<v-btn icon
							small
							class="action-btn"
							@click="confirmDelete(img.id)"
						>
							<v-icon color="error">
								mdi-delete
							</v-icon>
						</v-btn>
						<v-tooltip bottom>
							<template #activator="{on, attrs}">
								<v-btn icon
									v-bind="attrs"
									class="action-btn"
									v-on="on"
									@click="confirmSetActive(img.id)"
								>
									<v-icon :color="(img.active) ? 'orange lighten-2' : ''">
										mdi-star
									</v-icon>
								</v-btn>
							</template>
							<span v-if="img.active">Active Cover Image</span>
							<span v-else>Set as active</span>
						</v-tooltip>
					</card-img>
				</v-col>
			</v-row>
		</v-card>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";
import Snack from "@/mixins/Snack";

export default {
	name: "CoverImages",
	mixins: [Snack],
	data: () => ({
		cover_input_loading: null,
		cover_image_to_upload: null,
	}),
	computed: {
		...mapGetters({
			formErrors: "profile/updateFormErrors",
			currentUser: "user/detail"
		}),
		coverImages() {
			if(!this.currentUser["profile"]["cover_images"]) return []
			return this.currentUser["profile"]["cover_images"]
		},
		getErrorMessage() {
			if (this.formErrors) {
				if (this.formErrors["image"]) {
					return this.formErrors["image"]
				} return null
			} return null
		},
		coverImageToUploadBlobUrl() {
			return URL.createObjectURL(this.cover_image_to_upload)
		},
	},
	methods: {
		async uploadImage() {
			this.cover_input_loading = true
			const formData = this.$helper.getFormData({
				profile: this.$helper.getCurrentUser().profile.id,
				image: this.cover_image_to_upload
			})
			const res = await this.$store.dispatch("profile/uploadCoverImage", formData)
			if (res) {
				await this.openSnack("New cover image uploaded successfully.", "success")
				this.cover_image_to_upload = null
				this.$bus.emit("refresh-me")
			}
			else await this.openSnack("Cover image upload failed. Please try again.")
			this.cover_input_loading = false
		},
		async delete(id) {
			const res = await this.$store.dispatch("profile/deleteCoverImage", id)
			if (res) {
				await this.openSnack("Cover image removed successfully.", "success")
				this.$bus.emit("refresh-me")
			} else {
				await this.openSnack("Cover image delete failed. Please try again.")
			}
		},
		async confirmDelete(id) {
			confirm("Are you sure you want to delete this image?") && await this.delete(id)
		},
		async confirmSetActive(id) {
			confirm("Are you sure you want to set this image as an active cover image?") && await this.setActive(id)
		},
		async setActive(id) {
			const res = await this.$store.dispatch("profile/setActiveCoverImage", id)
			if (res) {
				await this.openSnack("Cover image set active successfully.", "success")
				this.$bus.emit("refresh-me")
			} else {
				await this.openSnack("Cover image activation failed. Please try again.")
			}
		}
	}
}
</script>

<style scoped>

</style>
