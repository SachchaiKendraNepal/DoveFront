<template>
	<transition name="auth">
		<router-view />
	</transition>
</template>

<script>
export default {
	name: "KhelKudDashboardLayout",
	components: {
		// maybe appbar
	},
	data: () => ({
		expandOnHover: false
	})
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
