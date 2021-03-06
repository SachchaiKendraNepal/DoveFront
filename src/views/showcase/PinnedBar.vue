<template>
	<v-row
		class="ma-0 pa-0"
		align="center"
		justify="space-around"
	>
		<v-col
			class="ma-0 pa-0"
		>
			<v-card
				:loading="loading"
				flat
				class="pin-bg-card rounded-0 fill-height"
				min-height="800"
			>
				<v-row no-gutters
					justify="center" align="center"
				>
					<v-col
						cols="12"
					>
						<v-card-text class="pin-header py-4 showcase-blue-color">
							Become a part of something great!
						</v-card-text>
					</v-col>
					<v-col
						cols="12"
						class="text-center py-4"
					>
						<v-avatar
							color="white"
							size="90"
							class="elevation-14 bulls-eye-avatar"
						>
							<v-icon
								size="80"
								color="red darken-2"
							>
								mdi-bullseye-arrow
							</v-icon>
						</v-avatar>
					</v-col>
					<v-col v-show="$vuetify.breakpoint.mdAndUp"
						cols="12"
					>
						<v-card-text
							class="subtitle-1 d-flex justify-center pb-0 grey--text text--darken-2 font-weight-bold"
						>
							We provide a nice feeds management for our followers.
							We can post our thoughts, events or any inspirations as Sachchai Nepal Post.
						</v-card-text>
					</v-col>
					<v-col v-show="$vuetify.breakpoint.smAndUp"
						cols="12"
					>
						<v-card-text class="view-top-pins text-center blue--text text--darken-2">
							<h3>
								See our top pinned items here. <v-icon large>
									mdi-arrow-right
								</v-icon>
							</h3>
						</v-card-text>
					</v-col>
					<v-col cols="12">
						<v-card-actions class="py-0 d-flex justify-center mt-4 mt-sm-0 mt-md-0 mt-lg-0 mt-xl-0">
							<v-btn large
								elevation="4"
								dark
								class="explore-pin-btn"
								color="showcase-blue-bg"
							>
								<v-icon>mdi-eye-circle</v-icon>
								<span v-show="$vuetify.breakpoint.smAndUp"
									class="ml-4"
								>Explore All</span>
							</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
		<v-col
			v-if="pinnedMedias"
			cols="12"
			class="ma-0 pa-0 pin-column"
		>
			<v-card v-if="pinnedMedias.count === 0"
				flat color="transparent"
				class="text-center"
			>
				<div class="grey--text">
					No pins yet!
				</div>
			</v-card>
			<div v-else
				class="swiper-container"
			>
				<div class="swiper-wrapper">
					<v-card
						v-for="(item) in pinnedMedias.results"
						:key="item.id"
						class="swiper-slide"
						dark
					>
						<pinned-post :post="item" />
					</v-card>
				</div>
				<!-- If we need pagination -->
				<div class="swiper-button-prev" />
				<div class="swiper-button-next" />
			</div>
		</v-col>
	</v-row>
</template>
<script>
import Swiper, { Navigation, Pagination } from "swiper"
import {mapGetters} from "vuex";
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

ScrollTrigger.defaults({
	toggleActions: "restart pause resume pause",
	scrub: 1
});

export default {
	name: "PinnedBarView",
	components: {
		PinnedPost: () => import("@/views/showcase/PinnedPost"),
	},
	data: () => ({
		loading: false,
		pinItems: []
	}),
	computed: {
		...mapGetters({
			pinnedMedias: "post/pinnedPostList"
		})
	},
	mounted() {
		gsap.timeline({
			scrollTrigger: {
				trigger: ".pin-bg-card",
				start: "top center",
				end: "+=800",
			},
		})
			.from(".pin-header", {
				scale: 4,
				opacity: 0,
				color: "transparent",
				duration: .5
			})
			.from(".bulls-eye-avatar", {
				opacity: 20,
				duration: 2,
				ease: "ease",
				rotation: 360*7,
			})
		gsap.timeline({
			scrollTrigger: {
				trigger: ".pin-bg-card",
				start: "top center",
				end: "+=400",
			},
		})
			.from(".explore-pin-btn", {
				y: 600,
				opacity: 0,
				ease: "bounce",
			})
			.from(".view-top-pins", {
				scale: 1.3,
				opacity: 0,
				ease: "ease",
			})
		const slides = gsap.utils.toArray(".swiper-slide")
		if (slides.length > 0) {
			gsap.timeline({
				scrollTrigger: {
					trigger: ".pin-bg-card",
					scrub: 1,
					start: "top 400px",
					end: "+=600"
				}
			})
				.from(slides, {
					opacity: 0,
					scale: .5,
					y: 400,
					ease: "back.out(4)",
					duration: 2.5
				})
		}
	},
	async created() {
		await this.init()
		await this.initSwiper()
	},
	methods: {
		async init() {
			await this.$store.dispatch("post/fetchPinnedMultimedia")
			console.log(this.pinnedMedias)
		},
		initSwiper() {
			Swiper.use([Navigation, Pagination]);

			const pinSwiper = new Swiper(".swiper-container", {
				direction: "horizontal",
				loop: false,
				freeMode: true,
				centerInsufficientSlides: true,
				slidesOffsetBefore: 10,
				slidesOffsetAfter: 10,
				spaceBetween: 25,
				breakpoints: {
					250: {
						slidesPerView: 1,
					},
					500: {
						slidesPerView: 2
					},
					750: {
						slidesPerView: 3,
					},
				},
				grabCursor: true,
				speed: 1500,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				pagination: {
					el: ".swiper-pagination",
					dynamicBullets: false,
					clickable: true,
					type: "bullets"
				},
			})
		}
	}
}
</script>
<style>
.swiper-pagination {
	bottom: -5px !important;
}
.swiper-pagination-bullet {
	background-color: white;
	width: 12px !important;
	height: 12px !important;
	opacity: .4;
	transition: all .2s;
}
.swiper-pagination-bullet-active {
	background-color: white !important;
	opacity: 1;
}
</style>
<style lang="sass" scoped>
.pin-column
	transition: all .2s
	margin-top: -40px !important
	@media only screen and (max-width: 1390px)  and (min-width: 960px)
		margin-top: -100px !important
		@media only screen and (max-width: 994px)
			margin-top: -80px !important
	@media only screen and (max-width: 959px)
		margin-top: -150px !important
	@media only screen and (max-width: 355px)
		margin-top: -100px !important
	@media only screen and (max-width: 305px)
		margin-top: -50px !important
	@media only screen and (max-width: 299px)
		margin-top: -180px !important
	@media only screen and (max-width: 245px)
		margin-top: -150px !important
	@media only screen and (max-width: 214px)
		margin-top: -110px !important
	@media only screen and (max-width: 140px)
		margin-top: -70px !important
	@media only screen and (max-width: 137px)
		margin-top: -150px !important

.pin-bg-card
	overflow: hidden
	display: flex
	justify-content: center
	align-items: center
	background: #f1f1f2

.swiper-container
	margin: 0 auto
	max-width: 1000px
	height: 356px
.overline
	font-size: 14px !important
.pin-header
	text-align: center
	font-family: "Acme", sans-serif
	@media only screen and (min-width: 1390px)
		font-size: 52px
		line-height: 52px
	@media only screen and (min-width: 1119px) and (max-width: 1389px)
		font-size: 48px
		line-height: 40px
	@media only screen and (min-width: 600px) and (max-width: 1118px)
		font-size: 32px
		line-height: 32px
	@media only screen and (min-width: 300px) and (max-width: 599px)
		font-size: 48px
		line-height: 48px
	@media only screen and (max-width: 299px)
		font-size: 32px
		line-height: 32px
	@media only screen and (max-width: 137px)
		display: none
.subtitle-1
	max-width: 800px
	margin: 0 auto
	text-align: center
</style>
