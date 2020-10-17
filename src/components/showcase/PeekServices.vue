<template>
	<v-card id="peek-services-card"
		flat
		outlined
		class="mx-3 px-3"
	>
		<v-card-title class="overline text-uppercase">
			Our Services
		</v-card-title>
		<v-divider />
		<p class="pb-0 quote">
			The essence of all religions is one. Only their approaches are different.
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
				id="satsang-column"
				cols="12"
				xl="4" lg="4"
				md="4" sm="4"
			>
				<v-avatar size="200">
					<v-img src="https://s3-ap-south-1.amazonaws.com/soulveda-media-prod/wp-content/uploads/2019/11/07115632/DV_What-is-Satsang.jpg" />
				</v-avatar>
				<p class="title">
					SATSANG
				</p>
				<v-card
					class="ma-2 mx-auto"
					flat
					outlined
					max-width="450"
				>
					<v-card-text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12"
				xl="4" lg="4"
				md="4" sm="4"
			>
				<v-avatar size="200">
					<v-img src="https://www.careersinaudit.com/getasset/45b80f0b-1410-4675-99e6-c6e2885214d4/" />
				</v-avatar>
				<p class="title">
					MOTIVATION
				</p>
				<v-card
					class="ma-2 mx-auto"
					flat
					outlined
					max-width="450"
				>
					<v-card-text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12"
				xl="4" lg="4"
				md="4" sm="4"
			>
				<v-avatar size="200">
					<v-img src="https://i2.wp.com/thegeopolitics.com/wp-content/uploads/2018/03/peace-and-conflict.jpg?fit=678%2C381&ssl=1" />
				</v-avatar>
				<p class="title">
					PEACE OF MIND
				</p>
				<v-card
					class="ma-2 mx-auto"
					flat
					outlined
					max-width="450"
				>
					<v-card-text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-card>
</template>
<style lang="sass" scoped>
#peek-services-card
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
		@media only screen and (min-width: 765px)
			margin-left: auto
			margin-right: auto
			width: 15em
	.quoter
		margin: 0
		font-size: 30px
		font-family: 'Lobster Two', cursive
		font-weight: 500
	::v-deep.v-avatar
		transition: height .3s ease
	::v-deep.v-avatar:hover
		width: 150px !important
		min-width: 150px !important
		height: 150px !important
</style>
