<template>
	<v-card min-height="800"
		color="rgb(241 241 242)"
		class="ma-4 repeating-gradient d-flex align-center"
	>
		<v-card class="mx-auto elevation-0 rounded-0"
			max-width="1000"
			color="transparent"
		>
			<v-card-subtitle
				id="kendra_name"
				class="text-center"
			>
				ईश्वरीय मार्ग भजन मंडल सच्चाई केन्द्र नेपाल
			</v-card-subtitle>
			<v-card-subtitle
				id="kendra_motto"
				class="text-center"
			>
				हिमाल पहाड तराई, कोहि छैन पराई, सबैलाई समेट्ने एक मात्र सच्चाई
			</v-card-subtitle>
			<v-row class="ma-0 pa-0"
				justify="center" align="center"
			>
				<v-col v-for="(item, index) in kendra"
					:key="index"
					cols="12" xl="6"
					lg="6" md="6"
					sm="6" :class="'kendra-col-' + index"
				>
					<v-card class="elevation-0 text-center"
						color="transparent"
					>
						<v-avatar size="230"
							class="rounded-circle resize-avatar"
							:class="(item.position === 'Kendra Pramukh') ? 'pramukh' : 'saha-pramukh'"
						>
							<v-img :src="item.image" />
						</v-avatar>
						<div class="personal-info">
							<div class="name">
								{{ item.name }}
							</div>
							<div class="branch">
								{{ item.branch }}
							</div>
							<div class="position">
								{{ item.position }}
							</div>
							<div class="contact">
								{{ item.contact }}
							</div>
						</div>
					</v-card>
				</v-col>
			</v-row>
		</v-card>
	</v-card>
</template>
<script>
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

ScrollTrigger.defaults({
	toggleActions: "restart pause resume pause",
	scrub: 1
});
gsap.registerPlugin(ScrollTrigger)

export default {
	data: () => ({
		kendra: [
			{
				image: require("@/assets/kendra_pramukh.jpg"),
				name: "Prakash Deep Gaire",
				position: "Kendra Pramukh",
				branch: "Sachchai Kendra Nepal"
			},
			{
				image: require("@/assets/kendra_saha_pramukh.jpg"),
				name: "Sushila Kattel Gaire",
				position: "Kendra Upa Pramukh",
				branch: "Sachchai Kendra Nepal"
			}
		]
	}),
	mounted() {
		gsap.timeline({
			scrollTrigger: {
				trigger: ".repeating-gradient",
				start: "top center",
				end: "+=200",
			},
			yoyo: true
		})
			.from(".repeating-gradient", {
				duration: 1.5,
				scale: 2,
				opacity: 0
			})
		gsap.timeline({
			scrollTrigger: {
				trigger: "#kendra_motto",
				start: "bottom bottom",
				end: "+=300",
			},
			yoyo: true
		})
			.from("#kendra_name", {
				scale: 2,
				opacity: 0,
				x: -500,
				duration: .5,
			}, 0)
			.from("#kendra_motto", {
				scale: 2,
				opacity: 0,
				duration: .5,
				x: 500
			}, 0)
			.from(".kendra-col-0", {
				x: -500,
				duration: 1,
			}, 1)
			.from(".kendra-col-1", {
				x: 500,
				duration: 1
			}, 1)
	}
}
</script>
<style lang="sass" scoped>
#kendra_name
	color: #2f2d2d
	font-size: 55px
	line-height: 55px
	font-weight: 500
	transition: all .3s
	@media only screen and (max-width: 445px) and (min-width: 291px)
		font-size: 40px
		line-height: 40px
	@media only screen and (max-width: 290px)
		font-size: 28px
		line-height: 28px
#kendra_motto
	padding-top: 5px
	font-size: 24px
	line-height: 25px
	transition: all .3s
	@media only screen and (max-width: 445px) and (min-width: 291px)
		font-size: 18px
		line-height: 18px
	@media only screen and (max-width: 290px)
		font-size: 14px
		line-height: 14px
.resize-avatar
	transition: all .3s
	@media only screen and (max-width: 345px)
		height: 150px !important
		min-width: 150px !important
		width: 150px !important
	@media only screen and (max-width: 180px)
		height: 100px !important
		min-width: 100px !important
		width: 100px !important
.personal-info
	padding: 20px
.name
	text-transform: uppercase
	font-size: 1.6rem
.position
	font-size: 1.1rem
.contact
	font-size: .875rem
</style>
<style lang="scss" scoped>
.kendra-info-bg-img{
	margin-top: -70px;
}
.repeating-gradient {
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 100px);
	overflow: hidden;
}
</style>
