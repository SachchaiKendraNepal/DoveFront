<template>
	<v-card>
		<showcase-bar />
		<div class="slider-wrapper">
			<show-case-slider />
		</div>
		<div class="events-highlights-wrapper">
			<event-highlights />
		</div>
		<v-row
			class="ma-0 pa-0"
			justify="center"
			align="center"
		>
			<kendra-info-box />
		</v-row>
		<pin-bar
			title="Pinned Articles"
			icon="mdi-post"
		>
			<template #items>
				<v-container v-for="(item, i) in pinnedArticles"
					:key="i"
					class="ma-0 pa-0 mx-2"
				>
					<pinned-post :post="item"
						:is-article="true"
					/>
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
					class="ma-0 pa-0 mx-2"
				>
					<pinned-post :post="item" />
				</v-container>
			</template>
		</pin-bar>
		<div class="py-5" />
		<v-row no-gutters>
			<scatter />
		</v-row>
	</v-card>
</template>
<script>
import $ from "jquery"
import ShowCaseSlider from "@/components/showcase/Slider"
export default {
	name: "ShowCaseLayout",
	components: {
		ShowCaseSlider,
		ShowcaseBar: () => import("@/components/showcase/ShowCaseBar"),
		EventHighlights: () => import("@/components/showcase/EventHighlights"),
		KendraInfoBox: () => import("@/components/showcase/KendraInfo"),
		PinBar: () => import("@/components/showcase/PinnedBar"),
		PinnedPost: () => import("@/components/showcase/PinnedPost"),
		Scatter: () => import("@/components/showcase/Scatter"),
	},
	data: () => ({
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
}
</script>
<style lang="sass" scoped>
.overline
	font-size: 22px !important
.events-highlights-wrapper
	margin: -80px 20px 0 20px
</style>
