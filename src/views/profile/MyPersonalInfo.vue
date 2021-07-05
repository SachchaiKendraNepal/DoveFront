<template>
	<v-card flat>
		<profile-list :items="personalItems" />
	</v-card>
</template>

<script>
import ProfileList from "@/components/profile/ProfileList.vue";
export default {
	name: "MyPersonalInfo",
	components: {ProfileList},
	data: () => ({
	}),
	computed: {
		currentUser() {
			return this.$helper.getCurrentUser()
		},
		getFullName() {
			if (!this.currentUser.first_name || !this.currentUser.last_name) return "Not Set"
			return `${this.currentUser.first_name} ${this.currentUser.last_name}`
		},
		personalItems() {
			return [
				{icon: "mdi-text-shadow", field: "Full Name", value: this.getFullName},
				{icon: "mdi-phone", field: "Phone number", value: this.getValue(this.currentUser.profile.contact) },
				{icon: "mdi-account", field: "Username", value: this.getValue(this.currentUser.username)},
				{icon: "mdi-email", field: "Email address", value: this.getValue(this.currentUser.email)},
				{icon: "mdi-map-marker", field: "Current City", value: this.getValue(this.currentUser.profile.current_city)},
				{icon: "mdi-google-maps", field: "Home City", value: this.getValue(this.currentUser.profile.home_town)},
				{icon: "mdi-cake-variant", field: "Birthday", value: this.getValue(this.currentUser.profile.birth_date)},
				{icon: "mdi-star", field: "Status", value: (this.currentUser.is_active) ? "Is Active" : "Not Active"},
				{icon: "mdi-calendar", field: "Date Joined", value: this.$moment(this.currentUser.date_joined).fromNow()},
			]
		},
	},
	methods: {
		getValue(value) {
			if (!value) return "Not Set"
			return value
		},
	}
}
</script>
