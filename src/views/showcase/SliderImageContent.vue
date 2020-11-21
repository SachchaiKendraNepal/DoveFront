<template>
	<v-row
		class="fill-height ma-0 pa-0"
		justify="center" align="center"
	>
		<div class="display-1 text-center">
			<p class="text-uppercase overline context">
				{{ item.context }}
			</p>
			<h1 class="mb-4 main">
				{{ item.title }}
			</h1>
			<h6 class="sub mb-4">
				{{ item.subtitle }}
			</h6>
			<v-tooltip bottom>
				<template #activator="{on, attrs}">
					<v-btn x-large
						color="black"
						class="py-8 px-12"
						v-bind="attrs"
						v-on="on"
						@click="routeToFeedsPage()"
					>
						<span v-if="$vuetify.breakpoint.smAndUp"
							style="font-size: 18px"
						>Explore</span>
						<v-icon right
							large
							:class="
								$vuetify.breakpoint.smAndUp
									? 'ml-4'
									: ''
							"
						>
							mdi-arrow-right-circle
						</v-icon>
					</v-btn>
				</template>
				<span>Explore More</span>
			</v-tooltip>
		</div>
	</v-row>
</template>
<script>
import router from "@/router"

export default {
	name: "SliderImageContent",
	data: () => ({
		item: {
			context: "Sachchai kendra nepal presents",
			title: "ईश्वरीय मार्ग भजन मंडल सच्चाई केन्द्र नेपाल",
			subtitle: "हिमाल पहाड तराई, कोहि छैन पराई, सबैलाई समेट्ने एक मात्र सच्चाई"
		}
	}),
	methods: {
		routeToFeedsPage() {
			router.push({name: "HOME"})
		},
	}
}
</script>

<style lang="sass" scoped>
.not-round
	border-radius: 0!important
.main
	line-height: 60px
	@media only screen and (max-width: 380px)
		font-size: 40px !important
		line-height: 40px !important
.sub
	line-height: 40px
	letter-spacing: 0.20rem !important
	display: block
	@media only screen and (max-width: 380px)
		display: none
.context
	font-size: 22px !important
	font-weight: bold
	line-height: 30px
	letter-spacing: 0.12rem !important
	display: block
	@media only screen and (max-width: 380px)
		display: none
</style>
