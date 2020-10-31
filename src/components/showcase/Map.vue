<template>
	<v-parallax
		:src="mapInfoParallaxImage"
		height="500"
	>
		<v-row
			id="find-us-row"
			align="start"
		>
			<v-col
				cols="12"
				xl="4"
				lg="4"
				md="6"
				sm="6"
			>
				<p
					id="find-us-title"
					class="ma-0 pa-0"
				>
					<v-avatar size="65"
						color="white"
						class="elevation-12"
					>
						<v-icon x-large
							color="blue darken-2"
						>
							mdi-map-legend
						</v-icon>
					</v-avatar>
					{{ mapInfo.title }}
				</p>
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
					<span>View Branches</span>
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
				<l-map
					id="map-box"
					:zoom="zoom"
					:center="center"
				>
					<l-control-layers position="topright" />
					<l-tile-layer
						v-for="tileProvider in tileProviders"
						:key="tileProvider.name"
						:name="tileProvider.name"
						:visible="tileProvider.visible"
						:url="tileProvider.url"
						:attribution="tileProvider.attribution"
						layer-type="base"
					/>
					<l-marker :lat-lng="[28.251877, 83.981037]">
						<l-icon :icon-anchor="staticAnchor">
							<v-icon v-ripple
								color="red"
								x-large
							>
								mdi-google-maps
							</v-icon>
						</l-icon>
						<l-tooltip>
							<div class="text-center">
								<p class="ma-0 pa-0">
									{{ kendraLocationInfo.name }}
								</p>
								<p class="ma-0 pa-0">
									{{ kendraLocationInfo.location }}
								</p>
							</div>
						</l-tooltip>
					</l-marker>
				</l-map>
			</v-col>
		</v-row>
	</v-parallax>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LTooltip, LControlLayers } from "vue2-leaflet"
import { latLng } from "leaflet"
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

export default {
	name: "ShowcaseMapComponent",
	components: {
		LMap,
		LTileLayer,
		LMarker,
		LIcon,
		LTooltip,
		LControlLayers
	},
	data() {
		return {
			mapInfoParallaxImage: require("@/assets/kaudada_group.jpg"),
			mapInfo: {
				title: "Find us!",
				description: "We provide a very nice map navigation system where" +
					" you can find all of our branches locations."
			},
			kendraLocationInfo: {
				name: "Sachchai Kendra Nepal",
				location: "Lamachaur-16, Pokhara"
			},
			url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
			zoom: 14,
			center: latLng(28.251877, 83.981037),
			attribution:
				"&copy; Kiran Parajuli",
			staticAnchor: [16, 37],
			tileProviders: [
				{
					name: "OpenStreetMap",
					visible: true,
					attribution:
						"&copy; With 💖 <a target=\"_blank\">Kiran Parajuli</a>",
					url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				},
				{
					name: "OpenTopoMap",
					visible: false,
					url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
					attribution:
						"Map data: &copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>, <a href=\"http://viewfinderpanoramas.org\">SRTM</a> | Map style: &copy; <a href=\"https://opentopomap.org\">OpenTopoMap</a> (<a href=\"https://creativecommons.org/licenses/by-sa/3.0/\">CC-BY-SA</a>)",
				},
			],
		}
	},
	methods: {}
};
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
	margin-top: 20px
	transition: all 1s
	-webkit-transition: all 1s
	display: block
	@media only screen and (max-width: 600px)
		#map-box
			height: 200px
			width: 200px
			display: block
#map-column
	@media only screen and (max-width: 369px)
		display: none !important
#view-branch-maps
	span
		@media only screen and (max-width: 275px)
			display: none !important
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
	font-family: 'Lemonada', cursive !important
	font-size: 50px
	font-weight: 700
#find-us-subtitle
	color: #e9e7e7
	font-size: 18px !important
	font-weight: bold
</style>
