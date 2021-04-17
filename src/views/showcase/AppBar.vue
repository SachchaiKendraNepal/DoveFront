<template>
	<v-app-bar
		class="home-app-bar"
		fixed
		dark
		height="auto"
		scroll-threshold="500"
		color="rgb(126 206 216)"
	>
		<div class="social-networks text-center">
			<v-icon
				v-ripple
				color="rgb(25 55 103)"
				size="20"
			>
				mdi-facebook
			</v-icon>
			<v-icon
				v-ripple
				color="#f71701"
				size="20"
			>
				mdi-youtube
			</v-icon>
			<v-icon
				v-ripple
				size="20"
				color="#bb2d71"
			>
				mdi-instagram
			</v-icon>
		</div>
		<v-spacer />

		<v-avatar
			size="100"
			class="logo-avatar ma-0 pa-0"
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
			/>
		</div>
	</v-app-bar>
</template>
<script>
import router from "@/router";
import $ from "jquery";
import DepressedButtonComponent from "@/components/DerpressedButtonWithToolTip";

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
	mounted: function () {
		this.initBarTransparency()
		this.initBarScrollColoring()
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
				"user/logout",
				currentUser.username
			)
			if (isUserLoggedOut === true) await this.$router.push({ name: "LOG IN" })
			else if (isUserLoggedOut === 500) await this.openSnack("Internal Server Error. Try again.")
			else await this.openSnack(isUserLoggedOut)
		},
		routeToRegisterPage() {
			router.push({name: "REGISTER"})
		},
		initBarTransparency() {
			$(document).ready(() => {
				const scrollTop = $(window).scrollTop()
				if (scrollTop === 0) {
					$(".home-app-bar").css({
						background: "rgb(255,255,255, 0)"
					})
				}
			})
		},
		initBarScrollColoring() {
			$(window).scroll(function () {
				const scrollTop = $(this).scrollTop()
				$(".home-app-bar").css({
					backgroundColor: function () {
						const elementHeight = $(this).height();
						return "rgb(10,158,177," + (1 - (elementHeight - scrollTop) / elementHeight).toString()
					}
				})
			})
		}
	}
}
</script>
