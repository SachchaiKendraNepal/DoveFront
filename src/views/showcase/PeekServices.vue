<template>
	<div class="peek-services-wrapper">
		<v-card id="peek-services-card"
			flat
			outlined
			max-width="1200"
			class="mx-auto"
			color="transparent"
		>
			<v-card-title class="overline text-uppercase pt-0">
				Our Services
			</v-card-title>
			<v-divider />
			<p class="pb-0 quote">
				"The essence of all religions is one. Only their approaches are different."
			</p>
			<p class="text-center quoter">
				- Mahatma Gandhi
			</p>
			<v-row
				id="services-row"
				align="center"
				class="text-center ma-0-0"
			>
				<v-col
					v-for="(item, index) in items"
					:id="item.id"
					:key="index"
					class="peek-card ma-0 pa-1 pa-md-3 pa-lg-4 pa-xl-6"
					cols="12"
					xl="4" lg="4"
					md="4" sm="4"
				>
					<v-avatar size="200">
						<v-img :src="item.image" />
					</v-avatar>
					<p class="peek-title">
						{{ item.title }}
					</p>
					<v-card
						class="ma-2 mx-auto"
						flat
						outlined
						max-width="450"
					>
						<v-card-text v-html="getPeekDescription(item.description)" />
					</v-card>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>
<script>
export default {
	name: "PeekServicesBox",
	data: () => ({
		items: [
			{
				id: "satsang-col",
				title: "SATSANG",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
				image: "https://s3-ap-south-1.amazonaws.com/soulveda-media-prod/wp-content/uploads/2019/11/07115632/DV_What-is-Satsang.jpg"
			},
			{
				id: "motivation-col",
				title: "MOTIVATION",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
				image: "https://www.careersinaudit.com/getasset/45b80f0b-1410-4675-99e6-c6e2885214d4/"
			},
			{
				id: "peace-col",
				title: "PEACE OF MIND",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
				image: "https://cdn.dribbble.com/users/1738860/screenshots/5554042/meditation_4x.png?compress=1&resize=400x300"
			}
		]
	}),
	methods: {
		getPeekDescription(text) {
			if (this.$vuetify.breakpoint.width > 400) return text
			else return text.toString().substr(0, 100) + "<span>...</span><br/><a href='#' class='see-more'>See More</a>"
		}
	}
}
</script>
<style lang="sass" scoped>
.peek-services-wrapper
	padding: 80px 0
#peek-services-card
	background: aliceblue
	::v-deep .v-card__title
		font-size: 14px !important
		color: #013045
		padding: 2px
	#services-row
		margin: 0
		padding: 0
		@media only screen and (min-width: 1000px)
			margin-left: auto
			margin-right: auto
			width: 60em
	.quote
		margin: 0
		padding: 150px 80px 0 80px !important

		font-size: 3rem
		line-height: 3.3rem
		font-family: 'Acme', sans-serif
		font-weight: 600
		letter-spacing: 1px
		text-align: center
		transition: all .3s
		@media only screen and (max-width: 895px) and (min-width: 436px)
			font-size: 2.4rem
			line-height: 2.6rem
			padding: 80px 40px 0 40px !important
		@media only screen and (max-width: 435px) and (min-width: 185px)
			font-size: 1.5rem
			line-height: 1.6rem
			padding: 15px !important
		@media only screen and (max-width: 184px)
			font-size: 1.1rem
			line-height: 1.3rem
			padding: 15px !important
	.quoter
		margin: 0
		padding: 15px 0
		font-size: 1.9rem
		line-height: 1.9rem
		font-family: 'Lobster Two', cursive
		font-weight: 500
		transition: all .3s
		@media only screen and (max-width: 895px) and (min-width: 436px)
			font-size: 1.5rem
			line-height: 1.5rem
			padding: 20px 0
		@media only screen and (max-width: 435px) and (min-width: 185px)
			font-size: 1.2rem
			line-height: 1.2rem
			padding-bottom: 10px
		@media only screen and (max-width: 184px)
			font-size: 1rem
			line-height: 1rem
			padding-bottom: 10px
	::v-deep.v-avatar
		transition: ease-in-out .2s
		backface-visibility: hidden !important
		@media only screen and (max-width: 400px) and (min-width: 211px)
			height: 140px !important
			min-width: 140px !important
			width: 140px !important
		@media only screen and (max-width: 210px)  and (min-width: 136px)
			height: 90px !important
			min-width: 90px !important
			width: 90px !important
		@media only screen and (max-width: 135px)
			height: 50px !important
			min-width: 50px !important
			width: 50px !important
	::v-deep.v-avatar:hover
		transition: ease-in-out .2s
		backface-visibility: hidden !important
		width: 150px !important
		min-width: 150px !important
		height: 150px !important
	.peek-card
		.peek-title
			margin: 0
			padding: 20px 0
			font-family: 'Cinzel', serif
			font-weight: 500
			font-size: 24px

</style>
