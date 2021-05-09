<template>
	<v-card min-height="1000"
		max-width="1000"
		class="ma-0 pa-0 elevation-0 rounded-0 mx-auto"
	>
		<v-row
			class="ma-0 py-16 px-0"
			align="center"
			justify="center"
		>
			<v-col cols="12"
				:class="($vuetify.breakpoint.lgAndUp) ? 'shift-top-lg' : 'shift-top'"
			>
				<v-row class="ma-0 pa-0"
					justify="center" align="center"
				>
					<about-us-preview />
				</v-row>
			</v-col>
			<v-col
				cols="12"
			>
				<v-card-title class="display-3 text-center py-16 blue-grey--text font-weight-bold">
					Loved Gallery From Sachchai<span><v-icon color="blue lighten-2"
						size="100"
					>mdi-heart</v-icon></span>
				</v-card-title>
				<div class="scatter-img-col">
					<div class="first-scatter-col">
						<v-card width="300"
							height="600"
							class="one scatter-img"
						>
							<v-img width="300"
								height="600"
								src="https://wallpaperaccess.com/full/26984.jpg"
								eager
							/>
						</v-card>
						<v-card width="300"
							height="600"
							class="two scatter-img"
						>
							<v-img width="300"
								height="600"
								src="https://i.ibb.co/GJD0DZZ/IMG-8869.jpg"
								eager
							/>
						</v-card>
					</div>
					<div class="second-scatter-col">
						<v-card width="280"
							height="500"
							class="scatter-img three"
						>
							<v-img width="280"
								height="500" src="https://i.ibb.co/92FcbRP/IMG-8862.jpg"
								eager
							/>
						</v-card>
						<v-card width="280"
							height="500"
							class="scatter-img
							four"
						>
							<v-img width="280" eager
								height="500" src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Wallpapers-HD-1080P-3D-Download.jpg"
							/>
						</v-card>
					</div>
					<div class="last-scatter-col">
						<v-card class="scatter-img five" width="300"
							height="600"
						>
							<v-img width="300" eager
								height="600" src="https://newevolutiondesigns.com/images/freebies/hd-wallpaper-1.jpg"
							/>
						</v-card>
					</div>
				</div>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
export default {
	name: "ScatterComponent",
	components: {
		AboutUsPreview: () => import("@/views/showcase/AboutUsPreview")
	},
	data: () => ({
		// photoTwo: require("@/assets/IMG_8842.JPG")
	})
}
</script>

<style lang="scss" scoped>
.scatter-img {
	border: 2px solid #ffffff;
	margin: 8px;
	overflow: hidden;
}
.scatter-img-col {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
