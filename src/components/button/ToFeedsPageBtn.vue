<template>
	<v-tooltip left>
		<template #activator="{ on, attrs }">
			<v-btn
				fab
				:color="color"
				small
				v-bind="attrs"
				@click="$router.push({name: 'HOME'})"
				v-on="on"
			>
				<v-icon size="20">
					mdi-post
				</v-icon>
			</v-btn>
		</template>
		<span>Feeds Page</span>
	</v-tooltip>
</template>

<script>
export default {
	name: "ToFeedsPageBtn",
	props: {
		color: {
			type: String,
			default: "grey darken-3"
		}
	}
}
</script>
