<template>
	<!--	TODO: make dark implementation too -->
	<v-card
		id="start-post-card"
		color="white"
		class="mx-auto mb-3 elevation-2"
		max-width="800"
		outlined
	>
		<div
			id="start-post-box"
			class="d-flex align-center mx-4 mt-4 mb-1 pt-1 py-2"
			@click.stop="openStartPostBoxDialog"
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
		<start-post-box />
		<v-divider />
		<v-row
			id="start-post-actions"
			no-gutters
			justify="space-around"
			align="center"
		>
			<v-card-actions
				v-for="(item, index) in actionButtons"
				:key="index"
				class="ma-0 pa-0"
			>
				<depressed-button
					:icon="item.icon"
					:text="item.text"
					:color="item.color"
					size="22"
					:tooltip="item.text"
				/>
			</v-card-actions>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: "AddPostBoxComponent",
	components: {
		StartPostBox: () => import("@/components/StartPost"),
		DepressedButton: () => import("@/components/DerpressedButtonWithToolTip")
	},
	emits: ["close-post-dialog"],
	data: () => ({
		actionButtons: [
			{icon: "mdi-camera", text: "Images", color: "#3aaada"},
			{icon: "mdi-music", text: "Audios", color: "#9896f2"},
			{icon: "mdi-video", text: "Videos", color: "#009688"},
			{icon: "mdi-calendar-text", text: "Event", color: "#c21d98"},
			{icon: "mdi-post", text: "Write Article", color: "#ef7e37"},
		],
		dialog: false,
		writePostIcon: require("@/assets/write_post_icon.jpg")
	}),
	methods: {
		openStartPostBoxDialog() {
			this.$bus.emit("open-start-post-dialog")
		},
	}
}
</script>

<style scoped lang="sass">
#start-post-av
	transition: all .3s
	opacity: 0.7
	@media only screen and (max-width: 225px)
		height: 22px !important
		min-width: 22px !important
		width: 22px !important
#start-a-post
	transition: all .3s
	font-size: 26px
	font-weight: 400
	font-family: "Acme", sans-serif
	letter-spacing: 1px
	color: #4f5151
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 225px)
		visibility: visible
		font-size: 16px
		opacity: 1
	@media only screen and (max-width: 160px)
		visibility: hidden
		opacity: 0
		overflow: hidden
#start-post-box
	@media only screen and (max-width: 225px)
		padding: 4px
		margin: 0 !important
#start-post-box:hover
	background-color: #e3f0fc
::v-deep span.btn-text
	font-size: 10px !important
	font-weight: bold
	@media only screen and (max-width: 974px) and (min-width: 600px)
		display: none
	@media only screen and (max-width: 480px)
		display: none
	@media only screen and (min-width: 1260px) and (max-width: 1470px)
		display: none
</style>
