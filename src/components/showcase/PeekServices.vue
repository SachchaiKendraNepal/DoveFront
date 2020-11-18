<template>
	<div class="peek-services-wrapper">
		<v-card id="peek-services-card"
			flat
			outlined
			max-width="1200"
			class="mx-auto pa-4"
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
				class="text-center"
			>
				<v-col
					v-for="(item, index) in items"
					:id="item.id"
					:key="index"
					class="peek-card"
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
						<v-card-text>
							{{ item.description }}
						</v-card-text>
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
	})
}
</script>
<style lang="sass" scoped>
.peek-services-wrapper
	padding: 0 12px
#peek-services-card
	background: aliceblue
	::v-deep .v-card__title
		font-size: 14px !important
		color: #013045
		padding: 10px 2px
	#services-row
		margin: 0
		padding: 0
		@media only screen and (min-width: 1000px)
			margin-left: auto
			margin-right: auto
			width: 60em
	.quote
		margin: 0
		padding: 20px
		font-size: 45px
		font-family: 'Acme', sans-serif
		font-weight: 600
		letter-spacing: 1px
		text-align: center
		transition: all .3s
		@media only screen and (max-width: 895px) and (min-width: 436px)
			font-size: 35px
			line-height: 35px
		@media only screen and (max-width: 435px)
			font-size: 26px
			line-height: 26px
	.quoter
		margin: 0
		font-size: 30px
		font-family: 'Lobster Two', cursive
		font-weight: 500
		transition: all .3s
		@media only screen and (max-width: 895px) and (min-width: 436px)
			font-size: 25px
			line-height: 25px
		@media only screen and (max-width: 435px)
			font-size: 18px
			line-height: 18px
	::v-deep.v-avatar
		transition: ease-in-out .2s
		backface-visibility: hidden !important
		@media only screen and (max-width: 400px) and (min-width: 211px)
			height: 140px !important
			min-width: 140px !important
			width: 140px !important
		@media only screen and (max-width: 210px)
			height: 90px !important
			min-width: 90px !important
			width: 90px !important
	::v-deep.v-avatar:hover
		transition: ease-in-out .2s
		backface-visibility: hidden !important
		width: 150px !important
		min-width: 150px !important
		height: 150px !important
	.peek-card
		.peek-title
			margin: 0
			padding: 5px 0 0 0
			font-family: 'Cinzel', serif
			font-weight: 500
			font-size: 24px

</style>
