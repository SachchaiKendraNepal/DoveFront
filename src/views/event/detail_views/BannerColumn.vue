<template>
	<v-col
		id="cover-column"
		cols="12"
		class="pa-0"
	>
		<v-fade-transition>
			<v-img
				v-if="banners"
				:src="banners['image']"
				height="60vh"
				max-width="1000"
				class="mx-auto event-banner"
			>
				<div
					v-if="$helper.ifWriterIsCurrentUser(event['created_by']['username'])"
					class="banner-action"
				>
					<v-tooltip right>
						<template #activator="{ on, attrs }">
							<v-btn
								v-bind="attrs"
								fab
								x-small
								dark class="ma-2"
								v-on="on"
								@click="deleteBannerImage(banners[0]['id'])"
							>
								<v-icon color="red lighten-1">
									mdi-delete
								</v-icon>
							</v-btn>
						</template>
						<span>Remove banner</span>
					</v-tooltip>
				</div>
			</v-img>
			<div v-else>
				<v-img
					v-if="bannerImageToUpload"
					id="event-banner-to-upload"
					:src="bannerImageUrl"
					height="60vh"
					max-width="1000"
					class="mx-auto event-banner"
				>
					<div class="d-flex align-center justify-space-between">
						<v-tooltip right>
							<template #activator="{ on, attrs }">
								<v-btn
									v-bind="attrs"
									fab
									x-small
									dark class="ma-2"
									v-on="on"
									@click.stop="cancelBannerUpdate"
								>
									<v-icon color="red lighten-1">
										mdi-close
									</v-icon>
								</v-btn>
							</template>
							<span>Cancel</span>
						</v-tooltip>
						<v-tooltip left>
							<template #activator="{ on, attrs }">
								<v-btn
									v-bind="attrs"
									fab
									x-small
									dark class="ma-2"
									v-on="on"
									@click.stop="uploadBanner"
								>
									<v-icon color="green lighten-1">
										mdi-check-circle
									</v-icon>
								</v-btn>
							</template>
							<span>Set Banner</span>
						</v-tooltip>
					</div>
				</v-img>
				<v-img
					v-else
					:src="require('@/assets/default_event_banner.png')"
					height="60vh"
					max-width="1000"
					class="mx-auto event-banner cursor"
					@click="$refs.bannerInput.click()"
				>
					<div class="fill-height d-flex justify-center align-center white--text">
						<h2 class="text-center">
							Set banner image for your event!
						</h2>
					</div>
				</v-img>
				<input
					v-show="false"
					id="banner-input"
					ref="bannerInput"
					class="file-input"
					type="file"
					accept="image/*"
					@change="bannerImageInputChanged"
				>
			</div>
		</v-fade-transition>
	</v-col>
</template>

<script>
import Snack from "@/mixins/Snack.js";

export default {
	name: "BannerColumn",
	mixins: [Snack],
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	emits: ["refresh-event"],
	data: () => ({
		bannerImageToUpload: null,
		imageURLs: [],
		bannerImageUrl: null
	}),
	computed: {
		banners() {
			return this.event["banner_images"]
		},
	},
	methods: {
		cancelBannerUpdate() {
			this.bannerImageToUpload = null
		},
		bannerImageInputChanged(e) {
			if (e.target.getAttribute("id") === "banner-input") {
				this.bannerImageToUpload = e.target.files[0]
				let URL = window.URL || window.webkitURL
				this.bannerImageUrl = URL.createObjectURL(e.target.files[0])
			}
		},
		async uploadBanner() {
			const body = this.$helper.getFormData({
				event: this.event.id,
				image: this.bannerImageToUpload
			})
			try {
				await this.$api.post("/event-banner/", body)
				await this.$emit("refresh-event")
				await this.openSnack("Event banner added successfully.", "success")
			} catch (e) {
				if (parseInt(e.response.status.toString()) === 400) {
					if (e.response.data["image"]) {
						await this.openSnack(e.response.data["image"][0])
					}
				} else {
					await this.openSnack("Event banner upload failed. Please try again.")
				}

			}
		},
		async deleteBannerImage(bannerId) {
			try {
				await this.$api.delete("/event-banner/" + bannerId + "/")
				await this.openSnack("Event banner removed.", "success")
				await this.$emit("refresh-event")
			} catch (e) {
				await this.openSnack("Event banner remove failed.")
			}
		}
	}
}
</script>

<style scoped lang="sass">
.event-banner
	transition: visibility ease-in-out .5s
	border-radius: 0 0 10px 10px !important
	.banner-action
		visibility: hidden
.event-banner:hover
	.banner-action
		visibility: visible
</style>
