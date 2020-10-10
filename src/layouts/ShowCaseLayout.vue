<template>
	<v-card class="overflow-hidden">
		<v-app-bar
			color="rgb(0 0 0 / 10%)"
			absolute
			height="135"
			elevate-on-scroll
			scroll-target="#scrolling-techniques-7"
			style="z-index: 200"
		>
			<v-spacer />
			<v-avatar
				size="130"
				tile
			>
				<v-img
					:src="logo"
					alt="SacchaiLogo"
				/>
			</v-avatar>
			<v-spacer />
		</v-app-bar>
		<v-sheet
			id="scrolling-techniques-7"
			class="overflow-y-auto ma-0 pa-0"
			:max-height="screenHeight"
		>
			<div class="slider-wrapper">
				<show-case-slider />
			</div>
			<v-row
				class="ma-0 pa-0"
				justify="center"
				align="center"
			>
				<kendra-info-box />
			</v-row>
			<pin-bar
				title="Pinned Articles" icon="mdi-post"
			>
				<template #items>
					<v-container v-for="(item, i) in pinnedArticles"
						:key="i"
						class="ma-0 pa-0 pin-container"
					>
						<pinned-post :post="item" />
					</v-container>
				</template>
			</pin-bar>
			<div class="py-3" />
			<pin-bar
				title="Pinned Multimedias" icon="mdi-video-box"
			>
				<template #items>
					<v-container v-for="(item, i) in pinnedArticles"
						:key="i"
						class="ma-0 pa-0 pin-container"
					>
						<pinned-post :post="item" />
					</v-container>
				</template>
			</pin-bar>
			<div class="py-5" />
			<v-divider class="mb-6" />
			<v-row no-gutters>
				<scatter />
			</v-row>
		</v-sheet>
	</v-card>
</template>
<script>
export default {
	name: "ShowCaseLayout",
	components: {
		ShowCaseSlider: () => import("@/components/showcase/Slider"),
		KendraInfoBox: () => import("@/components/showcase/KendraInfo"),
		PinBar: () => import("@/components/showcase/PinnedBar"),
		PinnedPost: () => import("@/components/showcase/PinnedPost"),
		Scatter: () => import("@/components/showcase/Scatter"),
	},
	data: () => ({
		screenHeight: null,
		logo: require("@/assets/showcase_logo_v1.png"),
		pinnedArticles: [
			{
				id: 1,
				title: "How beautiful is nature?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 2,
				title: "How much is enough?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 3,
				title: "Peace of mind is always important",
				uploaded_by: "James H. Lewandowski",
			},
			{
				id: 4,
				title: "How beautiful is nature?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 5,
				title: "How much is enough?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 6,
				title: "Peace of mind is always important",
				uploaded_by: "James H. Lewandowski",
			},
			{
				id: 7,
				title: "How beautiful is nature?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 8,
				title: "How much is enough?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 9,
				title: "Peace of mind is always important",
				uploaded_by: "James H. Lewandowski",
			},
		],
		pinnedMultimedias: [
			{
				id: 1,
				title: "How beautiful is nature?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 2,
				title: "How much is enough?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 3,
				title: "Peace of mind is always important",
				uploaded_by: "James H. Lewandowski",
			},
			{
				id: 4,
				title: "How beautiful is nature?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 5,
				title: "How much is enough?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 6,
				title: "Peace of mind is always important",
				uploaded_by: "James H. Lewandowski",
			},
			{
				id: 7,
				title: "How beautiful is nature?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 8,
				title: "How much is enough?",
				uploaded_by: "Kiran Parajuli",
			},
			{
				id: 9,
				title: "Peace of mind is always important",
				uploaded_by: "James H. Lewandowski",
			},
		]
	}),
	mounted() {
		this.screenHeight = window.screen.height - 131
	}
}
</script>
<style lang="sass" scoped>
::v-deep .v-toolbar
	border-radius: 0 !important
.slider-wrapper
	top: 0 !important
::v-deep .v-app-bar--is-scrolled
	background-color: #fdfdfd !important
.overline
	font-size: 22px !important

.pin-container
	max-width: 320px
	height: 100%
	display: inline-block
</style>
