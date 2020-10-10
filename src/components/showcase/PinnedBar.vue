<template>
	<v-row
		class="ma-0 pa-0 mx-4"
		align="center"
		justify="center"
	>
		<v-col cols="12">
			<p>
				<span>
					<v-avatar size="50"
						color="grey darken-3" class="elevation-4"
					>
						<v-icon dark
							large
							class="mt-1"
						>{{ icon }}</v-icon>
					</v-avatar>
				</span>
				<span class="mt-2 ml-2 overline">{{ title }}</span>
			</p>
		</v-col>
		<v-col cols="12"
			xl="1"
			lg="1"
			md="1"
			sm="1"
			class="d-flex justify-center align-center"
		>
			<v-tooltip bottom>
				<template #activator="{ on, attrs }">
					<v-btn icon
						x-large
						class="slider-btn previous"
						v-bind="attrs"
						v-on="on"
					>
						<v-icon x-large>
							mdi-skip-previous-circle
						</v-icon>
					</v-btn>
				</template>
				<span>Previous</span>
			</v-tooltip>
		</v-col>
		<v-col cols="12"
			xl="10"
			lg="10"
			md="10"
			sm="10"
		>
			<div class="d-flex d-inline horizontal-scroller">
				<slot name="items" />
			</div>
		</v-col>
		<v-col cols="12"
			xl="1"
			lg="1"
			md="1"
			sm="1"
			class="d-flex justify-center align-center"
		>
			<v-tooltip bottom>
				<template #activator="{ on, attrs }">
					<v-btn icon
						x-large
						class="slider-btn next"
						v-bind="attrs"
						v-on="on"
					>
						<v-icon x-large>
							mdi-skip-next-circle
						</v-icon>
					</v-btn>
				</template>
				<span>Next</span>
			</v-tooltip>
		</v-col>
	</v-row>
</template>
<script>
import $ from "jquery"
export default {
	name: "PinnedBarComponent",
	props: {
		title: {type: String, required: true},
		icon: {type: String, required: true}
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
</style>
