<template>
	<v-card min-height="40vh"
		class="mx-2"
	>
		<video-player
			:poster="video.poster"
			:src="video.video"
			height="40vh"
		/>
		<v-card-title class="pt-0">
			{{ video.title }}
		</v-card-title>
		<v-card-subtitle>{{ video.subtitle }}</v-card-subtitle>
		<v-card-actions class="pa-2 pt-0 flex-wrap justify-space-between">
			<v-btn
				:small="$vuetify.breakpoint.width < 400"
				:x-small="$vuetify.breakpoint.width < 330"
				class="ma-1"
				depressed
				color="#953b93"
				dark
				@click="dialog=true"
			>
				<v-icon
					:small="$vuetify.breakpoint.width < 400"
				>
					mdi-pencil
				</v-icon>
			</v-btn>
			<v-btn depressed
				class="ma-1"
				:small="$vuetify.breakpoint.width < 400"
				:x-small="$vuetify.breakpoint.width < 330"
			>
				<v-icon
					:small="$vuetify.breakpoint.width < 400"
				>
					mdi-heart-outline
				</v-icon>
			</v-btn>
			<v-btn depressed
				class="ma-1"
				:small="$vuetify.breakpoint.width < 400"
				:x-small="$vuetify.breakpoint.width < 330"
			>
				<v-icon
					:small="$vuetify.breakpoint.width < 400"
				>
					mdi-comment-outline
				</v-icon>
			</v-btn>
			<v-btn depressed
				class="ma-1"
				:small="$vuetify.breakpoint.width < 400"
				:x-small="$vuetify.breakpoint.width < 330"
			>
				<v-icon
					:small="$vuetify.breakpoint.width < 400"
				>
					mdi-share
				</v-icon>
			</v-btn>
			<v-spacer />
			<v-btn depressed
				class="ma-1"
				:small="$vuetify.breakpoint.width < 400"
				:x-small="$vuetify.breakpoint.width < 330"
			>
				<v-icon
					:small="$vuetify.breakpoint.width < 400"
				>
					mdi-bookmark-outline
				</v-icon>
			</v-btn>
		</v-card-actions>
		<v-dialog v-model="dialog"
			max-width="500"
		>
			<v-card>
				<v-card-title class="d-flex flex-wrap grey lighten-3">
					<v-icon>mdi-youtube-studio</v-icon>
					<span class="px-1">Your video studio</span>
					<v-spacer />
					<v-chip label
						color="pink lighten-3"
					>
						#{{ video.id }}
					</v-chip>
				</v-card-title>
				<v-divider />
				<text-field
					v-model="editor.title"
					name="title"
					label="title"
					icon="mdi-format-title"
					:errors="formErrors"
				/>
				<text-field
					v-model="editor.subtitle"
					name="subtitle"
					label="subtitle"
					icon="mdi-subtitles"
					:errors="formErrors"
				/>
				<v-fab-transition>
					<v-col v-if="posterBlob"
						cols="12"
					>
						<card-img height="200"
							:src="posterBlob"
						>
							<fab-button color="grey-darken-1"
								icon="mdi-close"
								style="position: absolute; right: 1%; top: 1%"
								@click="clearPosterToUpload"
							/>
						</card-img>
					</v-col>
				</v-fab-transition>
				<v-col cols="12">
					<v-file-input v-model="posterToUpload"
						label="poster" name="poster"
						prepend-icon=""
						solo
						:clearable="false"
						show-size hide-details="auto"
						prepend-inner-icon="mdi-arrange-send-backward"
						accept="image/*"
						:error-messages="formErrors['poster']"
						@change="createBlob"
					/>
				</v-col>
				<v-card-actions class="d-flex justify-space-between">
					<v-btn depressed
						@click="dialog=false"
					>
						Cancel
					</v-btn>
					<v-btn color="primary"
						@click="patch"
					>
						Save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script>
import VideoPlayer from "@/components/multimedia/VideoPlayer.vue";
import FabButton from "@/components/button/FabButton.vue";
import Snack from "@/mixins/Snack.js";
export default {
	name: "MultimediaVideo",
	components: {FabButton, VideoPlayer},
	mixins: [Snack],
	props: {
		video: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		dialog: false,
		posterToUpload: null,
		posterBlob: null,
		editor: {
			title: null,
			subtitle: null,
		},
		formErrors: {}
	}),
	created() {
		this.editor = {
			title: this.video.title,
			subtitle: this.video.subtitle
		}
	},
	methods: {
		createBlob(e) {
			if (e) this.posterBlob = URL.createObjectURL(e)
		},
		clearPosterToUpload() {
			this.posterBlob = null
			this.posterToUpload = null
		},
		async patch() {
			console.log(this.posterToUpload)
			try {
				await this.$api.patch("multimedia-video/" + this.video.id + "/", this.$helper.getFormData({
					...this.editor,
					poster: this.posterToUpload
				}))
				await this.$store.dispatch("multimedia/filter", {is_approved: true})
				this.dialog = false
				await this.openSnack("Your video is updated successfully. This might take a while to load. Please keep your calm.", "success")
			} catch (e) {
				if (e.response.status === 400) {
					this.formErrors = e.response.body
				}
			}
		}
	}
}
</script>
