<template>
	<div>
		<v-snackbar
			v-model="snack"
			top
			right
			:timeout="3000"
			:color="snackColor"
			class="home-snack"
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
		<transition name="auth">
			<router-view />
		</transition>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "SachchaiNepalAuthLayout",
	components: {
		// maybe appbar
	},
	data: () => ({
		expandOnHover: false
	}),
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
<style lang="sass" scoped>
.auth-enter-active, .auth-leave-active
	transition: opacity .4s ease-in-out, transform .4s ease
.auth-enter-active
	transition-delay: .3s
.auth-enter, .auth-leave-to
	opacity: 0
.auth-enter-to, .auth-leave
	opacity: 1
</style>
