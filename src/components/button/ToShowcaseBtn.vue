<template>
	<v-tooltip bottom>
		<template #activator="{ on, attrs }">
			<v-btn
				fab
				small
				:color="color"
				v-bind="attrs"
				v-on="on"
				@click="$router.push({name: 'SACHCHAI SHOWCASE'})"
			>
				<v-icon size="20"
					color="grey lighten-3"
				>
					mdi-view-dashboard
				</v-icon>
			</v-btn>
		</template>
		<span>Showcase</span>
	</v-tooltip>
</template>

<script>
export default {
	name: "ToShowcaseBtn",
	props: {
		color: {
			type: String,
			default: "#7e57c2"
		}
	}
}
</script>

<style scoped>

</style>
