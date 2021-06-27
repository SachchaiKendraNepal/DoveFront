<template>
	<v-card max-width="1000"
		class="mx-auto"
		flat
		color="transparent rounded-0"
	>
		<div style="padding: 200px;" />
		<div class="demo-wrapper">
			<section class="scatter-section demo-text">
				<div class="wrapper text">
					LOVEDGALLERYFROMUS
				</div>
			</section>
			<section class="scatter-section demo-gallery">
				<v-card class="wrapper"
					height="340" flat
				>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=102"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=153"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=86"
						/>
					</li>
				</v-card>
			</section>
			<section class="scatter-section demo-gallery">
				<ul class="wrapper">
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=16"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=185"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=67"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=102"
						/>
					</li>
				</ul>
			</section>
			<section class="scatter-section demo-gallery">
				<ul class="wrapper">
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=2"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=117"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=146"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=91"
						/>
					</li>
				</ul>
			</section>
			<section class="scatter-section demo-gallery">
				<ul class="wrapper">
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=12"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=99"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=1"
						/>
					</li>
					<li>
						<v-img height="340" eager
							class="scatter-image"
							src="https://source.unsplash.com/random/1240x874?sig=175"
						/>
					</li>
				</ul>
			</section>
			<section class="scatter-section demo-text">
				<div class="wrapper text">
					SACHCHAIKENDRANEPAL
				</div>
			</section>
			<div style="padding: 100px;" />
		</div>
	</v-card>
</template>
<script>
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"


export default {
	mounted() {
		gsap.registerPlugin(ScrollTrigger);

		this.initializeAnimation()
	},
	methods: {
		initializeAnimation()  {
			document.body.style.overflow = "auto";
			document.scrollingElement.scrollTo(0, 0);
			gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });

			gsap.utils.toArray(".scatter-section").forEach((section, index) => {
				const w = section.querySelector(".wrapper");
				const [x, xEnd] = (index % 2) ? ["100%", (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
				gsap.fromTo(w, {  x  }, {
					x: xEnd,
					scrollTrigger: {
						trigger: section,
						scrub: 1,
						start: "top bottom"
					}
				});
			});
		}
	}
}
</script>

<style scoped>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

::selection {
	background: #87cd33;
	color: white;
}

body {
	overflow: hidden;
	font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
}

h1 { font-size: 5rem }
h2 { font-size: 2rem }

li {
	flex-shrink: 0;
	width: clamp(500px, 60vw, 800px);
	padding-right: 1rem;
}

header {height: 100vh}
footer {height: 50vh}

:any-link { color: #4e9815; }

.df {display: flex}
.aic {align-items: center}
.jcc {justify-content: center}

.loader {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: black;
	color: white;
}

.demo-wrapper {
	overflow-x: hidden;
}

.wrapper {
	display: flex;
	padding-left: 1rem;
	list-style: none;
}

.demo-gallery:not(.last) {
	padding-bottom: 1rem;
}

.demo-text .text {
	font-size: clamp(4rem, 15vw, 8rem);
	line-height: 1;
	font-weight: 900;
}
.scatter-image {
	border-radius: 4px;
}
</style>
