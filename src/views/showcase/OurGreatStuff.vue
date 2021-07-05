<template>
	<v-row justify="center"
		class="ma-0 pa-0"
	>
		<v-img
			src="https://images.sadhguru.org/mahashivratri/wp-content/uploads/2020/02/Shiva-Wallpaper-Moon-on-his-head.jpg"
			height="800"
			width="100vw"
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
					<v-row justify="center"
						align="center" class="ma-0 pa-0"
					>
						<v-card-actions class="ma-0 pa-0">
							<v-btn
								v-bind="size"
								class="ma-2"
								fab
								color="#ff525200"
							>
								<v-icon>mdi-video</v-icon>
							</v-btn>
						</v-card-actions>
						<v-card-actions class="ma-0 pa-0">
							<v-btn
								v-bind="size"
								class="ma-2"
								fab
								color="#ff525200"
							>
								<v-icon>mdi-headphones</v-icon>
							</v-btn>
						</v-card-actions>
						<v-card-actions class="ma-0 pa-0">
							<v-btn
								v-bind="size"
								class="ma-2"
								fab
								color="#ff525200"
							>
								<v-icon>mdi-music</v-icon>
							</v-btn>
						</v-card-actions>
					</v-row>
				</div>
			</v-row>
		</v-img>
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
#stuff-content
	h1
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
		margin: 0
		padding: 20px 0
		text-align: center
		font-weight: 500
		color: white
		text-transform: uppercase
		font-size: 22px !important
		line-height: 20px
		font-style: oblique
		@media only screen and (max-width: 710px)
			margin: 0
			padding: 10px 0
			font-size: 16px !important
			line-height: 16px
		@media only screen and (max-width: 380px)
			margin: 0
			padding: 10px 0
			font-size: 14px !important
			line-height: 14px
		@media only screen and (max-width: 275px)
			margin: 0
			padding: 10px 0
			font-size: 10px !important
			line-height: 10px

</style>
