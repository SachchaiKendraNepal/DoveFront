<template>
	<v-card class="overflow-hidden rounded-0">
		<v-snackbar
			v-model="snack"
			top
			right
			:timeout="3000"
			:color="snackColor"
			class="home-snack ma-0 pa-0"
		>
			{{ snackText }}

			<template #action="{ attrs }">
				<v-btn
					v-bind="attrs"
					text
					@click="snack = false"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
		<auth-panel />
		<org-info-bar />
		<router-view />
		<home-footer />
		<scroll-top
			color="blue darken-3"
		/>
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";
export default {
	name: "ShowCaseLayout",
	components: {
		OrgInfoBar: () => import("@/views/showcase/OrgInfoBar"),
		AuthPanel: () => import("@/views/showcase/AuthPanel"),
		ScrollTop: () => import("@/components/ScrollTop"),
		HomeFooter: () => import("@/views/home/Footer")
	},
	computed: {
		...mapGetters({
			snackText: "snack/snackText",
			snackColor: "snack/snackColor"
		}),
		snack: {
			get() {
				return this.$store.state.snack.snack
			},
			set(v) {
				this.$store.dispatch("snack/setSnackState", v)
			}
		}
	}
}
</script>
<style lang="scss">
.showcase-blue-bg {
	background-color: #006994 !important;
}
.showcase-blue-color {
	color: #006994 !important;
}
</style>
