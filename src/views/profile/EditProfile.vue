<template>
	<v-card flat
		class="no-radius"
		min-height="100vh"
		:loading="loading"
	>
		<header-toolbar />
		<v-row v-if="currentUser"
			class="ma-0 pa-0"
		>
			<profile-form-header icon="mdi-account-circle"
				title="Update Your Information"
			/>
			<text-field
				v-model="currentUser.first_name"
				label="First name"
				name="first_name"
				icon="mdi-format-text"
				:errors="followerFormErrors"
				@change="patchFollower({ first_name: currentUser.first_name })"
			/>
			<text-field
				v-model="currentUser.last_name"
				label="last name"
				name="last_name"
				icon="mdi-format-text"
				:errors="followerFormErrors"
				@change="patchFollower({ last_name: currentUser.last_name })"
			/>
			<text-field
				v-model="currentUser.username"
				label="username"
				name="username"
				icon="mdi-account-circle"
				:errors="followerFormErrors"
				@change="patchFollower({ username: currentUser.username })"
			/>
			<text-field
				v-model="currentUser.email"
				type="email"
				label="email address"
				name="email"
				icon="mdi-at"
				:errors="followerFormErrors"
				@change="patchFollower({ email: currentUser.email })"
			/>
			<profile-form-header icon="mdi-face"
				title="Update Profile Information"
			/>
			<text-field
				v-model="currentUser.profile.contact"
				type="number"
				label="Contact"
				name="contact"
				icon="mdi-phone"
				:errors="formErrors"
				@change="patchProfile({ contact: profile.contact })"
			/>
			<text-area
				v-model="profile.bio"
				label="BIO"
				name="bio"
				counter="1024"
				icon="mdi-text-account"
				:errors="formErrors"
				@change="patchProfile({ bio: profile.bio })"
			/>
			<date-picker-field
				v-model="profile.birth_date"
				label="Birthday"
				name="birth_date"
				icon="mdi-cake-variant"
				:errors="formErrors"
				@change="patchProfile({ birth_date: profile.birth_date })"
			/>
			<profile-form-header
				icon="mdi-map-marker"
				title="Location Information"
			/>
			<text-field v-model="profile.home_town"
				label="Home town" name="home_town"
				icon="mdi-home-map-marker"
				counter="64"
				:errors="formErrors"
				@change="patchProfile({ home_town: profile.home_town })"
			/>
			<country-field
				id="country"
				v-model="profile.country"
				:province="profile.province"
				:errors="formErrors"
				@change="patchProfile({country: profile.country })"
			/>
			<province-field
				id="province"
				v-model="profile.province"
				:country="profile.country"
				:district="profile.district"
				:errors="formErrors"
				@change="patchProfile({ province: profile.province })"
			/>
			<district-field
				v-model="profile.district"
				:province="profile.province"
				:municipality="profile.municipality"
				:vdc="profile.vdc"
				:errors="formErrors"
				@change="patchProfile({ district: profile.district })"
			/>
			<municipality-field
				v-model="profile.municipality"
				:district="profile.district"
				:ward="profile.municipality_ward"
				:vdc="profile.vdc"
				:errors="formErrors"
				@change="patchProfile({ municipality: profile.municipality })"
			/>
			<municipality-ward-field
				v-model="profile.municipality_ward"
				:municipality="profile.municipality"
				:vdc="profile.vdc"
				:errors="formErrors"
				@change="patchProfile({ municipality_ward: profile.municipality_ward })"
			/>
			<vdc-field
				v-model="profile.vdc"
				:district="profile.district"
				:ward="profile.vdc_ward"
				:municipality="profile.municipality"
				:errors="formErrors"
				@change="patchProfile({ vdc: profile.vdc })"
			/>
			<vdc-ward-field
				v-model="profile.vdc_ward"
				:municipality="profile.municipality"
				:vdc="profile.vdc"
				:errors="formErrors"
				@change="patchProfile({ vdc_ward: profile.vdc_ward })"
			/>
			<text-field v-model="profile.current_city"
				label="Current city" name="current_city"
				icon="mdi-map-marker-radius"
				counter="64"
				:errors="formErrors"
				@change="patchProfile({ current_city: profile.current_city })"
			/>
		</v-row>
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";
import Snack from "@/mixins/Snack";
import CountryAutocomplete from "@/mixins/CountryAutocomplete";
import ProfileFormHeader from "@/components/profile/_profile_form_header.vue";
import HeaderToolbar from "@/views/profile/HeaderToolbar.vue";

export default {
	name: "ChangePassword",
	components: {HeaderToolbar, ProfileFormHeader},
	mixins: [Snack],
	props: {
		value: Boolean
	},
	data: () => ({
		loading: null,
		profile: {},
	}),
	computed: {
		...mapGetters({
			formErrors: "profile/updateFormErrors",
			followerFormErrors: "user/userCreateFormErrors",
		}),
		currentUser() {
			return this.$helper.getCurrentUser()
		}
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading=true
			this.profile = { ...this.currentUser.profile}
			if (this.currentUser.profile.contact) {
				this.currentUser.profile.contact = this.currentUser.profile.contact.substring(4)
			}
			this.loading=false
		},
		async patchProfile(body) {
			this.loading = true
			const res = await this.$store.dispatch("profile/update", {
				id: this.currentUser.id,
				body: body,
				myProfile: true
			})
			await this.openSnack("Profile updated successfully.", "success")
			if (res === true) {
				await this.openSnack("Profile updated successfully.", "success")
			} else if (res === false) await this.openSnack("Profile updated failed. Try again.")
			else await this.openSnack("Please fill valid data.")
			this.loading = false
		},
		async patchFollower(body) {
			this.loading=true
			const res = await this.$store.dispatch("user/update", {
				id: this.currentUser.id,
				body: body,
				myProfile: true
			})
			if (res === true) {
				await this.openSnack("Follower information updated successfully.", "success")
			} else if (res === false) await this.openSnack("Follower information updated failed. Try again.")
			else await this.openSnack("Please fill valid data.")
			this.loading=false
		},
		async updateProfile() {
			this.loading = true
			const patchData = {
				contact: this.profile.contact,
				bio: this.profile.bio,
				birth_date: this.profile.birth_date
			}
			const res = await this.$store.dispatch("profile/update", {
				id: this.currentUser.profile.id,
				body: patchData
			})

			this.loading = false
		}
	}
}
</script>
<style lang="sass" scoped>
.no-radius
	border-radius: 0
</style>
