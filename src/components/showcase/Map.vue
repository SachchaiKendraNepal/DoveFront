<template>
	<v-row no-gutters
		class="ma-0 pa-0 mx-3"
	>
		<v-col
			id="find-us"
			cols="12"
			xl="4"
			lg="6"
			md="6"
			sm="6"
		>
			<v-parallax
				:src="mapInfoParallaxImage"
				height="400"
			>
				<v-row align="start"
					justify="center"
				>
					<v-col cols="12"
						class="text-xs-center"
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
							depressed
							x-large
							class="py-8"
						>
							<v-icon>mdi-home-map-marker</v-icon>
							View Branches
						</v-btn>
					</v-col>
				</v-row>
			</v-parallax>
		</v-col>
		<v-col
			id="map-column"
			cols="12"
			xl="8"
			lg="6"
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
				title: "Find us on our map!",
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
#map-box
	height: 400px
	max-width: 100%
	border: 3px solid white
	border-radius: 10px
#find-us
	::v-deep.v-parallax
		border-radius: 10px
		border: 3px solid white
	::v-deep.v-image
		border-radius: 10px
.v-parallax
	::v-deep.v-parallax__image-container
		opacity: 45% !important
#find-us-title
	font-family: 'Lemonada', cursive !important
	font-size: 50px
	font-weight: 700
#find-us-subtitle
	color: #414141
	font-size: 18px !important
	font-weight: bold
</style>
