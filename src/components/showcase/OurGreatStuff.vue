<template>
	<v-row justify="center"
		class="ma-0 pa-0"
	>
		<v-card
			class="stuff-card"
			height="500"
			width="100vw"
			gradient="to top right, rgba(100,115,201,.22), rgba(25,32,72,.6)"
		>
			<v-row
				class="fill-height ma-0 pa-0"
				align="center"
				justify="center"
			>
				<div id="stuff-content">
					<h1>
						Area where all of us struggle to trust <span id="god">GOD</span>
						with <span id="keys">likes and shares</span>.
					</h1>
					<h4 class="display-1">
						"We are committed to our Mother Nature, The Earth and the Great Universe."
					</h4>
					<div class="d-flex justify-center">
						<v-btn
							v-bind="size"
							class="ma-2"
							fab
							color="#ff525200"
						>
							<v-icon>mdi-video</v-icon>
						</v-btn>
						<v-btn
							v-bind="size"
							class="ma-2"
							fab
							color="#ff525200"
						>
							<v-icon>mdi-headphones</v-icon>
						</v-btn>
						<v-btn
							v-bind="size"
							class="ma-2"
							fab
							color="#ff525200"
						>
							<v-icon>mdi-music</v-icon>
						</v-btn>
					</div>
				</div>
			</v-row>
		</v-card>
	</v-row>
</template>
<script>
export default {
	name: "OurGreatStuffComponent",
	computed: {
		size() {
			const size = {
				xs: "x-small",
				sm: "small"
			}[this.$vuetify.breakpoint.name]
			return size ? {[size]: true} : {}
		}
	}
}
</script>
<style lang="sass" scoped>
.stuff-card
	margin: 0
	padding: 0
	border-radius: 0
	background: linear-gradient(rgba(115, 139, 169, 0.5), rgba(148, 119, 165, .2)), url("https://i.ibb.co/m07knhH/mountain.jpg") no-repeat fixed center
#stuff-content
	h1
		margin-top: -120px
		text-align: center
		font-size: 72px
		background: -webkit-linear-gradient(#dfdff6, #f6dfeb, #afbecd)
		-webkit-background-clip: text
		-webkit-text-fill-color: transparent
		line-height: 75px
		font-family: 'Acme', serif !important
		font-weight: 600
		@media only screen and (max-width: 710px)
			margin-top: -20px
			font-size: 55px
			line-height: 55px
		@media only screen and (max-width: 510px)
			margin-top: -20px
			font-size: 40px
			line-height: 40px
		@media only screen and (max-width: 380px)
			margin-top: -20px
			font-size: 30px
			line-height: 30px
		@media only screen and (max-width: 275px)
			margin-top: -20px
			font-size: 20px
			line-height: 20px
		#god
			background: -webkit-linear-gradient(#fadbec, #f5c8c6, #f6ddc8)
			-webkit-background-clip: text
			-webkit-text-fill-color: transparent
	h4
		margin-top: 70px
		text-align: center
		font-weight: 500
		color: white
		text-transform: uppercase
		font-size: 22px !important
		line-height: 20px
		font-style: oblique
		@media only screen and (max-width: 710px)
			margin-top: 10px
			font-size: 16px !important
			line-height: 16px
		@media only screen and (max-width: 380px)
			margin-top: 10px
			font-size: 14px !important
			line-height: 14px
		@media only screen and (max-width: 275px)
			margin-top: 10px
			font-size: 10px !important
			line-height: 10px

</style>
