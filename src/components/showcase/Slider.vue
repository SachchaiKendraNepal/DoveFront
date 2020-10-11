<template>
	<v-card :loading="loading">
		<v-carousel
			class="not-round"
			cycle
			height="100vh"
			hide-delimiter-background
			:show-arrows="false"
		>
			<v-carousel-item
				v-for="(item,i) in items"
				:key="i"
				:src="item.src"
			>
				<v-row class="fill-height"
					justify="center" align="center"
				>
					<div class="display-1 text-center">
						<h1 class="mb-4 main">
							ईश्वरीय मार्ग भजन मंडल सच्चाई केन्द्र नेपाल
						</h1>
						<h5 class="sub mb-4">
							हिमाल पहाड तराई, कोहि छैन पराई, सबैलाई समेट्ने एक मात्र सच्चाई
						</h5>
						<v-tooltip bottom>
							<template #activator="{on, attrs}">
								<v-btn x-large
									class="py-8 px-12"
									v-bind="attrs"
									v-on="on"
									@click="routeToFeedsPage()"
								>
									<span v-if="$vuetify.breakpoint.smAndUp">Explore</span>
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
			</v-carousel-item>
		</v-carousel>
	</v-card>
</template>
<script>
import router from "@/router";

export default {
	name: "ShowCaseSliderComponent",
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
	methods: {
		routeToFeedsPage() {
			router.push({name: "SACHCHAI NEPAL HOME"})
		}
	}
}
</script>
<style lang="sass" scoped>
.not-round
	border-radius: 0!important
.main
	line-height: 60px
.sub
	line-height: 30px
</style>
