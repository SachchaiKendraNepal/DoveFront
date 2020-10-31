<template>
	<v-row
		class="ma-0 pa-0"
		align="center"
		justify="space-around"
	>
		<v-col
			class="ma-0 pa-0"
			cols="12"
			xl="4"
			lg="4"
			md="4"
			sm="6"
			xs="6"
		>
			<v-card
				flat
				max-height="400"
				color="rgb(217 236 244)"
				class="px-xl-16 px-lg-16 px-md-6"
			>
				<v-row no-gutters
					justify="start" align="center"
				>
					<v-col
						cols="12"
						xl="3"
						lg="3"
						md="4"
						sm="4"
						xs="4"
						class="text-center"
					>
						<v-avatar size="90"
							class="elevation-14"
						>
							<v-icon
								size="80"
								color="red darken-2"
							>
								mdi-bullseye-arrow
							</v-icon>
						</v-avatar>
					</v-col>
					<v-col
						cols="12"
						xl="9"
						lg="9"
						md="8"
						sm="8"
						xs="8"
					>
						<v-card-text class="pin-header py-0">
							Become a part of something great
						</v-card-text>
					</v-col>
				</v-row>
				<v-card-text v-show="$vuetify.breakpoint.smAndUp"
					class="subtitle-1"
				>
					We provide a nice feeds management for our followers.
					We can post our thoughts, events or any inspirations as Sachchai Nepal Post.
				</v-card-text>
				<v-card-text class="subtitle-2 text-center">
					See our top pinned items here. <v-icon large>
						mdi-arrow-right
					</v-icon>
				</v-card-text>
				<v-card-actions>
					<v-btn large
						text
						color="blue darken-1"
					>
						<v-icon>mdi-plus</v-icon>Explore All
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
		<v-col
			cols="12"
			xl="8"
			lg="8"
			md="8"
			sm="6"
			xs="6"
			class="ma-0 pa-0"
		>
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<slot name="items" />
				</div>
				<div class="swiper-button-prev" />
				<div class="swiper-button-next" />
			</div>
		</v-col>
	</v-row>
</template>
<script>
import Swiper, { Navigation, Pagination } from "swiper"

export default {
	name: "PinnedBarComponent",
	props: {
		title: {type: String, required: true},
		icon: {type: String, required: true},
		toolbarColor: {type: String, required: true}
	},
	mounted() {
		this.initSwiper()
	},
	methods: {
		onSwiper(swiper) {
			// console.log(swiper)
		},
		onSlideChange() {
			// console.log("slide change")
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
				breakpoints: {
					115: {
						slidesPerView: 1,
						spaceBetween: 25,
					},
					325: {
						slidesPerView: 2,
						spaceBetween: 25,
					},
					600: {
						slidesPerView: 1,
						spaceBetween: 25,
					},
					634: {
						slidesPerView: 2,
						spaceBetween: 25,
					},
					960: {
						slidesPerView: 3,
						spaceBetween: 25,
					},
					1270: {
						slidesPerView: 4,
						spaceBetween: 25,
					},
					1700: {
						slidesPerView: 5,
						spaceBetween: 25,
					},
					2000: {
						slidesPerView: 6,
						spaceBetween: 25,
					},
					2400: {
						slidesPerView: 7,
						spaceBetween: 25,
					},
					3010: {
						slidesPerView: 8,
						spaceBetween:25
					}
				},
				grabCursor: true,
				speed: 1500,
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			})
		}
	}
}
</script>
<style lang="sass" scoped>
.swiper-container
	width: 100%
	height: 356px
.overline
	font-size: 14px !important
.pin-header
	text-align: center
	font-family: "Acme", sans-serif
	@media only screen and (min-width:1390px)
		font-size: 52px
		line-height: 52px
	@media only screen and (min-width:1119px) and (max-width: 1389px)
		font-size: 48px
		line-height: 40px
	@media only screen and (min-width:600px) and (max-width: 1118px)
		font-size: 32px
		line-height: 32px
	@media only screen and (min-width:300px) and (max-width: 599px)
		font-size: 48px
		line-height: 48px
	@media only screen and (max-width:299px)
		font-size: 32px
		line-height: 32px
</style>
