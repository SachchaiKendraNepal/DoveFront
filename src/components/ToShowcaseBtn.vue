<template>
	<v-tooltip bottom>
		<template #activator="{ on, attrs }">
			<v-btn
				fab
				small
				color="#7e57c2"
				v-bind="attrs"
				v-on="on"
				@click="routeToShowcase()"
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
import router from "@/router";

export default {
	name: "ToShowcaseBtn",
	methods: {
		routeToShowcase() {
			router.push({name: "SACHCHAI SHOWCASE"})
		},
	}
}
</script>

<style scoped>

</style>
