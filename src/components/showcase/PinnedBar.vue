<template>
	<v-card
		color="aliceblue"
		class="mx-6"
		outlined
		flat
	>
		<v-toolbar
			dense
			dark
			:color="toolbarColor"
		>
			<v-avatar
				color="white"
				size="35"
				class="elevation-4"
			>
				<v-icon
					color="grey darken-4"
					size="22"
				>
					{{ icon }}
				</v-icon>
			</v-avatar>
			<v-toolbar-title class="overline ml-2">
				{{ title }}
			</v-toolbar-title>
		</v-toolbar>
		<v-row
			class="ma-0 pa-0 py-2"
			align="center"
			justify="center"
		>
			<div class="swiper-container">
				<div class="swiper-wrapper mx-3">
					<slot name="items" />
				</div>
				<div class="swiper-pagination" />
				<div class="swiper-button-prev" />
				<div class="swiper-button-next" />
			</div>
		</v-row>
	</v-card>
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
		Swiper.use([Navigation, Pagination]);

		const mySwiper = new Swiper(".swiper-container", {
			// Optional parameters
			direction: "horizontal",
			loop: false,
			freeMode: true,
			centerInsufficientSlides: true,
			slidesOffsetBefore: 50,
			slidesOffsetAfter: 50,
			breakpoints: {
				285: {
					slidesPerView: 1,
					spaceBetween: 30,
				},
				// when window width is >= 480px
				550: {
					slidesPerView: 2,
					spaceBetween: 100,
				},
				// when window width is >= 640px
				900: {
					slidesPerView: 3,
					spaceBetween: 100,
				},
				1400: {
					slidesPerView: 4,
					spaceBetween: 100,
				},
				1800: {
					slidesPerView: 5,
					spaceBetween: 100,
				},
			},
			grabCursor: true,
			speed: 700,

			// If we need pagination
			pagination: {
				el: ".swiper-pagination",
				type: "bullets",
				clickable: true
			},

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
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
	height: 356px
.overline
	font-size: 14px !important
</style>
