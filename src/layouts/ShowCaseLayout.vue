<template>
	<div id="showcase-wrapper">
		<v-app-bar
			class="home-app-bar"
			fixed
			dark
			height="auto"
			scroll-target="#scrolling-techniques-5"
			scroll-threshold="500"
			color="rgb(126 206 216)"
		>
			<div class="social-networks text-center">
				<v-icon
					v-ripple
					color="rgb(25 55 103)"
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
			</div>
			<v-spacer />

			<v-avatar
				size="100"
				class="logo-avatar ma-0 pa-0"
			>
				<v-img
					class="ma-0 pa-0"
					:src="logo"
					alt="SacchaiLogo"
					width="107%"
					height="107%"
				/>
			</v-avatar>

			<v-spacer />

			<v-btn
				id="register-button"
				v-bind="size"
				depressed
				color="success"
				class="elevation-4"
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
		<pin-bar />
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
		Scatter: () => import("@/components/showcase/Scatter"),
		HomeFooter: () => import("@/views/home_layout/Footer"),
		OurGreatStuff: () => import("@/components/showcase/OurGreatStuff"),
		ShowcaseMap: () => import("@/components/showcase/Map"),
		AwesomeSwiper: () => import("@/components/showcase/AwesomeSwiper")
	},
	data: () => ({
		logo: require("@/assets/showcase_logo_v1.png")
	}),
	computed: {
		size() {
			const size = {
				xs: "medium",
				sm: "medium",
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
			router.push({name: "REGISTER"})
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
						return "rgb(10,158,177," + (1 - (elementHeight - scrollTop) / elementHeight).toString()
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
.home-app-bar
	z-index: 100
#register-button
	min-width: 70px
	margin: 0 5px
	@media only screen and (max-width: 190px)
		margin: 0
		min-width: 5px
#register-button:hover
	border: 2px solid #45ae59 !important
	background-color: white !important
	color: #45ae59 !important
.logo-avatar
	background-color: black
	transition: all .3s
	visibility: visible
	border: none
	opacity: 1
	@media only screen and (max-width: 600px) and (min-width: 191px)
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
