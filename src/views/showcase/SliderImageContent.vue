<template>
	<v-row
		class="fill-height ma-0 pa-0"
		justify="center" align="center"
	>
		<div class="display-1 text-center">
			<p class="text-uppercase overline context">
				{{ item.context }}
			</p>
			<h1 class="main">
				{{ item.title }}
			</h1>
			<h6 class="sub">
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
.main
	transition: all .3s
	color: white
	@media only screen and (min-width: 1201px)
		font-size: 5rem !important
		line-height: 5.3rem !important
	@media only screen and (max-width: 1200px) and (min-width: 601px)
		font-size: 3.5rem !important
		line-height: 3.9rem !important
	@media only screen and (max-width: 600px) and (min-width: 381px)
		font-size: 2.9rem !important
		line-height: 3.1rem !important
	@media only screen and (max-width: 380px) and (min-width: 241px)
		font-size: 2.7rem !important
		line-height: 3.2rem !important
		margin-bottom: 15px
	@media only screen and (max-width: 240px) and (min-width: 177px)
		font-size: 2.5rem !important
		line-height: 2.8rem !important
		margin-bottom: 10px
	@media only screen and (max-width: 176px) and (min-width: 126px)
		font-size: 1.8rem !important
		line-height: 2.1rem !important
		margin-bottom: 10px
	@media only screen and (max-width: 125px)
		font-size: 1.4rem !important
		line-height: 1.8rem !important
		margin-bottom: 10px
.sub
	transition: all .5s ease-in-out
	opacity: 1
	visibility: visible
	margin: 20px 0
	letter-spacing: .2rem !important
	@media only screen and (min-width: 1201px)
		font-size: 1.5rem !important
		line-height: 1.9rem !important
	@media only screen and (max-width: 1200px) and (min-width: 601px)
		font-size: 1.2rem !important
		line-height: 1.4rem !important
	@media only screen and (max-width: 600px) and (min-width: 381px)
		font-size: 1rem !important
		line-height: 1.5rem !important
	@media only screen and (max-width: 380px)
		margin: 0
		opacity: 0
		visibility: hidden
		overflow: hidden
		min-width: 0
		height: 0
.context
	transition: all .5s
	opacity: 1
	visibility: visible
	font-weight: bold
	letter-spacing: 0.12rem !important
	@media only screen and (min-width: 1201px)
		font-size: 1.7rem !important
		line-height: 2.0rem !important
		margin-bottom: 50px
	@media only screen and (max-width: 1200px) and (min-width: 601px)
		margin: 20px 0
		font-size: 1.2rem !important
		line-height: 1.1rem !important
	@media only screen and (max-width: 600px) and (min-width: 381px)
		margin: 20px 0
		font-size: .8rem !important
		line-height: 1.2rem !important
	@media only screen and (max-width: 380px)
		opacity: 0
		visibility: hidden
		overflow: hidden
		min-width: 0
		height: 0
</style>
