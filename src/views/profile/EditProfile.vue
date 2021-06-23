<template>
	<v-card flat
		class="no-radius"
		min-height="100vh"
		:loading="loading"
	>
		<div class="py-8" />
		<v-row class="ma-0 pa-0">
			<AdminFormGroupTitle icon="mdi-account-circle"
				text="Update Follower Information"
			/>
			<text-field
				v-model="currentUser.first_name"
				label="First name"
				name="first_name"
				icon="mdi-format-text"
				:errors="followerFormErrors"
				@change="updateFollower"
			/>
			<text-field
				v-model="currentUser.last_name"
				label="last name"
				name="last_name"
				icon="mdi-format-text"
				:errors="followerFormErrors"
				@change="updateFollower"
			/>
			<text-field
				v-model="currentUser.username"
				label="username"
				name="username"
				icon="mdi-account-circle"
				:errors="followerFormErrors"
				@change="updateFollower"
			/>
			<text-field
				v-model="currentUser.email"
				type="email"
				label="email address"
				name="email"
				icon="mdi-at"
				:errors="followerFormErrors"
				@change="updateFollower"
			/>
			<AdminFormGroupTitle icon="mdi-face"
				text="Update Profile Information"
			/>
			<text-field
				v-model="profile.contact"
				type="number"
				label="Contact"
				name="contact"
				icon="mdi-phone"
				:errors="formErrors"
				@change="updateProfile"
			/>
			<text-area
				v-model="profile.bio"
				label="BIO"
				name="bio"
				counter="1024"
				icon="mdi-text-account"
				:errors="formErrors"
				@change="updateProfile"
			/>
			<date-picker-field
				v-model="profile.birth_date"
				label="Birthday"
				name="birth_date"
				icon="mdi-cake-variant"
				:errors="formErrors"
				@change="updateProfile"
			/>
			<admin-form-group-title
				icon="mdi-map-marker"
				text="Location Information"
			/>
			<text-field v-model="profile.home_town"
				label="Home town" name="home_town"
				icon="mdi-home-map-marker"
				counter="64"
				@change="updateProfile"
			/>
			<country-field
				id="country"
				v-model="profile.country"
				:errors="formErrors"
				@change="updateProfile"
			/>
			<province-field
				id="province"
				v-model="profile.province"
				:errors="formErrors"
				@change="updateProfile"
			/>
			<district-field
				v-model="profile.district"
				:errors="formErrors"
			/>
			<municipality-field
				v-model="profile.municipality"
				:errors="formErrors"
			/>
			<municipality-ward-field
				v-model="profile.municipality_ward"
				:errors="formErrors"
			/>
			<vdc-field
				v-model="profile.vdc"
				:errors="formErrors"
			/>
			<vdc-ward-field
				v-model="profile.vdc_ward"
				:errors="formErrors"
			/>
			<text-field v-model="profile.current_city"
				label="Current city" name="current_city"
				icon="mdi-map-marker-radius"
				counter="64"
				@change="updateProfile"
			/>
		</v-row>
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";
import Snack from "@/mixins/Snack";

export default {
	name: "ChangePassword",
	mixins: [Snack],
	props: {
		value: Boolean
	},
	data: () => ({
		loading: null,
		currentUser: null,
		profile: {},
	}),
	computed: {
		...mapGetters({
			formErrors: "profile/updateFormErrors",
			followerFormErrors: "user/userCreateFormErrors"
		})
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading=true
			this.currentUser = this.$helper.getCurrentUser()
			this.profile = { ...this.currentUser.profile}
			if (this.profile.contact) this.profile.contact = this.profile.contact.substring(4)
			this.loading=false
		},
		async updateFollower() {
			this.loading=true
			const patchData = {
				username: this.currentUser.username,
				first_name: this.currentUser.first_name,
				last_name: this.currentUser.last_name,
				email: this.currentUser.email
			}
			const res = await this.$store.dispatch("user/update", {
				id: this.currentUser.id,
				body: patchData,
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
				birth_date: this.profile.birth_date,
				country: this.profile.country,
				province: this.profile.province,
				district: this.profile.district,
				municipality: this.profile.municipality,
				vdc: this.profile.vdc,
				municipality_ward: this.profile.municipality_ward,
				vdc_ward: this.profile.vdc_ward
			}
			const res = await this.$store.dispatch("profile/update", {
				id: this.currentUser.profile.id,
				body: patchData
			})
			if (res === true) {
				await this.openSnack("Profile updated successfully.", "success")
			} else if (res === false) await this.openSnack("Profile updated failed. Try again.")
			else await this.openSnack("Please fill valid data.")
			this.loading = false
		}
	}
}
</script>
<style lang="sass" scoped>
.no-radius
	border-radius: 0
</style>
