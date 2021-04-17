<template>
	<div id="showcase-wrapper">
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
		<show-case-app-bar />
		<router-view />
		<scroll-top
			color="grey darken-4"
		/>
		<div class="mt-3">
			<home-footer />
		</div>
	</div>
</template>
<script>
import router from "@/router";
import $ from "jquery";
import {mapGetters} from "vuex";
export default {
	name: "ShowCaseLayout",
	components: {
		ShowCaseAppBar: () => import("@/views/showcase/AppBar"),
		ScrollTop: () => import("@/components/ScrollTop"),
		HomeFooter: () => import("@/views/home_layout/Footer")
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
<style lang="sass" scoped>
#showcase-wrapper
	background-color: #d9ecf4
.overline
	font-size: 22px !important
.slider-wrapper
	background: #d9ecf4
.home-app-bar
	z-index: 100
#register-button
	min-width: 70px
	margin: 0 5px
	@media only screen and (max-width: 190px)
		margin: 0
		min-width: 5px
#register-button:hover
	border: 2px solid #45ae59 !important
	background-color: white !important
	color: #45ae59 !important
.logo-avatar
	background-color: black
	transition: all .3s
	visibility: visible
	border: none
	opacity: 1
	@media only screen and (max-width: 600px) and (min-width: 191px)
		height: 50px !important
		min-width: 50px !important
		width: 50px !important
	@media only screen and (max-width: 190px)
		height: 0 !important
		min-width: 0 !important
		width: 0 !important
		visibility: hidden
		opacity: 0
		overflow: hidden
</style>
