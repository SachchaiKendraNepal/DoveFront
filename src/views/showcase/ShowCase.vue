<template>
	<div>
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
	</div>
</template>

<script>
export default {
	name: "ShowcaseView",
	components: {
		ShowCaseSlider: () => import("@/views/showcase/Slider"),
		ServicesPeek: () => import("@/views/showcase/PeekServices"),
		EventHighlights: () => import("@/views/showcase/EventHighlights"),
		KendraInfoBox: () => import("@/views/showcase/KendraInfo"),
		PinBar: () => import("@/views/showcase/PinnedBar"),
		Scatter: () => import("@/views/showcase/Scatter"),
		OurGreatStuff: () => import("@/views/showcase/OurGreatStuff"),
		ShowcaseMap: () => import("@/views/showcase/Map"),
		AwesomeSwiper: () => import("@/views/showcase/AwesomeSwiper")
	}
}
</script>
