<template>
	<div>
		<v-btn
			class="auth-panel-btn"
			fab
			dark
			fixed
			top
			left
			medium
			max-height="65"
			max-width="65"
			color="#dba520"
			@click="toggle = !toggle"
		>
			<v-icon size="24">
				mdi-air-conditioner
			</v-icon>
		</v-btn>
		<v-scale-transition>
			<v-scale-transition>
				<v-btn
					v-if="$helper.isUserLoggedIn && toggle"
					class="logout"
					fab
					dark
					fixed
					top
					left
					medium
					max-height="45"
					max-width="45"
					color="teal"
					@click="logout"
				>
					<v-icon size="20">
						mdi-logout-variant
					</v-icon>
				</v-btn>
				<v-btn
					v-if="!$helper.isUserLoggedIn && toggle"
					class="register"
					fab
					dark
					fixed
					top
					left
					medium
					max-height="65"
					max-width="65"
					color="green"
					@click="routeToRegisterPage"
				>
					<v-icon size="24">
						mdi-account-plus
					</v-icon>
				</v-btn>
			</v-scale-transition>
		</v-scale-transition>
	</div>
</template>

<script>
import router from "@/router";

export default {
	name: "AuthPanel",
	data: () => ({
		toggle: false
	}),
	methods: {
		routeToRegisterPage() {
			router.push({name: "REGISTER"})
		},
		async logout() {
			const currentUser = this.$helper.getCurrentUser()
			if (!currentUser) {
				localStorage.removeItem("sachchaiAccessToken")
				localStorage.removeItem("currentUser")
				await this.$router.push({name: "LOG IN"})
			} else {
				const isUserLoggedOut = await this.$store.dispatch(
					"user/logout",
					currentUser.username
				)
				if (isUserLoggedOut === true) await this.$router.push({name: "LOG IN"})
				else await this.openSnack(isUserLoggedOut)
			}
		},
	}
}
</script>

<style scoped lang="scss">
.auth-panel-btn {
	top: 80px;
}
.logout {
	top: 150px;
	left: 20px;
}
.register {
	top: 150px;
	left: 20px;
}
</style>
