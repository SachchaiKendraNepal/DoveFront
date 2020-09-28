<template>
	<v-card
		id="start-post-card"
		class="mx-auto mb-4"
		outlined
	>
		<v-dialog
			v-model="dialog"
			max-width="500"
		>
			<template #activator="{ on, attrs }">
				<!-- eslint-disable-next-line vue/no-unused-vars-->
				<v-hover v-slot="{ hover }"
					close-delay="1"
				>
					<div
						id="start-post-box"
						class="d-flex align-center mx-4 mt-4 mb-1 pt-1 py-2"
						v-bind="attrs"
						v-on="on"
					>
						<v-avatar
							id="start-post-av"
							tile
							size="38"
							class="mx-4"
						>
							<v-img :src="writePostIcon" />
						</v-avatar>
						<p
							id="start-a-post"
							class="pa-0 ma-0"
						>
							Start a post
						</p>
					</div>
				</v-hover>
			</template>
			<start-post-box @close-dialog="closeDialog" />
		</v-dialog>
		<v-divider />
		<v-card-actions
			id="start-post-actions"
			class="d-flex justify-space-around"
		>
			<v-btn
				x-small
				depressed
				class="py-5"
			>
				<v-icon
					left
					size="24"
					color="#3aaada"
				>
					mdi-camera
				</v-icon>
				<span>Images</span>
			</v-btn>
			<v-btn
				x-small
				depressed
				class="py-5"
			>
				<v-icon
					left
					size="24"
					color="#9896f2"
				>
					mdi-music
				</v-icon>
				<span>Audios</span>
			</v-btn>
			<v-btn
				x-small
				depressed
				class="py-5"
			>
				<v-icon
					left
					size="24"
					color="#009688"
				>
					mdi-video
				</v-icon>
				<span>Videos</span>
			</v-btn>
			<v-btn
				x-small
				depressed
				class="py-5"
			>
				<v-icon
					left
					size="24"
					color="#ef7e37"
				>
					mdi-post
				</v-icon>
				<span>Write Article</span>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "AddPostBoxComponent",
	components: {
		StartPostBox: () => import("@/components/StartPost")
	},
	emits: ["close-post-dialog"],
	data: () => ({
		dialog: false,
		writePostIcon: require("@/assets/write_post_icon.jpg")
	}),
	methods: {
		closeDialog() {
			this.dialog = false
		}
	}
}
</script>

<style scoped lang="sass">
#start-post-av
	opacity: 0.7
#start-a-post
	font-size: 26px
	font-weight: 400
	font-family: "Acme", sans-serif
	letter-spacing: 1px
	color: #4f5151
#start-post-box:hover
	background-color: #e3f0fc
#start-post-actions button span
	font-size: 12px !important
	font-weight: bold
	@media only screen and (max-width: 974px) and (min-width: 600px)
		display: none
	@media only screen and (max-width: 480px)
		display: none
	@media only screen and (min-width: 1260px) and (max-width: 1470px)
		display: none
</style>
