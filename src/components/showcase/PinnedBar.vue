<template>
	<v-card
		class="mx-3 mx-sm-3 mx-md-6"
		color="#d9ecf3"
		outlined
		flat
	>
		<v-toolbar
			dense
			dark
			:color="toolbarColor"
			max-width="316"
		>
			<v-avatar
				color="white"
				size="35"
				class="elevation-4"
			>
				<v-icon
					color="grey darken-4"
					size="22"
				>
					{{ icon }}
				</v-icon>
			</v-avatar>
			<v-toolbar-title class="overline ml-2">
				{{ title }}
			</v-toolbar-title>
		</v-toolbar>
		<v-row
			class="ma-0 pa-0 py-2"
			align="center"
			justify="center"
		>
			<v-col
				id="previous-column"
				cols="12"
				xl="1"
				lg="1"
				md="1"
				sm="1"
				class="ma-0 pa-0 d-flex justify-center align-center mx-sm-3 ml-md-12"
			>
				<v-tooltip bottom>
					<template #activator="{ on, attrs }">
						<v-btn icon
							large
							class="slider-btn previous"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon large>
								mdi-skip-previous-circle
							</v-icon>
						</v-btn>
					</template>
					<span>Previous</span>
				</v-tooltip>
			</v-col>
			<v-col cols="12"
				class="ma-0 pa-0"
			>
				<div
					class="d-flex d-inline horizontal-scroller ml-sm-3 ml-md-12"
				>
					<slot name="items" />
				</div>
			</v-col>
			<v-col
				id="next-column"
				cols="12"
				xl="1"
				lg="1"
				md="1"
				sm="1"
				class="ma-0 pa-0 d-flex justify-center align-center"
				:class="
					$vuetify.breakpoint.smAndUp
						? ''
						: 'mx-3'
				"
			>
				<v-tooltip bottom>
					<template #activator="{ on, attrs }">
						<v-btn icon
							large
							class="slider-btn next"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon large>
								mdi-skip-next-circle
							</v-icon>
						</v-btn>
					</template>
					<span>Next</span>
				</v-tooltip>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import $ from "jquery"
export default {
	name: "PinnedBarComponent",
	props: {
		title: {type: String, required: true},
		icon: {type: String, required: true},
		toolbarColor: {type: String, required: true}
	},
	mounted() {
		$(".previous").click(function (e) {
			$(this)
				.closest(".row")
				.find(".horizontal-scroller")
				.animate({
					scrollLeft: "-=200px"
				}, "slow");
		})
		$(".next").click(function (e) {
			$(this)
				.parent()
				.parent()
				.find(".horizontal-scroller")
				.animate({
					scrollLeft: "+=200px"
				}, "slow");
		})
	},
}
</script>
<style lang="sass" scoped>
.horizontal-scroller
	overflow-x: auto
	white-space: nowrap
	font-size: 0
.overline
	font-size: 14px !important
#previous-column
	width: 40px
	height: 63%
	position: absolute
	background: #1312126e
	z-index: 10
	left: 0
	.v-icon
		color: #dbd9d9
#next-column
	height: 63%
	width: 40px
	position: absolute
	background: #1312126e
	z-index: 10
	right: 0
	.v-icon
		color: #dbd9d9
</style>
