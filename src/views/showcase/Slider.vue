<template>
	<div class="showcase-img-wrapper">
		<v-img class="showcase-img"
			:src="items[1].src"
			dark
			gradient="to top right, rgb(0 0 0 / 0%), rgb(0 0 0 / 60%), rgb(0 0 0 / 20%)"
			height="100vh"
			width="100vw"
			eager
		>
			<slider-image-content />
		</v-img>
		<div class="custom-shape-divider-bottom-1619957365">
			<svg data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
				preserveAspectRatio="none"
			>
				<path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
					class="shape-fill"
				/>
			</svg>
		</div>
	</div>
</template>
<script>
export default {
	name: "ShowCaseSliderComponent",
	components: {
		SliderImageContent: () => import("@/views/showcase/SliderImageContent")
	},
	data: () => ({
		loading: false,
		items: [
			{src: "https://linkpicture.com/q/mass_clapping.jpg", text: "Kiran Parajuli"},
			{src: "https://wallpaperaccess.com/full/19849.jpg"},
			{src: "https://cdn.wallpapersafari.com/10/51/h6L8oM.jpg"},
		],
	})
}
</script>

<style scoped lang="scss">
.showcase-img-wrapper {
	position: relative;
	background-color: transparent;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
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
