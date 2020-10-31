<template>
	<!-- Slider main container -->
	<div class="swiper-container">
		<!-- Additional required wrapper -->
		<div class="swiper-wrapper">
			<!-- Slides -->
			<v-card class="swiper-slide">
				<v-card-text>Hero One</v-card-text>
			</v-card>
			<v-card class="swiper-slide">
				<v-card-text>Hero Two</v-card-text>
			</v-card>
			<v-card class="swiper-slide">
				<v-card-text>Hero Three</v-card-text>
			</v-card>
			<v-card class="swiper-slide">
				<v-card-text>Hero Four</v-card-text>
			</v-card>
		</div>
		<!-- If we need pagination -->
		<div class="swiper-pagination" />

		<!-- If we need navigation buttons -->
		<div class="swiper-button-prev" />
		<div class="swiper-button-next" />
	</div>
</template>
<script>
import Swiper, { Navigation, Pagination } from "swiper"

export default {
	name: "AwesomeSwiperComponent",
	mounted() {
		// core version + navigation, pagination modules:
		Swiper.use([Navigation, Pagination]);

		const mySwiper = new Swiper(".swiper-container", {
			// Optional parameters
			direction: "horizontal",
			loop: false,
			spaceBetween: 10,
			freeMode: true,
			centerInsufficientSlides: true,
			slidesOffsetBefore: 50,
			slidesOffsetAfter: 50,
			breakpoints: {
				200: {
					slidesPerView: 1,
				},
				// when window width is >= 480px
				400: {
					slidesPerView: 2,
				},
				// when window width is >= 640px
				600: {
					slidesPerView: 3,
				},
				800: {
					slidesPerView: 4,
				},
				1000: {
					slidesPerView: 5,
				},
			},
			grabCursor: true,
			speed: 700,

			// If we need pagination
			pagination: {
				el: ".swiper-pagination",
				dynamicBullets: true,
				dynamicMainBullets: 1,
				clickable: true
			},

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			}
		})
	},
	methods: {
		onSwiper(swiper) {
			console.log(swiper)
		},
		onSlideChange() {
			console.log("slide change")
		},
	}
}
</script>
<style lang="sass" scoped>
.swiper-container
	width: 100%
	height: 300px
</style>
