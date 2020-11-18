<template>
	<div class="navbar elevation-4">
		<div id="top-nav-row"
			class="d-flex align-center pa-2  px-sm-5 px-md-6 px-lg-8 px-xl-16"
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
			<div class="auth-actions">
				<v-btn
					id="register-button"
					v-bind="size"
					depressed
					color="success"
					@click="routeToRegisterPage()"
				>
					<v-icon v-if="$vuetify.breakpoint.mdAndDown"
						:v-bind="size + 5"
					>
						mdi-account-plus
					</v-icon>
					<span v-if="$vuetify.breakpoint.lgAndUp"
						class="overline"
					>Register</span>
				</v-btn>
			</div>
		</div>
		<v-item-group
			id="middle-nav-row"
			mandatory
			class="d-flex justify-center"
		>
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
			<div class="logo">
				<v-avatar
					size="130"
					class="logo-avatar"
				>
					<v-img
						:src="logo"
						alt="SacchaiLogo"
					/>
				</v-avatar>
			</div>
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
		</v-item-group>
	</div>
</template>
<script>
import $ from "jquery"
import router from "@/router";

export default {
	name: "ShowCaseBarComponent",
	components: {
		// LinkButton: () => import("@/components/showcase/AppBarLinkBtn")
	},
	data: () => ({
		logo: require("@/assets/showcase_logo_v1.png"),
	}),
	computed: {
		size() {
			const size = {
				xs: "x-small",
				sm: "small",
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
		routeToRegisterPage() {
			router.push({name: "SACHCHAI REGISTER"})
		},
		initBarTransparency() {
			$(document).ready(() => {
				const scrollTop = $(window).scrollTop()
				if (scrollTop === 0) {
					$(".navbar").css({
						background: "rgb(255,255,255, 0)"
					})
				}
			})
		},
		initBarScrollColoring() {
			$(window).scroll(function () {
				const scrollTop = $(this).scrollTop()
				$(".navbar").css({
					background: function () {
						const elementHeight = $(this).height();
						return "rgb(160,209,248," + (1 - (elementHeight - scrollTop) / elementHeight).toString()
					}
				})
			})
		}
	}
}
</script>
<style lang="sass" scoped>
/* The navigation bar */
.navbar
	overflow: hidden
	position: fixed /* Set the navbar to fixed position */
	top: 0 /* Position the navbar at the top of the page */
	width: 100% /* Full width */
	z-index: 100

	#top-nav-row
		padding: 2px 0
		background: transparent

	#middle-nav-row
		.logo-avatar
			margin-top: -45px
			transition: .6s
			@media only screen and (min-width: 253px) and (max-width: 400px)
				margin-top: -20px
			@media only screen and (min-width: 161px) and (max-width: 252px)
				margin-top: 10px
				height: 80px !important
				min-width: 80px !important
				width: 80px !important
			@media only screen and (max-width: 160px)
				margin-top: 40px
				height: 50px !important
				min-width: 50px !important
				width: 50px !important


/* Links inside the navbar */
.navbar a
	float: left
	display: block
	color: #f2f2f2
	text-align: center
	padding: 14px 16px
	text-decoration: none

/* Change background on mouse-over */
.navbar a:hover
	background: #ddd
	color: black

/* Main content */
.main
	margin-top: 30px /* Add a top margin to avoid content overlay */

#register-button:hover
	border: 2px solid #007e00 !important
	background-color: transparent !important
	color: #007e00 !important
</style>
