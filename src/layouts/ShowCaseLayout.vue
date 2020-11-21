<template>
	<div id="showcase-wrapper">
		<v-app-bar
			class="home-app-bar"
			fixed
			dark
			height="auto"
			scroll-target="#scrolling-techniques-5"
			scroll-threshold="500"
		>
			<div class="social-networks text-center">
				<v-icon
					v-ripple
					color="#3a80ec"
					size="20"
				>
					mdi-facebook
				</v-icon>
				<v-icon
					v-ripple
					color="#f71701"
					size="20"
				>
					mdi-youtube
				</v-icon>
				<v-icon
					v-ripple
					size="20"
					color="#bb2d71"
				>
					mdi-instagram
				</v-icon>
				<v-icon
					v-ripple
					color="rgb(62 161 242)"
					size="20"
				>
					mdi-twitter
				</v-icon>
			</div>
			<v-spacer />

			<v-avatar
				size="100"
				class="logo-avatar"
			>
				<v-img
					:src="logo"
					alt="SacchaiLogo"
				/>
			</v-avatar>

			<v-spacer />

			<v-btn
				id="register-button"
				v-bind="size"
				depressed
				color="success"
				@click="routeToRegisterPage()"
			>
				<v-icon v-if="$vuetify.breakpoint.mdAndDown"
					:v-bind="size + 5"
				>
					mdi-account-plus
				</v-icon>
				<span v-if="$vuetify.breakpoint.lgAndUp">Register</span>
			</v-btn>
		</v-app-bar>
		<div class="slider-wrapper">
			<show-case-slider />
		</div>
		<event-highlights />
		<kendra-info-box />
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
		<scatter />
		<services-peek />
		<our-great-stuff />
		<awesome-swiper />
		<showcase-map />
		<scroll-top
			color="grey darken-4"
		/>
		<div class="mt-3">
			<home-footer />
		</div>
	</div>
</template>
<script>
import ShowCaseSlider from "@/components/showcase/Slider"
import router from "@/router";
import $ from "jquery";
export default {
	name: "ShowCaseLayout",
	components: {
		ShowCaseSlider,
		ScrollTop: () => import("@/components/ScrollTop"),
		ServicesPeek: () => import("@/components/showcase/PeekServices"),
		// ShowcaseBar: () => import("@/components/showcase/ShowCaseBar"),
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
	computed: {
		size() {
			const size = {
				xs: "small",
				sm: "small",
				md: "medium",
				lg: "medium",
				xl: "medium",
			}[this.$vuetify.breakpoint.name]
			return size ? {[size]: true} : {}
		}
	},
	mounted: function () {
		this.initBarTransparency()
		this.initBarScrollColoring()
	},
	methods: {
		routeToRegisterPage() {
			router.push({name: "SACHCHAI REGISTER"})
		},
		initBarTransparency() {
			$(document).ready(() => {
				const scrollTop = $(window).scrollTop()
				if (scrollTop === 0) {
					$(".home-app-bar").css({
						background: "rgb(255,255,255, 0)"
					})
				}
			})
		},
		initBarScrollColoring() {
			$(window).scroll(function () {
				console.log("here")
				const scrollTop = $(this).scrollTop()
				$(".home-app-bar").css({
					backgroundColor: function () {
						const elementHeight = $(this).height();
						return "rgb(245,245,245," + (1 - (elementHeight - scrollTop) / elementHeight).toString()
					}
				})
			})
		}
	}
}
</script>
<style lang="sass" scoped>
#showcase-wrapper
	background-color: #d9ecf4
.overline
	font-size: 22px !important
.slider-wrapper
	background: #d9ecf4
#register-button:hover
	border: 2px solid #007e00 !important
	background-color: transparent !important
	color: #007e00 !important
.logo-avatar
	transition: all .3s
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 240px)
		height: 50px !important
		min-width: 50px !important
		width: 50px !important
	@media only screen and (max-width: 190px)
		height: 0 !important
		min-width: 0 !important
		width: 0 !important
		visibility: hidden
		opacity: 0
		overflow: hidden
</style>
