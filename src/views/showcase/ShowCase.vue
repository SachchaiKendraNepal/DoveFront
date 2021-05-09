<template>
	<div>
		<show-case-slider />
		<!--		<event-highlights />-->
		<kendra-info-box />
		<pin-bar />
		<scatter />
		<services-peek />
		<our-great-stuff />
		<showcase-map />
	</div>
</template>

<script>
export default {
	name: "ShowcaseView",
	components: {
		ShowCaseSlider: () => import("@/views/showcase/Slider"),
		KendraInfoBox: () => import("@/views/showcase/KendraInfo"),
		PinBar: () => import("@/views/showcase/PinnedBar"),
		ServicesPeek: () => import("@/views/showcase/PeekServices"),
		Scatter: () => import("@/views/showcase/Scatter"),
		// EventHighlights: () => import("@/views/showcase/EventHighlights"),
		OurGreatStuff: () => import("@/views/showcase/OurGreatStuff"),
		ShowcaseMap: () => import("@/views/showcase/Map")
	}
}
</script>
