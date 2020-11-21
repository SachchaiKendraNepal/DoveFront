<template>
	<div class="carousel">
		<div class="carousel-cell">
			<v-img class="carousel-image"
				:src="items[0].src"
				dark
			>
				<slider-image-content />
			</v-img>
		</div>
		<div class="carousel-cell">
			<v-img class="carousel-image"
				:src="items[1].src"
				dark
			>
				<slider-image-content />
			</v-img>
		</div>
		<div class="carousel-cell">
			<v-img class="carousel-image"
				:src="items[2].src"
				dark
			>
				<slider-image-content />
			</v-img>
		</div>
	</div>
</template>
<script>
import $ from "jquery"
const jQueryBridget = require("jquery-bridget");
const Flickity = require("flickity")

export default {
	name: "ShowCaseSliderComponent",
	components: {
		SliderImageContent: () => import("@/views/showcase/SliderImageContent")
	},
	data: () => ({
		loading: false,
		groupMembers: null,
		leading: null,
		clapping: null,
		praying: null,
		items: [
			{src: "https://linkpicture.com/q/mass_clapping.jpg", text: "Kiran Parajuli"},
			{src: "https://wallpaperaccess.com/full/19849.jpg"},
			{src: "https://cdn.wallpapersafari.com/10/51/h6L8oM.jpg"},
		],
	}),
	mounted() {
		jQueryBridget("flickity", Flickity, $)
		this.initFlickity()
	},
	methods: {
		initFlickity() {
			$(document).ready(function () {
				$(".carousel").flickity({
					draggable: false,
					wrapAround: true,
					autoPlay: 4000,
					pauseAutoPlayOnHover: false,
					imagesLoaded: true,
					cellSelector: ".carousel-cell",
					contain: true,
					prevNextButtons: false,
					selectedAttraction: 0.01,
					friction: 0.25,
				})
			})
		}
	}
}
</script>

<style scoped>

* { box-sizing: border-box; }

.carousel {
	background: #EEE;
}

.carousel-cell {
	display: block;
	height: 100vh;
	width: 100vw;
}
.carousel-image {
	object-fit: cover;
	width: 100%;
	height: 100%;
}
</style>
