<template>
	<v-row
		class="ma-0 pa-0 mx-4"
		align="center"
		justify="center"
	>
		<div id="horizontal-scroller">
			<p class="overline">
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
				{{ title }}
			</p>
			<slot name="items" />
		</div>
	</v-row>
</template>
<script>
export default {
	name: "PinnedBarComponent",
	props: {
		title: {type: String, required: true},
		icon: {type: String, required: true}
	}
}
</script>
<style lang="sass" scoped>
#horizontal-scroller
	width: 75%
	overflow-x: auto
	white-space: nowrap
	font-size: 0

</style>
