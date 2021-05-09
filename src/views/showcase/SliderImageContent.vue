<template>
	<v-row
		class="fill-height ma-0 pa-0"
		justify="center" align="start"
	>
		<div class="text-start image-content">
			<div class="text-uppercase context">
				{{ item.context }}
			</div>
			<div class="main">
				{{ item.title }}
			</div>
			<div class="sub">
				{{ item.subtitle }}
			</div>
			<div class="explore-btn">
				<v-tooltip bottom>
					<template #activator="{on, attrs}">
						<v-btn
							dark
							class="showcase-blue-bg"
							v-bind="attrs"
							:height="($vuetify.breakpoint.smAndDown) ? 50 : 65"
							:width="($vuetify.breakpoint.smAndDown) ? 120 : 200"
							v-on="on"
							@click="routeToFeedsPage()"
						>
							<span v-if="$vuetify.breakpoint.smAndUp"
								class="explore"
							>Explore</span>
							<v-icon right
								size="24"
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

<style lang="scss" scoped>
.image-content {
	padding: 150px 10px 0;
}
.main {
	font-size: 5.8rem;
	line-height: 8rem;
	font-weight: 800;
}
.sub {
	font-size: 2.4rem;
	line-height: 3rem;
	font-weight: 600;
}
.context {
 text-transform: capitalize;
	font-size: 2.4rem;
	line-height: 3rem;
	font-weight: 500;
}
.explore-btn {
	padding-top: 20px;
	.explore {
		font-size: 18px
	}
}
@media only screen and (max-width: 1450px) and (min-width: 1220px) {
	.main {
		font-size: 5rem;
		line-height: 8rem;
		font-weight: 800;
	}
	.sub {
		font-size: 2rem;
		line-height: 3rem;
		font-weight: 600;
	}
	.context {
		text-transform: capitalize;
		font-size: 2rem;
		line-height: 3rem;
		font-weight: 500;
	}
}
@media only screen and (max-width: 1219px) and (min-width: 980px) {
	.main {
		font-size: 4rem;
		line-height: 6rem;
		font-weight: 800;
	}
	.sub {
		font-size: 1.8rem;
		line-height: 3rem;
		font-weight: 600;
	}
	.context {
		text-transform: capitalize;
		font-size: 1.8rem;
		line-height: 3rem;
		font-weight: 500;
	}
}
@media only screen and (max-width: 979px) and (min-width: 740px) {
	.main {
		font-size: 3rem;
		line-height: 6rem;
		font-weight: 800;
	}
	.sub {
		font-size: 1.4rem;
		line-height: 2.5rem;
		font-weight: 600;
	}
	.context {
		text-transform: capitalize;
		font-size: 1.4rem;
		line-height: 2.4rem;
		font-weight: 500;
	}
}
@media only screen and (max-width: 739px){
	.main {
		text-align: center;
		font-size: 3rem;
		line-height: 5rem;
		font-weight: 800;
	}
	.sub {
		text-align: center;
		font-size: 1.4rem;
		line-height: 2rem;
		font-weight: 600;
	}
	.context {
		text-align: center;
		text-transform: capitalize;
		font-size: 1.4rem;
		line-height: 3rem;
		font-weight: 500;
	}
	.explore-btn {
		text-align: center;
	}
}
@media only screen and (max-width: 380px){
	.main {
		font-size: 2.8rem;
		line-height: 3.2rem;
	}
	.context {
		font-size: 1.2rem;
		line-height: 2rem;
	}
	.sub {
		font-size: 1.2rem;
		line-height: 2rem;
	}
}
</style>
