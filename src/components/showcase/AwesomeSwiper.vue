<template>
	<div>
		<v-card
			id="bg-card"
			height="400"
			color="transparent"
			class="mt-3"
		>
			<h1
				id="sermons"
				class="subtitle-2 pt-xl-16 pt-lg-12 pt-md-8 pt-sm-6"
			>
				<u>OUR SERMONS</u>
			</h1>
			<h1 class="text-center">
				<i>"Healthy citizens are the greatest asset any country can have."</i>
			</h1>
		</v-card>
		<!-- Slider main container -->
		<div class="swiper-container">
			<!-- Additional required wrapper -->
			<div class="swiper-wrapper">
				<!-- Slides -->
				<v-card
					v-for="(item, i) in items"
					:key="i"
					class="swiper-slide"
				>
					<v-img
						height="80px"
						:src="item.src"
					>
						<v-card-title class="white--text">
							<v-avatar size="56">
								<img
									alt="user"
									:src="item.user"
								>
							</v-avatar>
							<p class="ml-3">
								John Doe
							</p>
						</v-card-title>
					</v-img>

					<v-card-text class="px-0">
						<div class="font-weight-bold ml-8 mb-2">
							Today
						</div>

						<v-timeline
							align-top
							dense
						>
							<v-timeline-item
								v-for="message in item.messages"
								:key="message.time"
								:color="message.color"
								small
								class="px-0"
							>
								<div>
									<div class="font-weight-normal">
										<strong>{{ message.from }}</strong> @{{ message.time }}
									</div>
									<div>{{ message.message }}</div>
								</div>
							</v-timeline-item>
						</v-timeline>
					</v-card-text>
				</v-card>
			</div>
			<!-- If we need navigation buttons -->
			<div class="swiper-button-prev" />
			<div class="swiper-button-next" />
		</div>
	</div>
</template>
<script>
import Swiper, { Navigation, Pagination } from "swiper"

export default {
	name: "AwesomeSwiperComponent",
	data: () => ({
		items: [
			{
				src: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
				user: "https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg",
				messages: [
					{
						from: "You",
						message: "Sure, I'll see you later.",
						time: "10:42am",
						color: "deep-purple lighten-1",
					},
					{
						from: "John Doe",
						message: "Yeah, sure. Does 1:00pm work?",
						time: "10:37am",
						color: "green",
					},
					{
						from: "You",
						message: "Want to grab lunch today?",
						time: "9:47am",
						color: "deep-purple lighten-1",
					},
				],
			},
			{
				src: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
				user: "https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg",
				messages: [
					{
						from: "You",
						message: "Sure, I'll see you later.",
						time: "10:42am",
						color: "deep-purple lighten-1",
					},
					{
						from: "John Doe",
						message: "Yeah, sure. Does 1:00pm work?",
						time: "10:37am",
						color: "green",
					},
					{
						from: "You",
						message: "Want to grab lunch today?",
						time: "9:47am",
						color: "deep-purple lighten-1",
					},
				],
			},
			{
				src: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
				user: "https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg",
				messages: [
					{
						from: "You",
						message: "Sure, I'll see you later.",
						time: "10:42am",
						color: "deep-purple lighten-1",
					},
					{
						from: "John Doe",
						message: "Yeah, sure. Does 1:00pm work?",
						time: "10:37am",
						color: "green",
					},
					{
						from: "You",
						message: "Want to grab lunch today?",
						time: "9:47am",
						color: "deep-purple lighten-1",
					},
				],
			},
			{
				src: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
				user: "https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg",
				messages: [
					{
						from: "You",
						message: "Sure, I'll see you later.",
						time: "10:42am",
						color: "deep-purple lighten-1",
					},
					{
						from: "John Doe",
						message: "Yeah, sure. Does 1:00pm work?",
						time: "10:37am",
						color: "green",
					},
					{
						from: "You",
						message: "Want to grab lunch today?",
						time: "9:47am",
						color: "deep-purple lighten-1",
					},
				],
			},
			{
				src: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
				user: "https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg",
				messages: [
					{
						from: "You",
						message: "Sure, I'll see you later.",
						time: "10:42am",
						color: "deep-purple lighten-1",
					},
					{
						from: "John Doe",
						message: "Yeah, sure. Does 1:00pm work?",
						time: "10:37am",
						color: "green",
					},
					{
						from: "You",
						message: "Want to grab lunch today?",
						time: "9:47am",
						color: "deep-purple lighten-1",
					},
				],
			},
			{
				src: "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
				user: "https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg",
				messages: [
					{
						from: "You",
						message: "Sure, I'll see you later.",
						time: "10:42am",
						color: "deep-purple lighten-1",
					},
					{
						from: "John Doe",
						message: "Yeah, sure. Does 1:00pm work?",
						time: "10:37am",
						color: "green",
					},
					{
						from: "You",
						message: "Want to grab lunch today?",
						time: "9:47am",
						color: "deep-purple lighten-1",
					},
				],
			},
		]
	}),
	mounted() {
		// core version + navigation, pagination modules:
		Swiper.use([Navigation, Pagination]);

		const mySwiper = new Swiper(".swiper-container", {
			// Optional parameters
			direction: "horizontal",
			loop: false,
			spaceBetween: 50,
			freeMode: true,
			centerInsufficientSlides: true,
			slidesOffsetBefore: 50,
			slidesOffsetAfter: 50,
			breakpoints: {
				300: {
					slidesPerView: 1,
				},
				// when window width is >= 480px
				600: {
					slidesPerView: 2,
				},
				// when window width is >= 640px
				900: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
				1500: {
					slidesPerView: 5,
				},
			},
			grabCursor: true,
			speed: 700,

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			}
		})
	},
	methods: {
		onSwiper(swiper) {
			// console.log(swiper)
		},
		onSlideChange() {
			// console.log("slide change")
		},
	}
}
</script>
<style lang="sass" scoped>
#bg-card
	border-radius: 0
	background: linear-gradient(rgba(0,0,0, 50%), rgba(0,0,0, 70%), rgba(0,0,0, 30%)), url("https://i.ibb.co/M2mpjQF/IMG-8842.jpg") no-repeat fixed center
	#sermons
		color: white
		letter-spacing: 2px !important
		text-align: center
		border-width: initial !important
		u
			text-decoration: none
			border-bottom: 3px dotted white
	h1
		color: white
		font-size: 2.5rem
		line-height: 3rem
		@media only screen and (max-width: 1100px) and (min-width: 700px)
			padding: 0 50px
			font-size: 2rem
			line-height: 2.3rem
		@media only screen and (max-width: 699px) and (min-width: 600px)
			padding: 0 50px
			font-size: 1.8rem
			line-height: 2.1rem
		@media only screen and (max-width: 599px) and (min-width: 300px)
			padding: 10px 40px
			font-size: 1.6rem
			line-height: 1.9rem
		@media only screen and (max-width: 299px) and (min-width: 200px)
			padding: 10px 20px
			font-size: 1.2rem
			line-height: 1.4rem
		@media only screen and (max-width: 199px)
			padding: 10px
			font-size: 1rem
			line-height: 1.2rem
.swiper-container
	margin-top: -200px
	width: 100%
	height: 400px
</style>
