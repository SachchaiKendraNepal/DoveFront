<template>
	<div class="showcase-img-wrapper">
		<section>
			<v-img class="showcase-img"
				:src="require('@/assets/cosmos_flower.jpg')"
				dark
				gradient="to top right, rgb(0 0 0 / 0%), rgb(0 0 0 / 60%), rgb(0 0 0 / 20%)"
				height="100vh"
				width="100vw"
				eager
			>
				<slider-image-content />
			</v-img>
		</section>
	</div>
</template>
<script>
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default {
	name: "ShowCaseSliderComponent",
	components: {
		SliderImageContent: () => import("@/views/showcase/SliderImageContent")
	},
	data: () => ({
		loading: false
	}),
	methods: {}

}
</script>

<style scoped lang="scss">
.showcase-img-wrapper {
	position: relative;
	background-color: transparent;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	display: flex;
	flex-wrap: nowrap;
}

.panel {
  will-change: transform;
}

.custom-shape-divider-bottom-1619957365 {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);
}

.custom-shape-divider-bottom-1619957365 svg {
	position: relative;
	display: block;
	width: calc(100% + 1.3px);
	height: 150px;
}

.custom-shape-divider-bottom-1619957365 .shape-fill {
	fill: #f1f1f2;
}

/** For mobile devices **/
@media (max-width: 767px) {
	.custom-shape-divider-bottom-1619957365 svg {
		width: calc(138% + 1.3px);
		height: 70px;
	}
}
</style>
