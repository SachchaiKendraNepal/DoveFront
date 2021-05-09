<template>
	<v-card
		flat
		class="ma-0 pa-0 rounded-0"
		height="1000"
	>
		<v-row
			class="ma-0 pa-0 fill-height"
			align="center"
		>
			<v-col
				cols="12"
				class="text-center"
			>
				<div class="ma-0 pa-0 find-us-title">
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
				<p class="subtitle-2 find-us-subtitle">
					{{ mapInfo.description }}
				</p>
				<div class="">
					<v-btn
						min-width="16"
						max-width="200"
						:min-height="
							$vuetify.breakpoint.width < 100
								? 16
								: 50
						"
						depressed
						x-large
						class="py-8 "
					>
						<v-icon>mdi-home-map-marker</v-icon>
						<span v-show="$vuetify.breakpoint.smAndUp">View Branches</span>
					</v-btn>
				</div>
			</v-col>
			<v-col
				id="map-column"
				class="d-flex justify-center"
				cols="12"
			>
				<iframe
					id="branch-iframe"
					src="https://www.google.com/maps/d/embed?mid=1gQSVr7mErgYHo00oSpVGv5oIdklxJqPc"
					width="1000" height="600"
				/>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
export default {
	name: "ShowcaseMapComponent",
	data() {
		return {
			mapInfoParallaxImage: require("@/assets/kaudada_group.jpg"),
			mapInfo: {
				title: "Find us on Google maps!",
				description: "We provide a very nice map navigation system where" +
					" you can find all of our branches locations."
			}
		}
	},
}
</script>

<style lang="sass" scoped>
.find-us-card
	border-radius: 0
	background: transparent
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
.find-us-title
	transition: all .2s
	font-family: 'Lemonada', cursive !important
	font-size: 50px
	line-height: 50px
	font-weight: 700
	@media only screen and (max-width: 300px)
		font-size: 35px
		line-height: 35px
.find-us-subtitle
	color: grey
	font-size: 18px !important
	line-height: 20px
	font-weight: bold
	display: block
</style>
