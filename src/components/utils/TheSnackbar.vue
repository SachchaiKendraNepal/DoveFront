<template>
	<v-snackbar
		v-model="snack"
		:timeout="3000"
	>
		{{ snackText }}

		<template #action="{ attrs }">
			<v-btn
				:color="snackColor"
				text
				v-bind="attrs"
				@click="snack = false"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	name: "TheSnackbar",
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
		},
	}
}
</script>
