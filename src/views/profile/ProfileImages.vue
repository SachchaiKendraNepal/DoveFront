<template>
	<v-card
		v-if="currentUser"
		flat
	>
		<v-fab-transition>
			<card-img
				v-if="profile_image_to_upload"
				max-width="150"
				height="150"
				:src="profileImageToUploadBlobUrl"
			/>
		</v-fab-transition>
		<div class="py-2" />
		<v-file-input
			v-model="profile_image_to_upload"
			:loading="profile_input_loading"
			filled
			show-size
			chips
			clear-icon="mdi-close"
			clearable
			accept="image/*"
			:placeholder="'Add new profile image'.toUpperCase()"
			prepend-icon=""
			prepend-inner-icon="mdi-clipboard-account"
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
		<profile-no-content v-if="profileImages.length === 0"
			text="No profile image found for you. Please upload a new one and set your profile picture!"
		/>
		<v-card v-else>
			<v-row no-gutters>
				<v-col v-for="img in profileImages"
					:key="img.id"
					cols="4"
					class="ma-1"
				>
					<card-img
						height="230"
						:src="img.image"
					>
						<v-btn icon
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
									@click="setActiveConfirm(img.id)"
								>
									<v-icon :color="(img.active) ? 'orange lighten-2' : ''">
										mdi-star
									</v-icon>
								</v-btn>
							</template>
							<span v-if="img.active">Active Profile Image</span>
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
	name: "ProfileImages",
	mixins: [Snack],
	data: () => ({
		profile_input_loading: null,
		profile_image_to_upload: null,
	}),
	computed: {
		profileImageToUploadBlobUrl() {
			return URL.createObjectURL(this.profile_image_to_upload)
		},
		...mapGetters({
			formErrors: "profile/updateFormErrors",
			currentUser: "user/detail"
		}),
		profileImages() {
			if (!this.currentUser["profile"]) return []
			return this.currentUser["profile"]["profile_images"]
		},
		getErrorMessage() {
			if (this.formErrors) {
				if (this.formErrors["image"]) {
					return this.formErrors["image"]
				} return null
			} return null
		}
	},
	methods: {
		async uploadImage() {
			this.profile_input_loading = true
			const formData = this.$helper.getFormData({
				profile: this.$helper.getCurrentUser().profile.id,
				image: this.profile_image_to_upload
			})
			const res = await this.$store.dispatch("profile/uploadProfileImage", formData)
			if (res) {
				await this.openSnack("New profile image uploaded successfully.", "success")
				this.profile_image_to_upload = null
				this.$bus.emit("refresh-me")
			}
			else await this.openSnack("Profile image upload failed. Please try again.")
			this.profile_input_loading = false
		},
		async delete(id) {
			const res = await this.$store.dispatch("profile/deleteProfileImage", id)
			if (res) {
				await this.openSnack("Profile image removed successfully.", "success")
				this.$bus.emit("refresh-me")
			} else {
				await this.openSnack("Profile image delete failed. Please try again.")
			}
		},
		async confirmDelete(id) {
			confirm("Are you sure you want to delete this profile image?") && await this.delete(id)
		},
		async setActiveConfirm(id) {
			confirm("Are you sure you want to set this image as an active profile image?") && await this.setActive(id)
		},
		async setActive(id) {
			const res = await this.$store.dispatch("profile/setActiveProfileImage", id)
			if (res) {
				await this.openSnack("Profile image set active successfully.", "success")
				this.$bus.emit("refresh-me")
			} else {
				await this.openSnack("Profile image activation failed. Please try again.")
			}
		}
	}
}
</script>

<style>
.img-toolbar {
	font-size: .875rem;
	cursor: pointer !important;
}
</style>
