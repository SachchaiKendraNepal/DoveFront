<template>
	<v-card
		color="blue lighten-5"
		class="mx-auto"
		max-width="750"
	>
		<v-img
			class="white--text align-end"
			max-height="200"
			:src="banner"
		/>
		<p
			v-show="en"
			id="auth-title-en"
			class="display-1 text-center text-uppercase"
			@mouseenter="en = false"
		>
			Sacchai Kendra Nepal
		</p>
		<p
			v-show="!en"
			id="auth-title-np"
			class="display-1 text-center text-uppercase"
			@mouseleave="en = true"
		>
			सच्चाई केन्द्र नेपाल
		</p>
		<slot name="authForm" />
		<v-img
			class="white--text align-end"
			max-height="135"
			:src="footer"
		/>
	</v-card>
</template>

<script>
export default {
	name: "AuthComponent",
	data() {
		return {
			en: true,
			overlay: false,
			banner: require("@/assets/sacchai_banner.jpg"),
			footer: require("@/assets/sacchai_banner_foot_reprised.jpg")
		}
	}
}
</script>

<style lang="sass" scoped>
#auth-title-en
	font-family: 'Crimson Text', serif !important
	font-size: 35px !important
	font-weight: 500 !important
	padding-top: 15px

#auth-title-np
	font-family: 'Khand', serif !important
	font-size: 35px !important
	font-weight: 500 !important
	padding-top: 15px
	color: #261e1e
</style>
