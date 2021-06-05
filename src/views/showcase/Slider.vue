<template>
	<div class="showcase-img-wrapper">
		<section v-for="(item, index) in items"
			:key="index" class="panel"
		>
			<v-img class="showcase-img"
				:src="item.src"
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
		loading: false,
		items: [
			{src: require("@/assets/cosmos_flower.jpg"), text: "Kiran Parajuli"},
			{src: "https://wallpaperaccess.com/full/19849.jpg", text: "Beauty Wallpaper"},
			{src: "https://cdn.wallpapersafari.com/10/51/h6L8oM.jpg", text: "Wallpaper Safari"},
		],
	}),
	mounted() {
		let duration = 5,
			sections = gsap.utils.toArray(".panel"),
			sectionIncrement = duration / (sections.length - 1),
			tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".showcase-img-wrapper",
					pin: true,
					scrub: 1,
					snap: 1 / (sections.length - 1),
					start: "top top",
					end: "+=5000",
					endTrigger: ".showcase-img-wrapper"
				}
			});

		tl.to(sections, {
			xPercent: -100 * (sections.length - 1),
			duration: duration,
			ease: "none"
		});

		// everything below this is just for the fading/scaling up which is NOT scrubbed
		// it's all dynamic, triggered when each section enters/leaves so that the fading/scaling occurs at a consistent rate no matter how fast you scroll!
		sections.forEach((section, index) => {
			let tween = gsap.from(section, {
				opacity: 0,
				scale: 0.6,
				duration: 1,
				force3D: true,
				paused: true
			});
			this.addSectionCallbacks(tl, {
				start: sectionIncrement * (index - 0.99),
				end: sectionIncrement * (index + 0.99),
				onEnter: () => tween.play(),
				onLeave: () => tween.reverse(),
				onEnterBack: () => tween.play(),
				onLeaveBack: () => tween.reverse()
			});
			index || tween.progress(1); // the first tween should be at its end (already faded/scaled in)
		});
	},
	methods: {
		// helper function that lets us define a section in a timeline that spans between two times (start/end) and lets us add onEnter/onLeave/onEnterBack/onLeaveBack callbacks
		addSectionCallbacks(timeline, {start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack}) {
			let trackDirection = animation => { // just adds a "direction" property to the animation that tracks the moment-by-moment playback direction (1 = forward, -1 = backward)
					let onUpdate = animation.eventCallback("onUpdate"), // in case it already has an onUpdate
						prevTime = animation.time();
					animation.direction = animation.reversed() ? -1 : 1;
					animation.eventCallback("onUpdate", () => {
						let time = animation.time();
						if (prevTime !== time) {
							animation.direction = time < prevTime ? -1 : 1;
							prevTime = time;
						}
						onUpdate && onUpdate.call(animation);
					});
				},
				empty = v => v; // in case one of the callbacks isn't defined
			timeline.direction || trackDirection(timeline); // make sure direction tracking is enabled on the timeline
			start >= 0 && timeline.add(() => ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(param), start);
			end <= timeline.duration() && timeline.add(() => ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(param), end);
		}
	}

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
