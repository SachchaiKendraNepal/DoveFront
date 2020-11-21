<template>
	<div class="mt-4">
		<v-parallax
			:src="mapInfoParallaxImage"
			height="600"
		>
			<v-row
				id="find-us-row"
				class="ma-0 pa-0 mt-4"
				align="start"
			>
				<v-col
					cols="12"
					xl="4"
					lg="4"
					md="6"
					sm="6"
				>
					<div
						id="find-us-title"
						class="ma-0 pa-0 d-flex justify-start"
					>
						<v-avatar v-show="$vuetify.breakpoint.smAndUp"
							class="mr-2 find-us-av"
							size="60"
							color="white"
						>
							<v-icon x-large
								color="blue darken-2"
							>
								mdi-map-legend
							</v-icon>
						</v-avatar>
						{{ mapInfo.title }}
					</div>
					<p id="find-us-subtitle"
						class="subtitle-2"
					>
						{{ mapInfo.description }}
					</p>
					<v-btn
						id="view-branch-maps"
						depressed
						x-large
						class="py-8"
					>
						<v-icon>mdi-home-map-marker</v-icon>
						<span v-show="$vuetify.breakpoint.smAndUp">View Branches</span>
					</v-btn>
				</v-col>
				<v-col
					id="map-column"
					class="d-flex justify-end"
					cols="12"
					xl="8"
					lg="8"
					md="6"
					sm="6"
				>
					<iframe
						id="branch-iframe"
						src="https://www.google.com/maps/d/embed?mid=1gQSVr7mErgYHo00oSpVGv5oIdklxJqPc"
						width="640" height="430"
					/>
				</v-col>
			</v-row>
		</v-parallax>
	</div>
</template>

<script>
export default {
	name: "ShowcaseMapComponent",
	data() {
		return {
			mapInfoParallaxImage: require("@/assets/kaudada_group.jpg"),
			mapInfo: {
				title: "Find us!",
				description: "We provide a very nice map navigation system where" +
					" you can find all of our branches locations."
			}
		}
	},
}
</script>

<style lang="sass" scoped>
#find-us-row
	margin: 0
	padding: 0
#map-box
	height: 440px
	max-width: 500px
	border: 3px solid white
	border-radius: 10px
#map-column
	transition: all 1s
	-webkit-transition: all 1s
	@media only screen and (max-width: 335px)
		display: flex
		justify-content: center
	#branch-iframe
		@media only screen and (max-width: 600px) and (min-width: 361px)
			height: 320px
		@media only screen and (max-width: 360px) and (min-width: 336px)
			width: 300px
			height: 250px
		@media only screen and (max-width: 335px) and (min-width: 236px)
			width: 200px
			height: 250px
		@media only screen and (max-width: 235px) and (min-width: 191px)
			width: 150px
			height: 250px
		@media only screen and (max-width: 190px)
			width: 100px
			height: 250px
#find-us
	::v-deep.v-parallax
		border-radius: 10px
		border: 3px solid white
	::v-deep.v-image
		border-radius: 10px
.v-parallax
	::v-deep.v-parallax__image-container
			background: rgba(0,0,0,0.6)
			opacity: 90%
			transition: all 1s
			-webkit-transition: all 1s
#find-us-title
	transition: all .2s
	font-family: 'Lemonada', cursive !important
	font-size: 50px
	line-height: 50px
	font-weight: 700
	@media only screen and (max-width: 300px)
		font-size: 35px
		line-height: 35px
#find-us-subtitle
	color: #e9e7e7
	font-size: 18px !important
	line-height: 20px
	font-weight: bold
	display: block
	@media only screen and (max-width: 335px)
		display: none
</style>
