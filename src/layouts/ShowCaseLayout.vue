<template>
	<v-card>
		<v-app-bar
			id="showcase-nav-bar"
			fixed
			light
			height="135"
		>
			<v-spacer />
			<v-avatar
				size="130"
				class="logo"
			>
				<v-img
					:src="logo"
					alt="SacchaiLogo"
				/>
			</v-avatar>
			<v-spacer />
		</v-app-bar>
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
			title="Pinned Articles"
			icon="mdi-post"
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
		<div class="py-3" />
		<pin-bar
			title="Pinned Multimedias" icon="mdi-video-box"
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
		<div class="py-5" />
		<v-row no-gutters>
			<scatter />
		</v-row>
	</v-card>
</template>
<script>
import $ from "jquery"
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
	mounted: function () {
		$(window).scroll(function () {
			const scrollTop = $(this).scrollTop()
			$("#showcase-nav-bar").css({
				background: function () {
					const elementHeight = $(this).height();
					return "rgb(255,255,255," +  (1 - (elementHeight - scrollTop) / elementHeight).toString()
				}
			});
		});
	}
}
</script>
<style lang="sass" scoped>
.overline
	font-size: 22px !important
#showcase-nav-bar
	background: rgba(255, 255, 255, 0)
</style>
