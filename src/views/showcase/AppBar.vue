<template>
	<v-app-bar
		class="mx-auto elevation-0"
		dark
		height="auto"
		color="transparent"
		max-width="800"
	>
		<v-avatar
			size="100"
			class="logo-avatar ma-0 pa-0"
			color="black"
		>
			<v-img
				class="ma-0 pa-0"
				:src="logo"
				alt="SacchaiLogo"
				width="107%"
				height="107%"
			/>
		</v-avatar>

		<v-spacer />

		<v-btn
			v-if="!$helper.isUserLoggedIn"
			id="register-button"
			v-bind="size"
			depressed
			color="success"
			class="elevation-4"
			@click="routeToRegisterPage()"
		>
			<v-icon v-if="$vuetify.breakpoint.mdAndDown"
				:v-bind="size + 5"
			>
				mdi-account-plus
			</v-icon>
			<span v-if="$vuetify.breakpoint.lgAndUp">Register</span>
		</v-btn>
		<div v-else
			@click="logout()"
		>
			<DepressedButtonComponent
				:depressed="false"
				:icon-type-btn="true"
				icon="mdi-logout-variant"
				tooltip="Logout"
				color="blue darken-2"
			/>
		</div>
	</v-app-bar>
</template>
<script>
import router from "@/router";
import $ from "jquery";
import DepressedButtonComponent from "@/components/button/DepressedTooltipButton.vue";

export default {
	name: "ShowCaseAppBarComponent",
	components: {DepressedButtonComponent},
	data: () => ({
		logo: require("@/assets/showcase_logo_v1.png")
	}),
	computed: {
		size() {
			const size = {
				xs: "medium",
				sm: "medium",
				md: "medium",
				lg: "medium",
				xl: "medium",
			}[this.$vuetify.breakpoint.name]
			return size ? {[size]: true} : {}
		}
	},
	methods: {
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async logout() {
			const currentUser = this.$helper.getCurrentUser()
			const isUserLoggedOut = await this.$store.dispatch(
				"auth/logout",
				currentUser.username
			)
			if (isUserLoggedOut === true) await this.$router.push({ name: "LOG IN" })
			else if (isUserLoggedOut === 500) await this.openSnack("Internal Server Error. Try again.")
			else await this.openSnack(isUserLoggedOut)
		},
		routeToRegisterPage() {
			router.push({name: "REGISTER"})
		}
	}
}
</script>
