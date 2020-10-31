<template>
	<v-app-bar
		id="showcase-nav-bar"
		fixed
		height="135"
	>
		<div class="social-networks text-center">
			<v-icon
				v-ripple
				color="#3a80ec"
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
			<v-icon
				v-ripple
				color="rgb(62 161 242)"
				size="20"
			>
				mdi-twitter
			</v-icon>
		</div>
		<v-spacer />
		<div class="links text-center">
			<link-button
				icon="mdi-home"
				text="HOME"
			/>
			<link-button
				icon="mdi-home-group"
				text="BRANCHES"
			/>
			<link-button
				icon="mdi-calendar-multiple"
				text="EVENTS"
			/>
			<link-button
				icon="mdi-video-vintage"
				text="GALLERY"
			/>
		</div>
		<v-avatar
			size="130"
			class="logo"
		>
			<v-img
				:src="logo"
				alt="SacchaiLogo"
			/>
		</v-avatar>
		<div class="links text-center">
			<link-button
				icon="mdi-face-agent"
				text="SERVICES"
			/>
			<link-button
				icon="mdi-information"
				text="ABOUT US"
			/>
			<link-button
				icon="mdi-google-maps"
				text="MAPS"
			/>
			<link-button
				icon="mdi-phone"
				text="CONTACT US"
			/>
		</div>
		<v-spacer />
		<v-btn
			id="register-button"
			large
			depressed
			color="success"
		>
			<v-icon v-if="$vuetify.breakpoint.mdAndDown"
				size="30"
			>
				mdi-account-circle
			</v-icon>
			<span v-if="$vuetify.breakpoint.lgAndUp"
				class="overline"
			>Register</span>
		</v-btn>
	</v-app-bar>
</template>
<script>
import LinkButton from "@/components/showcase/AppBarLinkBtn"
import $ from "jquery";

export default {
	name: "ShowCaseAppBar",
	components: {
		LinkButton
	},
	data: () => ({
		logo: require("@/assets/showcase_logo_v1.png"),

	}),
	mounted: function () {
		$(document).ready(() => {
			const scrollTop = $(window).scrollTop()
			if(scrollTop === 0) {
				$("#showcase-nav-bar").css({
					background: "rgb(255,255,255, 0)"
				})
			}
		})
		$(window).scroll(function () {
			console.log("here")
			const scrollTop = $(this).scrollTop()
			$("#showcase-nav-bar").css({
				background: function () {
					const elementHeight = $(this).height();
					return "rgb(230,230,230," +  (1 - (elementHeight - scrollTop) / elementHeight).toString()
				}
			})
		})
	},
}
</script>
<style lang="sass" scoped>
#showcase-nav-bar
	top:0
	border-radius: 0
	z-index: 100
	.social-networks
		::v-deep.v-icon
			padding: 6px
			cursor: pointer
	#register-button:hover
		background-color: #d7f1d7 !important
		border: 2px solid green !important
		::v-deep.v-icon
			color: #067206 !important
		span
			color: #067206 !important
</style>
