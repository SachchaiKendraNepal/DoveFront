<template>
	<v-card id="right-card"
		flat
		outlined
		color="transparent"
	>
		<v-card-text class="about-us">
			<v-card-title class="text-uppercase overline">
				About Us
			</v-card-title>
			<v-divider />
			<p class="title-text">
				{{ aboutUs.title }}
			</p>
			<p v-html="getAboutUsText(aboutUs.description)" />
			<v-btn
				min-width="16"
				max-width="200"
				:min-height="
					$vuetify.breakpoint.width < 100
						? 16
						: 50
				"
				dark
				color="#03A9F4"
			>
				<v-icon>mdi-alpha-a-box</v-icon>
				<span v-show="$vuetify.breakpoint.smAndUp"
					class="pl-3"
				>MORE ABOUT US</span>
			</v-btn>
		</v-card-text>
	</v-card>
</template>
<script>
export default {
	name: "AboutUsPreviewComponent",
	data: () => ({
		aboutUs: {
			title: "हिमाल पहाड तराई, कोहि छैन पराई, सबैलाई समेट्ने एक मात्र सच्चाई",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
				"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
				"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi " +
				"ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
				"in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
		}
	}),
	methods: {
		getAboutUsText(text) {
			if (this.$vuetify.breakpoint.width > 400) return text
			else return text.toString().substr(0, 100) + "<span>...</span>"
		}
	}
}
</script>
<style lang="sass" scoped>
.about-us
	background: aliceblue
	::v-deep .v-card__title
		margin: 0
		padding: 0 2px 8px
		font-size: 14px !important
		color: #013045
	.title-text
		margin: 0
		padding: 40px 0
		font-size: 3rem
		line-height: 3.5rem
		text-align: left
		color: black
		transition: all .3s
		@media only screen and (max-width: 680px) and (min-width: 561px)
			font-size: 2.5rem
			line-height: 2.9rem
		@media only screen and (max-width: 560px) and (min-width: 321px)
			font-size: 1.9rem
			line-height: 2.2rem
		@media only screen and (max-width: 320px)
			font-size: 1.4rem
			line-height: 1.7rem
		@media only screen and (max-width: 200px)
			font-size: 1rem
			line-height: 1.2rem
</style>
