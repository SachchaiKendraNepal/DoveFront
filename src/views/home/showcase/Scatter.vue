<template>
	<v-row
		class="ma-0 pa-0"
		align="center"
		justify="center"
	>
		<v-col
			cols="12"
			xl="6"
			lg="6"
			md="12"
			sm="12"
		>
			<v-row
				id="scatter"
				class="ma-0 pa-0 px-5"
				justify="center"
				align="center"
			>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="d-flex justify-center"
				>
					<v-img class="one" max-width="280"
						max-height="160" src="https://i.ibb.co/zbHLf1W/IMG-8855.jpg"
					/>
				</v-col>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="d-flex justify-center"
				>
					<v-img class="two" max-width="280"
						max-height="160" src="https://i.ibb.co/GJD0DZZ/IMG-8869.jpg"
					/>
				</v-col>
				<v-col cols="12"
					:class="
						$vuetify.breakpoint.smAndUp
							? 'd-flex justify-center resize-scatter'
							: 'd-flex justify-center'
					"
				>
					<v-img class="three" max-width="280"
						max-height="160" src="https://i.ibb.co/92FcbRP/IMG-8862.jpg"
					/>
				</v-col>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="d-flex justify-center"
				>
					<v-img class="four" max-width="280"
						max-height="160" src="https://i.ibb.co/QPSBWvh/IMG-8851.jpg"
					/>
				</v-col>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="d-flex justify-center"
				>
					<v-img class="five" max-width="280"
						max-height="160" src="https://i.ibb.co/L5hzY2v/IMG-8830.jpg"
					/>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12"
			xl="6"
			lg="6"
		>
			<v-row class="ma-0 pa-0"
				justify="center" align="center"
			>
				<about-us-preview />
			</v-row>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: "ScatterComponent",
	components: {
		AboutUsPreview: () => import("@/views/home/showcase/AboutUsPreview")
	},
	data: () => ({
		// photoTwo: require("@/assets/IMG_8842.JPG")
	})
}
</script>
<style lang="sass" scoped>
::v-deep.v-image
	border-radius: 5px
.resize-scatter
	transition: all .3s
	margin-top: -45px
	margin-bottom: -45px
	z-index: 50
#right-card
	width: 100%
.one
	transition: all .3s
	@media only screen and (max-width: 290px)
		max-height: 140px !important
		max-width: 150px !important
.two
	transition: all .3s
	@media only screen and (max-width: 290px)
		max-height: 140px !important
		max-width: 150px !important
.three
	transition: all .3s
	@media only screen and (max-width: 290px)
		max-height: 140px !important
		max-width: 150px !important

.four
	transition: all .3s
	@media only screen and (max-width: 290px)
		max-height: 140px !important
		max-width: 150px !important
.five
	transition: all .3s
	@media only screen and (max-width: 290px)
		max-height: 140px !important
		max-width: 150px !important
</style>
