<template>
	<v-card color="#d9ecf3">
		<scroll-top
			color="grey darken-4"
		/>
		<showcase-bar />
		<div class="slider-wrapper">
			<show-case-slider />
		</div>
		<event-highlights />
		<v-row
			class="ma-0 pa-0"
			justify="center"
			align="center"
		>
			<kendra-info-box />
		</v-row>
		<v-divider inset
			class="my-2 mb-10"
		/>
		<pin-bar
			title="Pinned Articles"
			icon="mdi-post"
			toolbar-color="success"
		>
			<template #items>
				<v-card
					v-for="(item, index) in pinnedArticles"
					:key="index"
					class="swiper-slide"
					dark
				>
					<pinned-post :post="item"
						:is-article="true"
					/>
				</v-card>
			</template>
		</pin-bar>
		<v-divider inset
			class="my-2 mt-8"
		/>
		<v-row class="ma-0 pa-0">
			<scatter />
		</v-row>
		<div class="peek-services-wrapper">
			<services-peek />
		</div>
		<our-great-stuff />
		<awesome-swiper />
		<div class="mt-3">
			<showcase-map />
		</div>
		<div class="mt-3">
			<home-footer />
		</div>
	</v-card>
</template>
<script>
import ShowCaseSlider from "@/components/showcase/Slider"
export default {
	name: "ShowCaseLayout",
	components: {
		ShowCaseSlider,
		ScrollTop: () => import("@/components/ScrollTop"),
		ServicesPeek: () => import("@/components/showcase/PeekServices"),
		ShowcaseBar: () => import("@/components/showcase/ShowCaseBar"),
		EventHighlights: () => import("@/components/showcase/EventHighlights"),
		KendraInfoBox: () => import("@/components/showcase/KendraInfo"),
		PinBar: () => import("@/components/showcase/PinnedBar"),
		PinnedPost: () => import("@/components/showcase/PinnedPost"),
		Scatter: () => import("@/components/showcase/Scatter"),
		HomeFooter: () => import("@/views/home_layout/Footer"),
		OurGreatStuff: () => import("@/components/showcase/OurGreatStuff"),
		ShowcaseMap: () => import("@/components/showcase/Map"),
		AwesomeSwiper: () => import("@/components/showcase/AwesomeSwiper")
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
.slider-wrapper
	background: #d9ecf3
</style>
