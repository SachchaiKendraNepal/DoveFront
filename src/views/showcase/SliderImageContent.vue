<template>
	<v-row
		class="fill-height" no-gutters
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
							:loading="loading"
							dark
							class="showcase-blue-bg"
							v-bind="attrs"
							:height="($vuetify.breakpoint.smAndDown) ? 50 : 65"
							:width="($vuetify.breakpoint.smAndDown) ? 130 : 200"
							v-on="on"
							@click="routeToFeedsPage()"
						>
							<span v-if="$vuetify.breakpoint.smAndUp"
								class="explore"
							>Explore</span>
							<v-icon right
								size="24"
								:class="
									$vuetify.breakpoint.mdAndUp
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
import Snack from "@/mixins/Snack.js";

export default {
	name: "SliderImageContent",
	mixins: [Snack],
	data: () => ({
		loading: null,
		item: {
			context: "Sachchai kendra nepal presents",
			title: "ईश्वरीय मार्ग भजन मंडल सच्चाई केन्द्र नेपाल",
			subtitle: "हिमाल पहाड तराई, कोहि छैन पराई, सबैलाई समेट्ने एक मात्र सच्चाई"
		}
	}),
	methods: {
		async routeToFeedsPage() {
			this.loading = true
			if (!this.$helper.getCurrentUser()) {
				await this.openSnack("You are not logged in. Please login or register view our feeds pages.")
				await this.$router.push({name: "LOG IN"})
			}
			else {
				const approvedPayload = {is_approved: true}
				await this.$store.dispatch("multimedia/filter", approvedPayload)
				await this.$store.dispatch("article/filter", approvedPayload)
				await this.$store.dispatch("branch/filter", approvedPayload)
				await this.$store.dispatch("event/filter", approvedPayload)
				await this.$router.push({name: "HOME"})
			}
			this.loading = false
		},
	}
}
</script>

<style lang="scss" scoped>
.image-content {
	padding: 150px 20px 0;
	max-width: 1000px;
	margin: 0 auto;
	@media only screen and (max-width: 600px) {
		padding-top: 50px;
	}
}
.main {
	padding: 20px 0;
	font-size: 4rem;
	line-height: 4.5rem;
	font-weight: 800;
}
.sub {
	font-size: 2rem;
	line-height: 2.5rem;
	font-weight: 600;
}
.context {
 text-transform: capitalize;
	font-size: 2rem;
	line-height: 2.5rem;
	font-weight: 500;
}
.explore-btn {
	padding-top: 20px;
	.explore {
		font-size: 18px
	}
}
@media only screen and (max-width: 1000px) {
	.main {
		font-size: 3.2rem;
		line-height: 4rem;
	}
	.sub {
		font-size: 1.5rem;
		line-height: 2rem;
	}
	.context {
		font-size: 1.5rem;
		line-height: 2rem;
	}
}
@media only screen and (max-width: 600px) {
	.main {
		padding: 12px 0;
		font-size: 3rem;
		line-height: 3.5rem;
	}
	.sub {
		font-size: 1.2rem;
		line-height: 1.5rem;
	}
	.context {
		font-size: 1.2rem;
		line-height: 1.5rem;
	}
}
@media only screen and (max-width: 450px) {
	.main {
		padding: 8px 0;
		font-size: 2.6rem;
		line-height: 3rem;
	}
	.sub {
		font-size: 1.2rem;
		line-height: 1.5rem;
	}
	.context {
		font-size: 1rem;
		line-height: 1.5rem;
	}
}
@media only screen and (max-width: 385px) {
	.main {
		padding: 4px 0;
		font-size: 2rem;
		line-height: 2.5rem;
	}
	.sub {
		font-size: 1rem;
		line-height: 1.2rem;
	}
	.context {
		font-size: .875rem;
		line-height: 1rem;
	}
}
</style>
